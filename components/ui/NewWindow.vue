<template>
    <transition name="drag-win">
        <div class="drag-dialog ban-select-font window" ref="dragWin" v-show="props.modelValue" v-resize="props.resizeAble">
            <!-- 拖拽窗体头部 -->
            <div class="drag-bar" :style="props.headStyle" v-drag="props.dragAble">
                <slot name="head" />
                <div class="drag-btn drag-close" @click="controlDialog" v-if="props.closeShow" />
                <i class="drag-btn drag-full" @click="fullScreen" v-if="props.fullShow" />
            </div>
            <!-- 拖拽框主要部分 -->
            <div class="drag-main" :style="props.mainStyle">
                <slot />
            </div>
        </div>
    </transition>
</template>
  
<script lang="ts" setup>
import { ref } from "vue";
const vDrag = {
    mounted: (el: any, binding: any, vnode: any) => {
        // 如果传递了false就不启用指令，反之true undefined null 不传 则启动
        if (!binding.value && (binding.value ?? "") !== "") return;
        // 拖拽实现
        const odiv = el.parentNode;
  
        el.setDragStart=(api:(eve: any)=>void)=>{
            el.onmousedown=api;
            el.ontouchstart=api;
        }
        el.setDragEnd=(api:(eve: any)=>void)=>{
            document.onmouseup=api;
            document.ontouchend=api;
        }
        el.setDragMove=(api:(eve: any)=>void)=>{
            document.onmousemove=api;
            document.ontouchmove=api;
        }
        el.setDragStart ( (eve: any) => {
            odiv.style.zIndex = 1; //当前拖拽的在最前面显示
            eve = eve || window.event;
            const mx = eve.pageX||eve.touches[0].pageX; //鼠标点击时的坐标
            const my = eve.pageY||eve.touches[0].pageY; //鼠标点击时的坐标
            const dleft = odiv.offsetLeft; //窗口初始位置
            const dtop = odiv.offsetTop;
            const clientWidth = document.documentElement.clientWidth; //页面的宽
            const oWidth = odiv.clientWidth; //窗口的宽
            const maxX = clientWidth - oWidth; // x轴能移动的最大距离
            const clientHeight = document.documentElement.clientHeight; //页面的高
            const oHeight = odiv.clientHeight; //窗口的高度
            const maxY = clientHeight - oHeight; //y轴能移动的最大距离
            el.setDragMove ( (e: any) => {
                const x = e.pageX||e.touches[0].pageX;
                const y = e.pageY||e.touches[0].pageY;
                let left = x - mx + dleft; //移动后的新位置
                let top = y - my + dtop; //移动后的新位置
                if (left < 0) left = 0;
                if (left > maxX) left = maxX;
                if (top < 0) top = 0;
                if (top > maxY) top = maxY;

                odiv.style.left = left + "px";
                odiv.style.top = top + "px";
                odiv.style.marginLeft = 0;
                odiv.style.marginTop = 0;
            })
            el.setDragEnd (() => {
                el.setDragMove ( null);
            })
        })
    }
};
const vResize = {
    mounted: (el: any, binding: any, vnode: any) => {
        // 如果传递了false就不启用指令，反之true undefined null 不传 则启动
        if (!binding.value && (binding.value ?? "") !== "") return;
        // 给选定的元素绑定name属性 设置name为resize区分只有该元素可以缩放
        el.name = "resize";
        // 八个方位对应
        interface MouseDir {[key:string]:String}
        const mouseDir:MouseDir = {
            top: "n-resize", //上
            bottom: "s-resize", //下
            left: "w-resize", //左
            right: "e-resize", //右
            topright: "ne-resize", //右上
            topleft: "nw-resize", //左上
            bottomleft: "sw-resize", //左下
            bottomright: "se-resize" //右下
        };
        // 记录被修改元素的原始位置大小，以及变更方向
        const pos = { width: 0, height: 0, top: 0, left: 0, x: 0, y: 0, dir: "" };
        // 获取鼠标所在方位
        const getDirection = (ev: any): string => {
            let dir = "";
            const xP = ev.offsetX;
            const yP = ev.offsetY;
            const offset = 12; //内边距为多少时触发
            // 计算是那个方位
            if (yP < offset) dir += "top";
            else if (yP > ev.toElement.clientHeight - offset) dir += "bottom";
            if (xP < offset) dir += "left";
            else if (xP > ev.toElement.clientWidth - offset) dir += "right";
            return dir;
        };
        // 计算移动距离
        const computedDistance = (pre: any, cur: any): any => {
            return [cur.x - pre.x, cur.y - pre.y];
        };
        //数据重置
        const resetData = () => {
            pos.width = 0;
            pos.height = 0;
            pos.top = 0;
            pos.left = 0;
            pos.x = 0;
            pos.y = 0;
            pos.dir = "";
            document.onmousemove = null;
        };
        // 变更尺寸方法
        const changeSize = (e: any) => {
            // 两个点之间的差值，计算鼠标位移数值
            const [disX, disY] = computedDistance(
                { x: pos.x, y: pos.y },
                { x: e.pageX, y: e.pageY }
            );
            const addWid = pos.width + disX;
            const subWid = pos.width - disX;
            const addHig = pos.height + disY;
            const subHig = pos.height - disY;
            const minX = 200;
            const minY = 200;
            //上下左右的变更方法
            const top = () => {
                if (subHig <= minY) return; //不能小于最小最高
                el.style.height = subHig + "px";
                el.style.top = pos.top + disY + "px";
            }; // 上
            const bottom = () => {
                el.style.height = addHig + "px";
            }; // 下
            const left = () => {
                if (subWid <= minX) return; //不能小于最小宽度
                el.style.width = subWid + "px";
                el.style.left = pos.left + disX + "px";
            }; // 左
            const right = () => {
                el.style.width = addWid + "px";
            }; // 右
            // 变更方位及其修改方法映射
            interface diraction { [key: string]: ()=>void  }
            const doFn: diraction = {
                top: top, //上
                bottom: bottom, //下
                left: left, //左
                right: right, //右
                topright: () => {
                    top();
                    right();
                }, //右上
                topleft: () => {
                    top();
                    left();
                }, //左上
                bottomleft: () => {
                    bottom();
                    left();
                }, //左下
                bottomright: () => {
                    bottom();
                    right();
                } //右下

            };
            doFn[pos.dir]();
        };
        //鼠标按下 触发变更事件
        el.onmousedown = (e: any) => {
            if (e.target.name !== "resize") return;
            let d = getDirection(e);
            //当位置为四个边和四个角才开启尺寸修改
            if (mouseDir[d]) {
                pos.width = el.clientWidth;
                pos.height = el.clientHeight;
                pos.top = el.offsetTop;
                pos.left = el.offsetLeft;
                pos.x = e.pageX;
                pos.y = e.pageY;
                pos.dir = d;
                document.onmousemove = changeSize;
            }
            document.onmouseup = resetData;
        };
    }
}




