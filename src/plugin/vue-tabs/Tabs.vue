<template>
<div class="vue-tabs">
	<div class="tabs-label-line">
		<div class="tabs-label-wrapper" style="height:39px;">
			<ul class="tabs-label-list" v-show="showLabel">
				<tab-item v-for="tab in tabs" :tab-data="tab" :tab-width="tabWidth" :need-menu="true"
					 @close="close(tab)"
					 @reuse="reuse(tab)"
					 @close-all="closeAll(tab)"
					 @close-other="closeOther(tab)"
					 @click.native="clickTab(tab)">
				</tab-item>
			</ul>
		</div>
		<a class="tabs-label-more-btn" href="javascript:;" @click="toggleMore">
			<i class="fa fa-angle-double-down"></i>
		</a>
		<ul class="tabs-label-more-list" v-show="showMore">
			<more-item v-for="tab in tabs" :tab-data="tab" @close="close(tab)" @click.native="clickTab(tab)"></more-item>
		</ul>
	</div>
    <div class="tabs-content-wrapper" ref="contentWrapEl"></div>
</div>
</template>
<script>
import {isFunction, isString, isObject, store, consts} from './utils'
import TabItem from './component/tabItem.vue';
import MoreItem from  './component/moreItem.vue';

function tabIdGen (tabName, tabKey = '') {
    if (isObject(tabName)) {
        const {name, key = ''} = tabName
        return `${name}/${key}`
    }
    return `${tabName}/${tabKey}`
}

const EVENT_ACTIVE_CHANGE = 'vue-tabs-active-change'
const EVENT_CLOSE = 'vue-tabs-close'
const cached = {}

