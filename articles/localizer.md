# 本地化资源

在`Mozlite`中，资源本地化除了可以使用系统自带的接口，框架还自定义了一个接口`ILocalizer`，具体代码如下：

```csharp
    /// <summary>
    /// 本地化服务接口。
    /// </summary>
    public interface ILocalizer : ISingletonService
    {
        /// <summary>
        /// 获取当前键的本地化HTML字符串实例。
        /// </summary>
        /// <param name="key">枚举实例。</param>
        /// <returns>返回当前本地化HTML字符串。</returns>
        IHtmlContent this[Enum key] { get; }

        /// <summary>
        /// 获取当前键的本地化HTML字符串实例。
        /// </summary>
        /// <param name="key">枚举实例。</param>
        /// <param name="args">格式化参数。</param>
        /// <returns>返回当前本地化HTML字符串。</returns>
        IHtmlContent this[Enum key, params object[] args] { get; }

        /// <summary>
        /// 获取当前键的本地化字符串实例。
        /// </summary>
        /// <param name="key">资源键。</param>
        /// <returns>返回当前本地化字符串。</returns>
        string GetString(Enum key);

        /// <summary>
        /// 获取当前键的本地化字符串实例。
        /// </summary>
        /// <param name="key">资源键。</param>
        /// <param name="args">格式化参数。</param>
        /// <returns>返回当前本地化字符串。</returns>
        string GetString(Enum key, params object[] args);

        /// <summary>
        /// 获取当前键的本地化字符串实例。
        /// </summary>
        /// <typeparam name="TResource">包含当前资源包的所在程序集的类型。</typeparam>
        /// <param name="key">资源键。</param>
        /// <returns>返回当前本地化字符串。</returns>
        string GetString<TResource>(string key);

        /// <summary>
        /// 获取当前键的本地化字符串实例。
        /// </summary>
        /// <typeparam name="TResource">包含当前资源包的所在程序集的类型。</typeparam>
        /// <param name="key">资源键。</param>
        /// <param name="args">格式化参数。</param>
        /// <returns>返回当前本地化字符串。</returns>
        string GetString<TResource>(string key, params object[] args);

        /// <summary>
        /// 获取当前表达式类型属性得资源字符串。
        /// </summary>
        /// <typeparam name="TResource">当前属性所在得类型实例。</typeparam>
        /// <param name="expression">属性访问表达式。</param>
        /// <returns>返回当前属性本地化字符串。</returns>
        string GetString<TResource>(Expression<Func<TResource, object>> expression);

        /// <summary>
        /// 获取当前表达式类型属性得资源字符串。
        /// </summary>
        /// <typeparam name="TResource">当前属性所在得类型实例。</typeparam>
        /// <param name="expression">属性访问表达式。</param>
        /// <param name="args">格式化参数。</param>
        /// <returns>返回当前属性本地化字符串。</returns>
        string GetString<TResource>(Expression<Func<TResource, object>> expression, params object[] args);

        /// <summary>
        /// 获取当前键的本地化字符串实例。
        /// </summary>
        /// <param name="type">资源所在程序集的类型。</param>
        /// <param name="key">资源键。</param>
        /// <returns>返回当前本地化字符串。</returns>
        string GetString(Type type, string key);

        /// <summary>
        /// 获取当前键的本地化字符串实例（网站程序集）。
        /// </summary>
        /// <param name="key">资源键。</param>
        /// <returns>返回当前本地化字符串。</returns>
        string GetString(string key);

        /// <summary>
        /// 获取当前键的本地化字符串实例（网站程序集）。
        /// </summary>
        /// <param name="key">资源键。</param>
        /// <param name="args">格式化参数。</param>
        /// <returns>返回当前本地化字符串。</returns>
        string GetString(string key, params object[] args);

        /// <summary>
        /// 获取当前键的本地化HTML字符串实例。
        /// </summary>
        /// <param name="key">枚举实例。</param>
        /// <returns>返回当前本地化HTML字符串。</returns>
        IHtmlContent this[string key] { get; }

        /// <summary>
        /// 获取当前键的本地化HTML字符串实例。
        /// </summary>
        /// <param name="key">枚举实例。</param>
        /// <param name="args">格式化参数。</param>
        /// <returns>返回当前本地化HTML字符串。</returns>
        IHtmlContent this[string key, params object[] args] { get; }
    }
```

这个接口还有一个非常重要的就是作为枚举的本地化，在代码中我们建议使用英文进行程序编写，但是展示经常使用的是中文，这样就可以使用当前接口了。对枚举所在的程序集，定义一个资源，如果在VS中可以对项目属性中的资源添加相关资源。使用格式为`枚举类型名称_枚举属性`进行Key的定义，这样就可以自动进行查找了。