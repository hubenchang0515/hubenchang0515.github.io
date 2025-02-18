export interface ApplicationProps {
    // 图标及标题
    icon:string;
    title:string;
    subtitle?:string;

    // 初始状态
    x?:number;
    y?:number;
    z?:number;
    width?:number;
    height?:number;
    minimum?:boolean;
    maximum?:boolean;
    tray?: boolean;

    // 内容
    url?:string;
    component?: any;
    componentProps?: any;

    // 特殊属性
    poor?:boolean;              // 性能较差，缩放时需要隐藏内容
    closeIsMinimum?: boolean;   // 点击 close 时最小化而不是退出
}