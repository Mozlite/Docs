# 自定义程序集服务注册接口

在[IOC容器注册接口](ioc.md)中，可以自动进行接口和实现类注册，但是很多时候需要进行手动注册。我们建议每个业务逻辑都写在自己的Razor UI库中，所以我们预留了这个接口。

```csharp
    /// <summary>
    /// 服务配置接口。
    /// </summary>
    public interface IServiceConfigurer : IService
    {
        /// <summary>
        /// 配置服务方法。
        /// </summary>
        /// <param name="services">服务集合实例。</param>
        /// <param name="configuration">配置接口。</param>
        void ConfigureServices(IServiceCollection services, IConfiguration configuration);
    }
```

在实现类中，进行手动添加注册，其中`configuration`为配置接口实例。


**其他链接**

* [IOC容器注册接口](ioc.md)
* [自定义应用程序中间件使用接口](app.md)
* [替换已有程序集注册的接口实现类](suppress.md)