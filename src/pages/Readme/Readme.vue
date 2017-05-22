<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
          <el-breadcrumb-item><i class="el-icon-setting"></i> 自述</el-breadcrumb-item>
        </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <h3>README.md</h3>
            <article>
                <h1>前后端分离demo</h1>
                <p>基于Vue.js 2.x系列 + Element UI 的后台管理系统</p>
                <h2>前言</h2>
                <p>Vue + Element组件库做前后端分离的demo。</p>
                <p>基于vue.js,使用vue-cli脚手架快速生成项目目录，引用Element UI组件库，方便开发快速简洁好看的组件。</p>
                <h2>功能</h2>
                <p>简单对数据的增、删、该、查</p>
                <br>
            </article>
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {};
        }
    };
</script>

<style lang="scss" scoped>
    .ms-doc{
        width:100%;
        max-width: 980px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .ms-doc h3{
        padding: 9px 10px 10px;
        margin: 0;
        font-size: 14px;
        line-height: 17px;
        background-color: #f5f5f5;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
    }
    .ms-doc article{
        padding: 45px;
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
</style>
