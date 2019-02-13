# 新建项目

使用Mozlite进行开发时候，需要按照如下步骤进行项目初始建立，因为没有制作项目模板所以需要手动完成。

>[!WARNING]
>本文提到的项目名称默认为`Apollo`，如果没有特殊说明，`Apollo`只是代表着例子项目

## 建立项目

根据[简单介绍里的项目目录](intro.md)，在我们的硬盘上建立目录`Apollo`，如果有多个项目都是基于`Mozlite`进行开发，可以将`Mozlite`目录放在所有项目的同级目录中。

├──Apollo(项目文件夹1)

├──Demo2(项目文件夹2)

├──Demo3(项目文件夹3)

├──Mozlite(框架文件夹，直接克隆)

## 下载Mozlite

使用git克隆，或者直接到[Mozlite](https://github.com/Mozlite/aspnetcore)下载源代码到`Mozlite`目录中。

```sh
    clone https://github.com/Mozlite/aspnetcore.git mozlite
```

## 建立CSharp项目

通过VS在目录`Apollo`建立MVC网站项目（也可以是WebPages项目），个人建议使用WebPages项目。当然如果你是前后端代码分离的，使用API项目。添加标准库`Apollo.Extensions`，此库主要是为了衔接`Mozlite`项目，和项目中使用的通用功能模块的定义。

如果有使用到用户登录注册模块，可以将`Mozlite`项目中的`MS.Extensions.Security`中的`Extensions`目录复制到`Apollo.Extensions`项目中，并且修改User等相关定义，兼容当前项目的业务逻辑。并且建立`Apollo.Extensions.Security`Razor UI库，把`MS.Extensions.Security`中的Areas目录复制到项目中，并根据前端设计进行修改。

如果使用到`电子邮件`,`短信`，`通知`,`API`的功能，需要将`Mozlite.Mvc.RazorUI`目录引用到`Apollo`中。

## 修改Startup文件

由于`Mozlite`提供了[自动容器注册接口](ioc.md)，需要将框架相关功能在启动项中进行设置，具体代码如下：

```csharp
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMozlite(Configuration)
                    .AddSqlServer()
                    .AddMozliteMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                //app.UseHsts();
            }
            //必须在其他中间件之前
            //app.UseHttpsRedirection();
            app.UseStaticFiles();
            //app.UseCookiePolicy();

            app.UseMozliteMvc(Configuration);
        }
    }
```

这样就可以在项目中使用`Mozlite`相关功能了，关于具体的功能，其他文档中将进行介绍。

## 修改UI页面

在`Pages/Shared`中添加布局页面，并根据业务逻辑展开开发。

>[!note]
>本框架是基于Bootstrap进行开发的，所有TagHelper有涉及到样式的，必须兼容Bootstrap，否则样式需要自己重新编写。