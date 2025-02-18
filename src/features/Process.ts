export default interface Process {
    id: number;
    icon: string;
    title: string;
    x: number;
    y: number;
    z: number;
    width: number;
    height: number;
    minimum?: boolean;
    maximum?: boolean;
    focus?: boolean;
    tray?: boolean;     // 托盘进程，显示为托盘项而非 Dock 项
    poor?:boolean;      // 图形性能较差，缩放时需要隐藏内容

    url?: string;
    children?: React.ReactNode;
}
