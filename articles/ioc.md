# IOC容器注册接口

在aspnetcore中，整个核心就是使用IOC来进行对象控制，这可以使得不同程序集对象耦合度不高，容易扩展。用对象池管理对象，也对经常使用的对象初始化性能更好，所以在aspnetcore中，在使用接口对象时候需要进行注册。

1. 注册普通的接口实例，主要是每次使用对象的时候都是实例化一个对象；
2. 注册上下文中单例实例，在当前线程上下文中只有一个对象实例；
3. 注册单例的接口实例，整个应用程序域中只有一个实例；

>[!Warning]
>这三种方式的对象具有自己的优先等级，普通接口<上下文单例<单例。如果优先级高的构造函数，注入等级低的接口，将会抛出错误！

在aspnetcore中的容器主要包含这三种情况，在Startup.cs文件中进行注册，具体代码如下：

```csharp
    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddTransient();
        services.AddTransient<>();
        services.TryAddTransient();
        services.TryAddTransient<>();
        services.AddScoped();
        services.AddScoped<>();
        services.TryAddScoped();
        services.TryAddScoped<>();
        services.AddSingleton();
        services.AddSingleton<>();
        services.TryAddSingleton();
        services.TryAddSingleton<>();
        services.TryAdd();
        services.TryAddEnumerable();
    }
```

## 自动注册接口

由于每次对象都需要注册，所以在`Mozlite`中我们将自动分析接口类型，然后实现自动注册，应对三种方式的接口对象，对应的接口如下：

1. 注册普通的接口实例：`IService`，如果多个实现类型使用`IServices`；
2. 注册上下文中单例实例：`IScopedService`，如果多个实现类型使用`IScopedServices`；
3. 注册单例的接口实例：`ISingletonService`，如果多个实现类型使用`ISingletonServices`；

只要在对应的接口或者实例中实现以上接口，`Mozlite`将会自动进行注册程序集中的对象。

>[!NOTE]
>如果要忽略整个程序集的容器，可以在配置文件`appsettings.json`中进行配置，添加`Excludes:[程序集名称]`节点！

**其他链接**

* [自定义程序集服务注册接口](service.md)
* [自定义应用程序中间件使用接口](app.md)
* [替换已有程序集注册的接口实现类](suppress.md)