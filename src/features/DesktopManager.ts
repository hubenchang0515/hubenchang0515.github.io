import React from "react";
import { ApplicationProps } from "./Application";
import Process from "./Process";

export default class DesktopManager {
    private m_processes: Process[];
    private m_lastId: number;

    constructor() {
        this.m_processes = [];
        this.m_lastId = 0;
    }

    // 生成新的进程 ID
    newId() {
        if (this.m_lastId >= 9999) {
            this.m_lastId = 1;
        } else {
            this.m_lastId = this.m_lastId + 1;
        }
        return this.m_lastId;
    }

    // 获取进程列表
    processes() {
        return this.m_processes;
    }

    // 退出全部进程
    exit() {
        this.m_processes = [];
        this.m_lastId = 0;
    }

    // 启动进程
    startProcess(app:ApplicationProps, componentProps?:any) {
        const top = this.getProcess(this.getTop());
        if (top) {
            top.focus = false;
        }
        const process:Process = {
            id: this.newId(),
            icon: app.icon,
            title: app.title,
            url: app.url,
            children: app.component ? React.createElement(app.component, componentProps??app.componentProps) : undefined,
            x: app.x ?? (top === null ? 100 : top.x + 40),
            y: app.y ?? (top === null ? 100 : top.y + 40),
            z: app.z ?? (top === null ? 1 : top.z + 1),
            width: app.width ?? 1080,
            height: app.height ?? 720,
            minimum: app.minimum ?? false,
            maximum: app.maximum ?? false,
            tray: app.tray ?? false,
            focus: !app.minimum,
            poor: app.poor,
            closeIsMinimum: app.closeIsMinimum,
        }
        this.m_processes.push(process);
    }

    // 结束进程
    exitProcess(id:number) {
        this.m_processes = this.m_processes.filter(item=>item.id !== id)
    }

    // 通过 ID 查找进程，失败时返回 null
    getProcess(id:number) {
        for (const process of this.m_processes) {
            if (process.id == id) {
                return process
            }
        }

        return null;
    }

    // 获得最上层窗口的进程 ID，失败时返回 -1
    getTop(): number {
        let focus = null;
        for (let i = 0; i < this.m_processes.length; i++) {
            if (this.m_processes[i].minimum) {
                continue;
            }
            if (!focus || focus.z < this.m_processes[i].z) {
                focus = this.m_processes[i];
            }
        }
        
        return focus !== null ? focus.id : -1;
    }

    // 将进程窗口设置为最上层
    setTop(id:number) {
        let focusProcess = this.getProcess(id);
        if (focusProcess === null) {
            return null;
        }

        let maxZ = 1;
        for (const process of this.m_processes) {
            if (process.z > focusProcess.z) {
                process.z = process.z - 1;
            }
            if (process.z > maxZ) {
                maxZ = process.z;
            }

            process.focus = false;
        }
        focusProcess.z = maxZ + 1;
        focusProcess.focus = true;
        focusProcess.minimum = false;
        return focusProcess;
    }

    // 移动进程的窗口窗口
    moveWindow(id:number, x:number, y:number) {
        let process = this.getProcess(id);
        if (process === null) {
            return null;
        }

        process.x = x;
        process.y = y;
        return process
    }

    // 最小化窗口
    setWindowMinimum(id:number, minimum:boolean) {
        let process = this.getProcess(id);
        if (process === null) {
            return null;
        }

        process.minimum = minimum;
        return process;
    }

    // 最大化窗口
    setWindowMaximum(id:number, maximum:boolean) {
        let process = this.getProcess(id);
        if (process === null) {
            return null;
        }

        process.maximum = maximum;
        return process;
    }
}