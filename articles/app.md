# 自定义应用程序中间件使用接口

我们建议每个业务逻辑都写在自己的Razor UI库中，可以在扩展的库中添加中间件，所以我们预留了这个接口。

```csharp
    /// <summary>
    /// 应用程序配置接口。
    /// </summary>
    public interface IApplicationConfigurer : IServices
    {
        /// <summary>
        /// 优先级。
        /// </summary>
        int Priority { get; }

        /// <summary>
        /// 配置应用程序实例。
        /// </summary>
        /// <param name="app">应用程序构建实例。</param>
        /// <param name="configuration">配置接口。</param>
        void Configure(IApplicationBuilder app, IConfiguration configuration);
    }
```

在实现类中，进行手动添加配置，其中`configuration`为配置接口实例，而`Priority`则是中间件运行的优先级。


**其他链接**

* [IOC容器注册接口](ioc.md)
* [自定义程序集服务注册接口](service.md)
* [替换已有程序集注册的接口实现类](suppress.md)