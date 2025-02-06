export interface ApplicationProps {
    icon:string;
    title:string;
    subtitle?:string;
    poor?:boolean; // 性能较差，缩放时需要隐藏内容

    url?:string;
    component?: any;
    componentProps?: any;
}