// props传入数据类型约束
interface Props {
    modelValue: boolean; //控制窗体的显示与否
    width?: string; // 默认宽 —— 设置头高 宽高最好传入变量
    height?: string; // 默认高
    headHeight?: string; // 默认控制栏高
    headStyle?: string; // 控制栏样式
    mainStyle?: string; //主要内容区域样式
    resizeAble?: boolean | string; // 是否可以调整尺寸 默认可以调整
    dragAble?: boolean | string; // 是否可以拖拽 默认可拖拽
    closeShow?: boolean; // 关闭控制显示 默认不显示
    fullShow?: boolean; // 全屏控制显示 默认不显示
    closeFun:Function
}
/** 组件调整参数默认值 */
const props = withDefaults(defineProps<Props>(), {
    modelValue: true,
    width: "500px",
    height: "60vh",
    headHeight: "35px",
    headStyle: "",
    mainStyle: "",
    resizeAble: "",
    dragAble: "",
    closeShow: false,
    fullShow: false,
    closeFun:Function
});

// 窗体记录数据类型约束
interface recordType {
    width: number;
    height: number;
    top: number;
    left: number;
    fill: boolean;
}
//记录原来的大小
const recordBox: recordType = {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    fill: false
};

//获取窗口实体
const dragWin: any = ref(null);
// 事件定义
const emits = defineEmits(["update:modelValue"]);

