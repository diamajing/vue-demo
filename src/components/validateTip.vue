<template>
	<div class="validate tip" v-show="errors && errors[0] !== ''">
		<div class="tooltip-arrow myarrow1"></div>
		<div class="tooltip-arrow myarrow2"></div>
    	<div class="tipMessage"><i class="fa fa-times-circle" aria-hidden="true"></i> {{message}}</div>
	</div>
</template>
<script>
	import _ from 'lodash';
	/**
	 * 共用验证信息弹出提示
	 */
    export default {
		props:{
			// 弹出信息
			'errors':{
				default : '',
			},
			'selector':{
				default :''
			}
		},
		methods : {
			setPosition : function(){
				let tipEle = $(this.$el);
				let inputEle = null;
				if ($(tipEle.parent().find(".multiselect")).length > 0){
					inputEle = $(tipEle.parent().find(".multiselect")[0]);
				} else {
					inputEle = $(tipEle.parent().find(`:input${this.selector}`)[0]);
				}

				let position = {
					top : inputEle.position().top + inputEle.outerHeight() - 8,
					left : inputEle.position().left + 30,
				};
				tipEle.css(position);
			}
		},
		computed : {
			message : function(){
				if (_.isEmpty(this.errors) && _.isEmpty(this.errors[0])){
					return '';
				}
				return this.errors[0].message;
			}
		},
		watch : {
			"errors" : function(){
				if (this.errors && this.errors[0] !== '')	this.setPosition();
			}
		}
    };
</script>
<style lang="scss" scoped>
	$border-color : #e36a5b;
	$bg-color : #f8cec9;

	.tip{
		z-index: 100;
		position: absolute;
		font-size: 12px;
		color: #cf372b;
	}
	.tooltip-arrow{
	    left: 30px;
	    margin-left: -5px;
	    border-width: 0 5px 5px;
	}
	.myarrow1{
		top: 0;
		border-bottom-color: $border-color;
	}
	.myarrow2{
		top: 1px;
		border-bottom-color: $bg-color;
	}
	.tipMessage{
		border: 1px solid $border-color;
		background-color: $bg-color;
		margin-top: 4px;
		padding: 1px 12px;
		border-radius : 3px;
	}

</style>
