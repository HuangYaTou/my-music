<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import bScroll from 'better-scroll'
export default {
    props: {
        probeType:{
            type: Number,
            default: 1
        },
        //是否派发click事件
        click:{
            type:Boolean,
            default:true
        },
        data:{
            type:Array,
            default:null
        },
        //是否派发滚动事件
        listenScroll:{
            type:Boolean,
            default:false
        },
        //是否派发滚动到底部的事件，用于上拉加载
        pullup:{
            type:Boolean,
            default:false
        },
        //当数据更新后，刷新scroll的延时
        refreshDelay:{
            type:Number,
            default:20
        }
    },
    mounted(){
        setTimeout(()=>{
            this._initScroll();
        })
    },
    methods:{
        _initScroll() {
            if(!this.$refs.wrapper) {
                return;
            }
            this.scroll = new bScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click
            });
            //是否派发滚动事件
            if(this.listenScroll) {
                let _this = this;
                this.scroll.on('scroll', (pos)=>{
                    _this.$emit('scroll', pos);
                });
            }
            //是否派发滚动到底部的事件，用于上拉加载
            if(this.pullup) {
                this.scroll.on('scrollEnd', ()=>{
                    if(this.scroll.y<=(this.scroll.maxScrollY+50)) {
                        this.$emit('scrollEnd');
                    }
                });
            }
        },
        enable() {
            this.scroll && this.scroll.enable();
        },
        disable() {
            this.scroll && this.scroll.disable();
        },
        refresh() {
            this.scroll && this.scroll.refresh();
        },
        scrollTo() {
            this.scroll && this.scrollTo.apply(this.scroll, arguments);
        },
        scrollToElement() {
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
        }
    },
    watch: {
        data() {
            setTimeout(()=>{
                this.refresh();
            }, this.refreshDelay);
        }
    }
}
</script>

<style>

</style>