/** 方法定义 */
// 内部控制窗口开关
const controlDialog = () => {
    // emits("update:modelValue", !props.modelValue);
    props.closeFun();
};

// 全屏控件
const fullScreen = () => {
    const tmp = dragWin.value;
    const style = dragWin.value.style;
    // 宽的样式 如果被手动缩小或者放大，则表示非全屏状态，则将状态置为false
    if (!style.width || style.width !== "100vw") {
        recordBox.fill = false;
    }
    // 全屏或是还原
    if (recordBox.fill) {
        style.width = `${recordBox.width}px`;
        style.height = `${recordBox.height}px`;
        style.top = `${recordBox.top}px`;
        style.left = `${recordBox.left}px`;
    } else {
        // 记录一下原来的样式
        recordBox.width = tmp.offsetWidth;
        recordBox.height = tmp.offsetHeight;
        recordBox.top = tmp.offsetTop;
        recordBox.left = tmp.offsetLeft;
        //全屏样式
        style.width = "100vw";
        style.height = "100vh";
        style.top = "0px";
        style.left = "0px";
    }
    recordBox.fill = !recordBox.fill; // 全屏状态变换
};
</script>
  
<style scoped>
/* 禁止选中文字 */
.ban-select-font {
    -moz-user-select: none;
    /*火狐*/
    -webkit-user-select: none;
    /*webkit浏览器*/
    -ms-user-select: none;
    /*IE10*/
    -khtml-user-select: none;
    /*早期浏览器*/
    user-select: none;
}

.drag-dialog {
    position: fixed;
    width: v-bind("props.width");
    height: v-bind("props.height");
    left: calc(50% - v-bind("props.width") / 2);
    top: calc(50% - v-bind("props.height") / 2);
    box-sizing: border-box;
    padding: 8px;
    overflow: hidden;
    color: #fff;
    min-width: 200px;
    min-height: 200px;
    max-width: 100vw;
    max-height: 100vh;
    background-color: #313438cc;
}

.drag-bar {
    width: 100%;
    cursor: move;
    height: v-bind("props.headHeight");
    border-bottom: 1px solid #fff;
    box-sizing: border-box;
    padding: 1px 2px 9px;
}

.drag-btn {
    width: 25px;
    height: 25px;
    float: right;
    cursor: pointer;
    margin-left: 5px;
    border-radius: 50%;
}

.drag-full {
    background-color: #28c940b8;
}

.drag-full:hover {
    background-color: #28c93f;
}

.drag-close {
    background-color: #f2473ec7;
}

.drag-close:hover {
    background-color: #f2473e;
}

.drag-main {
    width: 100%;
    height: calc(100% - v-bind("props.headHeight"));
    box-sizing: border-box;
    overflow: auto;
    font-size: 13px;
    line-height: 1.6;
}

/* vue渐入渐出样式 */
.drag-win-enter-from,
.drag-win-leave-to {
    opacity: 0;
    transform: scale(0);
}

.drag-win-enter-to,
.drag-win-leave-from {
    opacity: 1;
}

.drag-win-enter-active,
.drag-win-leave-active {
    transition: all 0.5s ease;
}

.window {
	z-index: 100;
	box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
	border-radius: 4px;
	/* border: 1px solid #ebeef5;
	background-color: #fff; */
	overflow: hidden;
	color: #303133;
}
</style>
  