export default {
    components: {
		TabItem,MoreItem
    },
    data () {
        return {
            tabs: [],
            active: null,
			showMore: false,
			tabLineWidth:0,
			showLabel:true,
        }
    },
	computed: {
    	tabWidth() {
    		return this.tabLineWidth / this.tabs.length;
		},
		sidebarMini() {
			return this.$store.state.sidebarMini;
		},
		restore() {
    		return this.$store.state.supplier.reloadTag;
		}
	},
	watch: {
		sidebarMini() {
			let that = this;
			this.showLabel = false;
			setTimeout(function(){
				that.tabLineWidth = $(that.$el).width() - 66;
				that.showLabel = true;
			},310)
		},
		restore(tag) {
			if (tag){
				this.closeAll();
				this.$taber.mounted();
			}
		}
	},
    beforeCreate () {
        this.tabSize = 0
        this.tabMap = {}
    },
    created () {
        this.$taber.vm = this
    },
    mounted () {
    	/* 固定的页签 */
    	let pins = this.$store.state.pinTabs;
		pins.length > 0 ? store.save(consts.PIN_KEY,pins) : null;

		/* 挂载固定和当前页签 */
        this.$taber.mounted();

        /* 初始化content容器 */
        let contentWrapEl = this.$refs.contentWrapEl;
		$(contentWrapEl).slimScroll({
			height: 'calc(100vh - 112px)',
			railOpacity: 0.9,
			alwaysVisible: false
		}).on("slimscrolling",function(){
			if ($(contentWrapEl).scrollTop() > 0) {
				$(".content__locked-menu").addClass("on");
			} else {
				$(".content__locked-menu").removeClass("on");
			}
		});

		/* 初始化tabLine宽度 */
		this.tabLineWidth = $(this.$el).width() - 66;
    },
    methods: {
        appendContent (tab) {
            let Component = cached[tab.name]
            const _this = this
            let promise
            if (!Component) {
                if (isFunction(tab.meta.component)) {
                    const asyncFn = tab.meta.component
                    this.$set(tab, 'loading', true)
                    promise = new Promise(asyncFn).then((Component) => {
                        return (cached[tab.name] = _this.getVue().extend(Component))
                    })
                } else {
                    promise = Promise.resolve(tab.meta.component).then((Component) => {
                        return (cached[tab.name] = _this.getVue().extend(Component))
                    })
                }
            } else {
                promise = Promise.resolve(Component)
            }

            promise.then((Component) => {
                newInstance(Component)
            })

            return promise

            function newInstance (Component) {
                const $el = document.createElement('div')
                _this.$refs.contentWrapEl.appendChild($el)
                const instance = new Component({
                    el: $el,
                    __taber: _this.$taber,
                    parent: _this,
                    $tab: tab
                })

                tab.content = instance
                $(instance.$el).addClass('tabs-content');
            }
        },
        clickTab (tab) {
            if (tab && !tab.active) {
                this.select(tab)
            }
        },
        close (tab) {
            if (!tab) {
                return
            }

            const hooks = [...this.$taber.beforeCloseHooks]
            if (tab.meta.beforeClose && isFunction(tab.meta.beforeClose)) {
                hooks.push(tab.meta.beforeClose)
            }
            hooks.push(_close)
            let i = 0
            const _this = this
            function next (target) {
                if (target == null) {
                    hooks[++i].call(_this, tab, next)
                } else if (target === false) {
                    return
                }
            }
            hooks[0].call(_this, tab, next)

            function _close () {
				if (tab.content) {
					tab.content.$destroy();
					$(tab.content.$el).remove();
				}
                this.tabMap[tabIdGen(tab)] = null
                const index = this.tabs.indexOf(tab)
                if (index === -1) {
                    return
                }
                this.tabs.splice(index, 1)

                if (this.tabs.length > 0 && this.active === tab) {
                    if (index < this.tabs.length) {
                        this.select(this.tabs[index])
                    } else {
                        this.select(this.tabs[this.tabs.length - 1])
                    }
                } else if (this.tabs.length === 0) {
                    this.$emit(EVENT_ACTIVE_CHANGE, null, tab)
                    this._saveTabs()
                }
                this.$emit(EVENT_CLOSE, tab)
            }
        },
		closeAll (tab) {
			let that = this;
			let ntabs = [].concat(this.tabs);

			// 关闭全部非锁定标签页
			this.tabs.forEach(function(temptab) {
				if (!temptab.meta.locked) {
					let hooks = [...that.$taber.beforeCloseHooks]
					if (temptab.meta.beforeClose && isFunction(temptab.meta.beforeClose)) {
						hooks.push(temptab.meta.beforeClose)
					}
					hooks.push(_close_all)
					let i = 0
					const _this = that
					function next (target) {
						if (target == null) {
							hooks[++i].call(_this, temptab, next)
						} else if (target === false) {
							return
						}
					}
					hooks[0].call(_this, temptab, next)
				}
			});
			this.tabs = ntabs;
			// 处理选中
			if (this.tabs.length > 0) {
				this.select(this.tabs[this.tabs.length - 1])
			} else if (this.tabs.length === 0){
				this.$emit(EVENT_ACTIVE_CHANGE, null, tab)
			}
			this._saveTabs();

			function _close_all ($tab) {
				if ($tab.content){
					$tab.content.$destroy()
					$($tab.content.$el).remove();
				}
				that.tabMap[tabIdGen($tab)] = null

				const index = ntabs.indexOf($tab)
				if (index !== -1) {
					ntabs.splice(index, 1)
				}
				that.$emit(EVENT_CLOSE, $tab)
			}
		},
		closeOther (tab) {
			if (!tab) {
				return
			}
			let that = this;
			let ntabs = [].concat(this.tabs);

			// 关闭其他非锁定标签页
			this.tabs.forEach(function(temptab) {
				if (temptab !== tab && !temptab.meta.locked) {
					let hooks = [...that.$taber.beforeCloseHooks]
					if (temptab.meta.beforeClose && isFunction(temptab.meta.beforeClose)) {
						hooks.push(temptab.meta.beforeClose)
					}
					hooks.push(_close_other)
					let i = 0
					const _this = that
					function next (target) {
						if (target == null) {
							hooks[++i].call(_this, temptab, next)
						} else if (target === false) {
							return
						}
					}
					hooks[0].call(_this, temptab, next)
				}
			});

			this.tabs = ntabs;
			if (this.active !== tab) {
				this.select(tab);
			}
			this._saveTabs();

			function _close_other ($tab) {
				if ($tab.content) {
					$tab.content.$destroy()
					$($tab.content.$el).remove();
				}
				that.tabMap[tabIdGen($tab)] = null

				const index = ntabs.indexOf($tab)
				if (index !== -1) {
					ntabs.splice(index, 1)
				}
				that.$emit(EVENT_CLOSE, $tab)
			}
		},
        create (tab) {
            let hooks = [...this.$taber.beforeCreateHooks]
            if (tab.meta.beforeCreate && isFunction(tab.meta.beforeCreate)) {
                hooks.push(tab.meta.beforeCreate)
            }

            let i = 0
            let _this = this
            let next = function (target) {
                if (target == null) {
                    hooks[++i].call(_this, tab, next)
                } else if (target === false) {
                    return
                } else {
                    if (isString(target) && target === tab.name) {
                        hooks[++i].call(_this, tab, next)
                    } else if (isObject(target) && target.name === tab.name) {
                        hooks[++i].call(_this, tab, next)
                    } else {
                        _this.$taber.open(target)
                    }
                }
            }
            hooks.push(() => {
                this.tabs.push(tab)
                const p = this.appendContent(tab).then(() => {
                    this.$set(tab, 'loading', false)
                })
                tab.promise = p;
                console.log(tab.active);
                if (tab.active !== false) {
                    console.log('1111111111');
                    this.select(tab)
                } else {
                  console.log('33333333333');
                    this._saveTabs()
                }
                const id = tabIdGen(tab.name, tab.key)
                this.tabMap[id] = tab

                next = null
                hooks = null
            })

            hooks[0].call(this, tab, next)
        },
		reuse (tab) {
			if (!tab) {
				return
			}

			let hooks = []
			hooks.push(_close_and_create);

//			let i = 0
			let _this = this
//			let next = function (target) {
//				console.log(target);
//				if (target == null) {
//					hooks[++i].call(_this, tab, next)
//				} else if (target === false) {
//					return
//				} else {
//					if (isString(target) && target === tab.name) {
//						hooks[++i].call(_this, tab, next)
//					} else if (isObject(target) && target.name === tab.name) {
//						hooks[++i].call(_this, tab, next)
//					} else {
//						_this.$taber.open(target)
//					}
//				}
//			}
			function _close_and_create () {
				if (tab.content) {
					tab.content.$destroy()
					$(tab.content.$el).remove();
				}
				// 处理将tabs置为当前显示
				const index = this.tabs.indexOf(tab)
				if (index === -1) {
					return
				}
				if (this.tabs.length > 0 && this.active !== tab) {
					this.select(this.tabs[index])
				}
				console.log("re used");
//				this.tabs.push(tab)
				const p = this.appendContent(tab).then(function (){
					_this.$set(tab, 'loading', false)
				})
				tab.promise = p
        console.log(tab.active,'lkjjjii');
				if (tab.active !== false) {
					_this.select(tab)
          console.log('lkkkkk');
				} else {
					_this._saveTabs()
				}
				const id = tabIdGen(tab.name, tab.key)
				_this.tabMap[id] = tab

//				next = null
				hooks = null
			}

//			hooks[0].call(this, tab, next);
			hooks[0].call(this, tab);
		},
        findOpenTab (name, key) {
            const id = tabIdGen(name, key)
            return this.tabMap[id]
        },
        select (tab) {
            if (!tab) {
                return
            }
            this.$set(tab, 'active', true)
            this.$emit(EVENT_ACTIVE_CHANGE, tab, this.active)
            this.active = tab
            this.tabs.forEach((ftab) => {
                if (tabIdGen(ftab.name, ftab.key) !== tabIdGen(tab.name, tab.key)) {
                    this.$set(ftab, 'active', false)
                    if (ftab.content && ftab.content.$el) {
                        $(ftab.content.$el).removeClass('active');
                    }
                }
            })
            this._saveTabs()
            let promise = tab.promise
            if (!promise) {
                promise = Promise.resolve()
            }
            promise.then(() => {
                if (tab.active && tab.content) {
                    $(tab.content.$el).addClass('active');
                    tab.promise = null
                }
            })
        },
        _saveTabs () {
            console.log('kkkkkkk',(this.$taber));
            if (!this.$taber.persist) {
                return
            }
            const toSave = this.tabs.map((v) => {
                return {
                    name: v.name,
                    key: v.key,
                    title: v.title,
                    active: v.active,
				          	data: v.data
                }
            })
            store.save(consts.STORE_KEY, toSave);
            store.save(consts.CURRENT_KEY, toSave.filter((item) => item.active === true)[0]);
        },
        toggleMore () {
                this.showMore = !this.showMore
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import "Tabs";
</style>
