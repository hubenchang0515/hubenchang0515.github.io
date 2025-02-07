export interface ApplicationProps {
    icon:string;
    title:string;
    subtitle?:string;
    poor?:boolean; // 性能较差，缩放时需要隐藏内容

    // 初始状态
    x?:number;
    y?:number;
    width?:number;
    height?:number;
    maximum?:boolean;

    // 内容
    url?:string;
    component?: any;
    componentProps?: any;
}