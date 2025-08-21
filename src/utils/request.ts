import axios, { AxiosRequestConfig,AxiosInstance } from "axios";
import { Router } from "next/router";
import {message as AntdMessage} from "antd";

interface AxiosInstanceType extends AxiosInstance {
    get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
    options<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = unknown>(url: string,data?:unknown, config?: AxiosRequestConfig): Promise<T>;
    put<T = unknown>(url: string,data?:unknown,  config?: AxiosRequestConfig): Promise<T>;
    patch<T = unknown>(url: string,data?:unknown, config?: AxiosRequestConfig): Promise<T>;

}
export const CreateAxiosInstance = (config?: AxiosRequestConfig):AxiosInstanceType => {
    const instance = axios.create({
        // 定义超时时间
        timeout:5000,
        ...config
    });
    // 中间件 重新request方法
    instance.interceptors.request.use(
        function(config) {
        return config
    },

    function(error) {
        return Promise.reject(error);
    });

    //   reponse的中间件
    instance.interceptors.response.use(
        function(response){
        const {status,data,message} = response as unknown as {status:number,data:unknown,message?:string};
        if(status === 200) {
            return data
        } else if(status ===401) {
            // 没权限或没登录
            return Router.push("/login");
        } else {
            // 其他error
            AntdMessage.error(message || '服务端异常')
        }

    },function(error) {
        if(error.response && error.response.status === 401) {
            return Router.push("/login");
        }
        AntdMessage.error(error?.response?.data?.message || '服务端异常')
            return Promise.reject(error)
    })
    return instance
};
export default CreateAxiosInstance({});