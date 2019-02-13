# 替换已有程序集注册的接口实现类

在[IOC容器注册接口](ioc.md)中，可以自动进行接口和实现类注册，但是很多时候需要进行手动注册。我们建议每个业务逻辑都写在自己的Razor UI库中，如果在实现业务中，有些实现类不适合我们的业务，就需要进行重写。

在重写了实现类后，需要让`Mozlite`能够自动识别调用哪一个实现类，这样我们就需要忽略原有实现类，可以使用如下特性对新的类进行标注。

```csharp
    /// <summary>
    /// 挂起服务类型，用于替换已有的一些默认服务类型。
    /// </summary>
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true, Inherited = false)]
    public class SuppressAttribute : Attribute
    {
        /// <summary>
        /// 初始化类<see cref="SuppressAttribute"/>。
        /// </summary>
        /// <param name="fullName">全名。</param>
        public SuppressAttribute(string fullName)
        {
            FullName = fullName;
        }

        /// <summary>
        /// 初始化类<see cref="SuppressAttribute"/>。
        /// </summary>
        /// <param name="type">要被替换的类型。</param>
        public SuppressAttribute(Type type)
        {
            FullName = type.FullName;
        }

        /// <summary>
        /// 被替换类型的全名。
        /// </summary>
        public string FullName { get; }
    }
```

这个特性主要就是告诉`Mozlite`，当前标注的类将对`FullName`的类进行替换，那样自动注册实现类的时候将忽略这个类。

>[!NOTE]
>如果要忽略整个程序集的容器，可以在配置文件`appsettings.json`中进行配置，添加`Excludes:[程序集名称]`节点！


**其他链接**

* [IOC容器注册接口](ioc.md)
* [自定义程序集服务注册接口](service.md)
* [自定义应用程序中间件使用接口](app.md)