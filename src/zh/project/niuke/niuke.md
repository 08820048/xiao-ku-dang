---
# 这是文章的标题
title: 牛客项目
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 1
# 设置作者
author: 八尺妖剑
# 设置写作时间
date: 2023-01-22
# 一个页面可以有多个分类
category:
  - 使用指南
# 一个页面可以有多个标签
tag:
  - 板块说明
  - 项目实战
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
# 你可以自定义页脚
footer: 刻意练习，唯手熟尔
# 你可以自定义版权信息
copyright: MIT 协议, 版权所有 © 2023-present 八尺妖剑
---



##  项目概览

项目地址：https://github.com/xiaoyivip/community

### 核心功能：

- 发帖、评论、私信、转发；
- 点赞、关注、通知、搜索；
- 权限、统计、调度、监控；

### 核心技术：

- Spring Boot、SSM
- Redis、Kafka、ElasticSearch
- Spring Security、Quatz、Caffeine

### 项目亮点：

- 项目构建在Spring Boot+SSM框架之上，并统一的进行了状态管理、事务管理、异常处理；
- 利用Redis实现了点赞和关注功能，单机可达5000TPS；
- 利用Kafka实现了异步的站内通知，单机可达7000TPS；
- 利用ElasticSearch实现了全文搜索功能，可准确匹配搜索结果，并高亮显示关键词；
- 利用Caffeine+Redis实现了两级缓存，并优化了热门帖子的访问，单机可达8000QPS。
- 利用Spring Security实现了权限控制，实现了多重角色、URL级别的权限管理；
- 利用HyperLogLog、Bitmap分别实现了UV、DAU的统计功能，100万用户数据只需*M内存空间；
- 利用Quartz实现了任务调度功能，并实现了定时计算帖子分数、定时清理垃圾文件等功能；
- 利用Actuator对应用的Bean、缓存、日志、路径等多个维度进行了监控，并通过自定义的端点对数据库连接进行了监控。

****

##  基本环境配置

> 记录学习和开发牛客社区项目过程中遇到的问题和流程。

### 使用maven

- maven的安装配置

> 略

- maven的基本命令

> 1.查看版本信息

```java
mvn -version
```

> 2.创建maven项目

```java
mvn archetype:generate -DgroupId=com.mycompany.app -DartifactId=my-app -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4 -DinteractiveMode=false
```

> 注意重点修改 ```DgroupId``` ``` DartifactId``` 即可

> 创建成功效果：

![image-20211120153619773](https://i.loli.net/2021/11/20/wsf6aSXjNEL3mRG.png)

> 3.编译项目

> 需要先切换到需要编译的项目目录【含有pom.xml】的文件目录下执行以下命令：```mvn compile```

> 编译效果：

![image-20211120154153309](https://i.loli.net/2021/11/20/vfX4rg9KNskVSiW.png)

> 成功编译之后会再对应目录下生成target目录



> 4.清理

> 执行```mvn clean```可以清除上一次的编译。

![image-20211120154421651](https://i.loli.net/2021/11/20/1F9cOv3JGqEufer.png)

> 当然也可以将编译和清理命令混合使用：```mvn clean compile``` 效果是一样的。



>5.跑测试

> 如果需要运行test文件，可以参考下面的命令:```mvn clean test```

![image-20211120154829713](https://i.loli.net/2021/11/20/Nd8KXJQPj9Vh6zk.png)



###  使用/配置IDEA

> 由于之前已经配置完毕，暂略..



#### 使用Spring Initializr

- 链接： [Spring Initializr](https://start.spring.io/)

![image-20211120161730721](https://i.loli.net/2021/11/20/V9RfJMkAKaQhzFX.png)

> 相关的使用说明见上图。

![image-20211120161826608](https://i.loli.net/2021/11/20/AWHqcxZw812hDFy.png)

> 配置完毕之后点这里下载项目

> 下载解压之后大概是这样的。
>
> ![image-20211120162237224](https://i.loli.net/2021/11/20/iv3n1kGhJCVflY9.png)

![image-20211120163310830](https://i.loli.net/2021/11/20/cIaUpdyz9SXRxBZ.png)

> 刚才下载的项目导入和一般的JavaWeb项目导入方式是一样的，就不再赘述。



###  项目开始

- 修改tomcat服务端口

> 如下图：

![image-20211120165157448](https://i.loli.net/2021/11/20/uzYnBTwHegImkrU.png)

#### 数据库相关

- 导入数据库文件

> 命令行操作：source 文件路径/sql文件

![image-20211121154449921](https://i.loli.net/2021/11/21/qhFEtzXkAN1CD3Q.png)

#### 调试技巧

- 服务端idea的debug调试:
- 执行下一行代码

> F8

- 进入该行所调用的方法

> F7

- 如果想直接执行到结束或者下一个断点的位置(比如跳过循环)

> F9

------------



## 开发社区首页

> 开发社区首页，包括帖子数据的的展示和分页。

### 后端

#### 配置文件

##### pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.6.0</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
	<groupId>com.nowcoder.community</groupId>
	<artifactId>community</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>community</name>
	<description>nowcoder community!</description>
	<properties>
		<java.version>11</java.version>
	</properties>

	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-aop</artifactId>
		</dependency>
<!--		<dependency>-->
<!--			<groupId>org.springframework.boot</groupId>-->
<!--			<artifactId>spring-boot-starter-thymeleaf</artifactId>-->
<!--		</dependency>-->
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-thymeleaf</artifactId>
			<version>2.5.1</version>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-devtools</artifactId>
			<scope>runtime</scope>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>

		<dependency>
			<groupId>mysql</groupId>
			<artifactId>mysql-connector-java</artifactId>
			<version>8.0.16</version>
		</dependency>

		<!--字符串判空-->
		<dependency>
			<groupId>org.apache.commons</groupId>
			<artifactId>commons-lang3</artifactId>
			<version>3.9</version>
		</dependency>


		<dependency>
			<groupId>org.mybatis.spring.boot</groupId>
			<artifactId>mybatis-spring-boot-starter</artifactId>
			<version>2.0.1</version>
		</dependency>
		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>org.projectlombok</groupId>
			<artifactId>lombok</artifactId>
		</dependency>

	</dependencies>
	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
				<configuration>
					<excludes>
						<exclude>
							<groupId>org.projectlombok</groupId>
							<artifactId>lombok</artifactId>
						</exclude>
					</excludes>
				</configuration>
			</plugin>
		</plugins>
	</build>

</project>

```

##### applocation.xml

```xml
# ServerProperties
server.port=8080
server.servlet.context-path=/community
# ThymeleafProperties
spring.thymeleaf.cache=false

# DataSourceProperties
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/community?characterEncoding=utf-8&useSSL=false&serverTimezone=Hongkong
spring.datasource.username=root
spring.datasource.password=123456
spring.datasource.type=com.zaxxer.hikari.HikariDataSource
spring.datasource.hikari.maximum-pool-size=15
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.idle-timeout=30000

# MybatisProperties
mybatis.mapper-locations=classpath:mapper/*.xml
mybatis.type-aliases-package=com.nowcoder.community.entity
mybatis.configuration.useGeneratedKeys=true
mybatis.configuration.mapUnderscoreToCamelCase=true

# logger 级别
logging.level.com.nowcoder.community = debug

# 打印日志到文件夹
#logging.file.path=E:/nowcoder/log/community/community.log
```

> 相关的说明已经注释。

#### 日志文件：logback-spring.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <contextName>community</contextName>
    <!--日志的存放路径-->
    <property name="LOG_PATH" value="E:/nowcoder/log/community"/>
    <!--日志包名-->
    <property name="APPDIR" value="community"/>

    <!-- error file -->
    <appender name="FILE_ERROR" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${LOG_PATH}/${APPDIR}/log_error.log</file>
        <!--日志存放策略：当满5M就创建一个新额定日志文件夹进行存储-->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>${LOG_PATH}/${APPDIR}/error/log-error-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>5MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
            <!--30天有效期：过期清理-->
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <!--以追加的方式存放日志-->
        <append>true</append>
        <!--日志格式-->
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <pattern>%d %level [%thread] %logger{10} [%file:%line] %msg%n</pattern>
            <charset>utf-8</charset>
        </encoder>
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>error</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>

    <!-- warn file -->
    <appender name="FILE_WARN" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${LOG_PATH}/${APPDIR}/log_warn.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>${LOG_PATH}/${APPDIR}/warn/log-warn-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>5MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <append>true</append>
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <pattern>%d %level [%thread] %logger{10} [%file:%line] %msg%n</pattern>
            <charset>utf-8</charset>
        </encoder>
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>warn</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>

    <!-- info file -->
    <appender name="FILE_INFO" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${LOG_PATH}/${APPDIR}/log_info.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>${LOG_PATH}/${APPDIR}/info/log-info-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>5MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <append>true</append>
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <pattern>%d %level [%thread] %logger{10} [%file:%line] %msg%n</pattern>
            <charset>utf-8</charset>
        </encoder>
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>info</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>

    <!-- console -->
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d %level [%thread] %logger{10} [%file:%line] %msg%n</pattern>
            <charset>utf-8</charset>
        </encoder>
        <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
            <level>debug</level>
        </filter>
    </appender>

    <logger name="com.nowcoder.community" level="debug"/>

    <root level="info">
        <appender-ref ref="FILE_ERROR"/>
        <appender-ref ref="FILE_WARN"/>
        <appender-ref ref="FILE_INFO"/>
        <appender-ref ref="STDOUT"/>
    </root>

</configuration>
```

> 由于在实际的项目中，一旦发布到服务器，本地的控制台日志也就没什么实际意义了，所以一般需要将项目运行产生的日志输出到指定的文件夹中，以方便随时查看。

#### 实体类：DiscussPost

```java
package com.nowcoder.community.entity;

import java.util.Date;

/**
 * @author: XuYi
 * @date: 2021/11/21 17:48
 * @description:
 */
public class DiscussPost {
    private int id;
    private int userId;
    private String title;
    private String content;
    private int type;
    private int status;
    private Date createTime;
    private int commentCount;
    private double score;

    public DiscussPost() {

    }

    @Override
    public String toString() {
        return "DiscussPost{" +
                "id=" + id +
                ", userId=" + userId +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", type=" + type +
                ", status=" + status +
                ", createTime=" + createTime +
                ", commentCount=" + commentCount +
                ", score=" + score +
                '}';
    }

    public DiscussPost(int id, int userId, String title, String content, int type, int status, Date createTime, int commentCount, double score) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.type = type;
        this.status = status;
        this.createTime = createTime;
        this.commentCount = commentCount;
        this.score = score;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public int getCommentCount() {
        return commentCount;
    }

    public void setCommentCount(int commentCount) {
        this.commentCount = commentCount;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }
}
```

#### 实体类：User

```java
package com.nowcoder.community.entity;

import java.util.Date;

/**
 * @author: XuYi
 * @date: 2021/11/21 16:23
 * @description:
 */
public class User {
    private int id;
    private String username;
    private String password;
    private String salt;
    private String email;
    private int type;
    private int status;
    private String activationCode;
    private String headerUrl;
    private Date createTime;

    public User() {
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", salt='" + salt + '\'' +
                ", email='" + email + '\'' +
                ", type=" + type +
                ", status=" + status +
                ", activationCode='" + activationCode + '\'' +
                ", headerUrl='" + headerUrl + '\'' +
                ", createTime=" + createTime +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getActivationCode() {
        return activationCode;
    }

    public void setActivationCode(String activationCode) {
        this.activationCode = activationCode;
    }

    public String getHeaderUrl() {
        return headerUrl;
    }

    public void setHeaderUrl(String headerUrl) {
        this.headerUrl = headerUrl;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public User(int id, String username, String password, String salt, String email, int type, int status, String activationCode, String headerUrl, Date createTime) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.salt = salt;
        this.email = email;
        this.type = type;
        this.status = status;
        this.activationCode = activationCode;
        this.headerUrl = headerUrl;
        this.createTime = createTime;
    }
}
```

#### 实体类：Page

> 处理帖子信息数据的分页。

```java
package com.nowcoder.community.entity;

/**
 * 封装分页相关的信息.
 */
public class Page {

    // 当前页码
    private int current = 1;
    // 显示上限
    private int limit = 10;
    // 数据总数(用于计算总页数)
    private int rows;
    // 查询路径(用于复用分页链接)
    private String path;

    public int getCurrent() {
        return current;
    }
	/*需要满足特定条件才可以执行set*/
    public void setCurrent(int current) {
        if (current >= 1) {
            this.current = current;
        }
    }

    public int getLimit() {
        return limit;
    }
	
    /*如果显示的页数大于1小于等于100*/
    public void setLimit(int limit) {
        if (limit >= 1 && limit <= 100) {
            this.limit = limit;
        }
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        if (rows >= 0) {
            this.rows = rows;
        }
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    /**
     * 获取当前页的起始行
     *
     * @return
     */
    public int getOffset() {
        // current * limit - limit
        return (current - 1) * limit;
    }

    /**
     * 获取总页数
     *
     * @return
     */
    public int getTotal() {
        // rows / limit [+1]
        if (rows % limit == 0) {
            return rows / limit;
        } else {
            return rows / limit + 1;
        }
    }

    /**
     * 获取起始页码
     *
     * @return
     */
    public int getFrom() {
        int from = current - 2;
        return Math.max(from, 1);
    }

    /**
     * 获取结束页码
     *
     * @return
     */
    public int getTo() {
        int to = current + 2;
        int total = getTotal();
        return Math.min(to, total);
    }
}
```



#### 配置类：AlphaConfog

> 由于后面很多业务场景需要用到时间的格式化，所以这里以配置类的形式写好，后期只需要将该类装配到所需的地方即可使用。

```java
package com.nowcoder.community.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.text.SimpleDateFormat;

/**
 * @author: XuYi
 * @date: 2021/11/21 11:23
 * @description:
 */
//@Configuration:表示这是一个配置类而非普通类
//配置类的方法名就是Bean的名称

@Configuration
public class AlphaConfog {
    @Bean
    public SimpleDateFormat simpleDateFormat(){
        return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    }
}
```

#### mapper文件：DiscussPost-mapper

> 对数据库直接操作的文件，实现对帖子的增删改查等基本操作。

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.nowcoder.community.dao.DiscussPostMapper">
    <sql id="selectFields">
       id,user_id,title,content,type,status,create_time,comment_count,score
    </sql>
    <select id="selectDiscussPosts" resultType="com.nowcoder.community.entity.DiscussPost">
        select  <include refid="selectFields"/>
        from discuss_post
        where status !=2
        <if test="userId!=0">
            and userId=#{userId}
        </if>
        order by type desc ,create_time desc
        limit #{offset},#{limit}
    </select>

    <select id="selectDiscussPostRows" resultType="java.lang.Integer">
        select count(id)
        from discuss_post
        where status !=2
        <if test="userId!=0">
            and userId=#{userId}
        </if>
    </select>
</mapper>
```

#### 接口实现：Discuss-post

```java
@Repository
@Mapper
public interface DiscussPostMapper {

    List<DiscussPost> selectDiscussPosts(int userId,int offset,int limit);

    int selectDiscussPostRows(@Param("userId") int userId);

}
```

#### 服务层：DiscussPostService

```java
@Service
public class DiscussPostService {
    @Autowired
    private DiscussPostMapper discussPostMapper;

    /**
     * 查询帖子信息
     * @param userId 用户id
     * @param offset 当前页的起始行
     * @param limit 总页数
     * @return list
     */
    public List<DiscussPost> findDiscussPosts(int userId,int offset,int limit) {
        return discussPostMapper.selectDiscussPosts(userId, offset, limit);
    }

    /**
     * 根据用户id查询帖子
     * @param userId 用户id
     * @return 查询结果
     */
    public int findDiscussPostRows(int userId){
        return discussPostMapper.selectDiscussPostRows(userId);
    }

}
```

#### 控制层：HomeController

```java
@Controller
public class HomeController {
    @Autowired
    private DiscussPostService discussPostService;
    @Autowired
    private UserService userService;

    /**
     * 或取帖子数据
     * @param model model
     * @param page 分页信息
     * @return String
     */
    @RequestMapping(path = "/index",method = RequestMethod.GET)
    public String getIndexPage(Model model, Page page){
        //方法调用之前，MVC会自动实例化MODEL和PAGE,并将page注入MODEL
        page.setRows(discussPostService.findDiscussPostRows(0));
        page.setPath("/index");

        List<DiscussPost> list = discussPostService.findDiscussPosts(0, page.getOffset(), page.getLimit());
        List<Map<String,Object>> discussPosts = new ArrayList<>();
        if(!Objects.equals(list,null)){
            for (DiscussPost post : list) {
                Map<String,Object> map = new HashMap<>();
                map.put("post",post);
                User user = userService.findUserById(post.getUserId());
                map.put("user",user);
                discussPosts.add(map);
            }
        }
        model.addAttribute("discussPosts",discussPosts);
        return "/index";
    }
}
```

> 普通的Controller没什么好说的。

### 前端

#### thymeleaf模板渲染

##### 导入模板引擎并修改路径

> 再```html```头部导入如下模板引擎。

```html
xmlns:th="http://www.thymeleaf.org"
```

> 将```index.html```中的本地路径用```thymeleaf```的语法修改过来。如：
>
> ```html
> <link rel="stylesheet" th:href="@{/css/global.css}" />
> ```
>
> ```html
> 	<script th:src="@{/js/global.js}"></script>
> 	<script th:src="@{js/index.js}"></script>
> ```

##### 设置公共引用部分

> - 由于再很多不同的子页面中都需要用到```header```部分的代码内容，所以可以利用如下模板语法将该部分设为公有的引用，语法如下：
>
> ```html
> //其中的header为需要再其他页面引用到的公共部分的别名。
> th:fragment="header" 
> ```
>
> - 再在需要引用的地方加上如下代码：
>
> ```html
> //其中引号里面的内容，index表示该公共部分代码来自的页面为index.html。
> //header就是刚刚设置的一个引用别名。
> //::是必须的，是模板语法的一部分。
> th:replace="index::header"
> ```
>
> - 修改超链接标签为模板格式，如：
>
> ```html
> <a class="nav-link" th:href="@{index}">首页</a>
> <a class="nav-link" th:href="@{/register}">注册</a>
> <a class="nav-link" th:href="@{/login}">登录</a>
> ```
>
> > 语法：```th:href=@{"/xxxx"}```
>
> - 替换前端帖子修改的静态数据
>
>   > 因为最终社区首页的帖子数据是要从数据库读取的，所以需要利用模板语法进行动态的替换。
>
>   - 模板的遍历语法：```th:each="map:${discussPosts}"```
>
>   - 上面的语法表示从后台传过来的map中取得数据并以each遍历的方式循环渲染到页面中。
>
>   - 文本替换：语法```th:utext="${map.post.title}"```
>
>   - src替换：```th:src="${map.user.headerUrl}"```
>
>   - 格式化日期：```th:text="${#dates.format(map.post.createTime,'yyyy-MM-dd HH:mm:ss')}"```
>
>   - 动静结合,比如在修改某些标签的属性时，需要根据需求动态的改变属性的值：``` th:class="|page-item ${page.current==1?'disabled':''}|"```
>
>     > 先用竖线|将要修改的属性标识出来，利用${}语法进行动态替换，比如上面就表示如果当前page.curent的值为1，那就添加一个禁用属性'disabled'否则就不操作。
>
>   - 嵌套语法用法参考：```th:href="@{${page.path}(current=${i})}"```
>
> 

#### 完整代码：

```html
<!doctype html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="icon" href="https://static.nowcoder.com/images/logo_87_87.png"/>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
	<link rel="stylesheet" th:href="@{/css/global.css}" />
	<title>牛客网-首页</title>
</head>
<body>	
	<div class="nk-container">
		<!-- 头部 -->
		<header class="bg-dark sticky-top" th:fragment="header">
			<div class="container">
				<!-- 导航 -->
				<nav class="navbar navbar-expand-lg navbar-dark">
					<!-- logo -->
					<a class="navbar-brand" href="#"></a>
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<!-- 功能 -->
					<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav mr-auto">
							<li class="nav-item ml-3 btn-group-vertical">
								<a class="nav-link" th:href="@{index}">首页</a>
							</li>
							<li class="nav-item ml-3 btn-group-vertical">
								<a class="nav-link position-relative" href="site/letter.html">消息<span class="badge badge-danger">12</span></a>
							</li>
							<li class="nav-item ml-3 btn-group-vertical">
								<a class="nav-link" th:href="@{/register}">注册</a>
							</li>
							<li class="nav-item ml-3 btn-group-vertical">
								<a class="nav-link" th:href="@{/login}">登录</a>
							</li>
							<li class="nav-item ml-3 btn-group-vertical dropdown">
								<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<img src="http://images.nowcoder.com/head/1t.png" class="rounded-circle" style="width:30px;"/>
								</a>
								<div class="dropdown-menu" aria-labelledby="navbarDropdown">
									<a class="dropdown-item text-center" href="site/profile.html">个人主页</a>
									<a class="dropdown-item text-center" href="site/setting.html">账号设置</a>
									<a class="dropdown-item text-center" href="site/login.html">退出登录</a>
									<div class="dropdown-divider"></div>
									<span class="dropdown-item text-center text-secondary">nowcoder</span>
								</div>
							</li>
						</ul>
						<!-- 搜索 -->
						<form class="form-inline my-2 my-lg-0" action="site/search.html">
							<input class="form-control mr-sm-2" type="search" aria-label="Search" />
							<button class="btn btn-outline-light my-2 my-sm-0" type="submit">搜索</button>
						</form>
					</div>
				</nav>
			</div>
		</header>

		<!-- 内容 -->
		<div class="main">
			<div class="container">
				<div class="position-relative">
					<!-- 筛选条件 -->
					<ul class="nav nav-tabs mb-3">
						<li class="nav-item">
							<a class="nav-link active" href="#">最新</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">最热</a>
						</li>
					</ul>
					<button type="button" class="btn btn-primary btn-sm position-absolute rt-0" data-toggle="modal" data-target="#publishModal">我要发布</button>
				</div>
				<!-- 弹出框 -->
				<div class="modal fade" id="publishModal" tabindex="-1" role="dialog" aria-labelledby="publishModalLabel" aria-hidden="true">
					<div class="modal-dialog modal-lg" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="publishModalLabel">新帖发布</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<form>
									<div class="form-group">
										<label for="recipient-name" class="col-form-label">标题：</label>
										<input type="text" class="form-control" id="recipient-name">
									</div>
									<div class="form-group">
										<label for="message-text" class="col-form-label">正文：</label>
										<textarea class="form-control" id="message-text" rows="15"></textarea>
									</div>
								</form>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
								<button type="button" class="btn btn-primary" id="publishBtn">发布</button>
							</div>
						</div>
					</div>
				</div>
				<!-- 提示框 -->
				<div class="modal fade" id="hintModal" tabindex="-1" role="dialog" aria-labelledby="hintModalLabel" aria-hidden="true">
					<div class="modal-dialog modal-lg" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="hintModalLabel">提示</h5>
							</div>
							<div class="modal-body" id="hintBody">
								发布完毕!
							</div>
						</div>
					</div>
				</div>
				
				<!-- 帖子列表 -->
				<ul class="list-unstyled">
					<li class="media pb-3 pt-3 mb-3 border-bottom" th:each="map:${discussPosts}">
						<a href="site/profile.html">
							<img th:src="${map.user.headerUrl}" class="mr-4 rounded-circle user-header" alt="用户头像">
						</a>
						<div class="media-body">
							<h6 class="mt-0 mb-3">
								<a href="#" th:utext="${map.post.title}">备战春招，面试刷题跟他复习，一个月全搞定！</a>
								<span class="badge badge-secondary bg-primary" th:if="${map.post.type==1}">置顶</span>
								<span class="badge badge-secondary bg-danger" th:if="${map.post.status==1}">精华
								</span>
							</h6>
							<div class="text-muted font-size-12">
								<u class="mr-3" th:utext="${map.user.username}">寒江雪</u> 发布于 <b
									th:text="${#dates.format(map.post.createTime,'yyyy-MM-dd HH:mm:ss')}">2019-04-15
								15:32:18</b>
								<ul class="d-inline float-right">
									<li class="d-inline ml-2">赞 11</li>
									<li class="d-inline ml-2">|</li>
									<li class="d-inline ml-2">回帖 7</li>
								</ul>
							</div>
						</div>
					</li>
				</ul>
				<!-- 分页 -->
<!--				<nav class="mt-5" th:if="${page.rows>0}">-->
<!--				-->
<!--					<ul class="pagination justify-content-center">-->
<!--						<li class="page-item"><a class="page-link" th:href="@{${page.path}(current=1)}">首页</a>-->
<!--						</li>-->

<!--						<li th:class="|page-item ${page.current==1?'disabled' : ''}|"><a class="page-link"-->
<!--														  th:href="@{${page.path}(current=${page.current - 1})}">上一页-->
<!--						</a>-->
<!--						</li>-->

<!--						<li th:class="|page-item ${i==page.current ? 'active' : ''}|"-->
<!--							th:each="i:${#numbers.sequence(page.from,page.to)}">-->
<!--							<a class="page-link" href="#" th:text="${i}">1</a>-->
<!--						</li>-->

<!--						<li th:class="|page-item ${page.current==page.total ? 'disabled' : ''}|"><a class="page-link"-->
<!--												 th:href="@{${page.path}(current=${page.current + 1})}">下一页</a>-->
<!--						</li>-->

<!--						<li class="page-item"><a class="page-link" th:href="@{${page.path}(current=${page.total})}">末页-->
<!--						</a>-->
<!--						</li>-->
<!--					</ul>-->
<!--				</nav>-->

				<!-- 分页 -->
				<nav class="mt-5" th:if="${page.rows>0}">
					<ul class="pagination justify-content-center">
						<li class="page-item">
							<a class="page-link" th:href="@{${page.path}(current=1)}">首页</a>
						</li>
						<li th:class="|page-item ${page.current==1?'disabled':''}|">
							<a class="page-link" th:href="@{${page.path}(current=${page.current - 1})}">上一页</a></li>
						<li th:class="|page-item ${i==page.current?'active':''}|" th:each="i:${#numbers.sequence(page.from,page.to)}">
							<a class="page-link" th:href="@{${page.path}(current=${i})}" th:text="${i}">
							</a>
						</li>
						<li th:class="|page-item ${page.current==page.total?'disabled':''}|">
							<a class="page-link" th:href="@{${page.path}(current=${page.current+1})}">下一页</a>
						</li>
						<li class="page-item">
							<a class="page-link" th:href="@{${page.path}(current=${page.total})}">末页</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>

		<!-- 尾部 -->
		<footer class="bg-dark">
			<div class="container">
				<div class="row">
					<!-- 二维码 -->
					<div class="col-4 qrcode">
						<img src="https://uploadfiles.nowcoder.com/app/app_download.png" class="img-thumbnail" style="width:136px;" />
					</div>
					<!-- 公司信息 -->
					<div class="col-8 detail-info">
						<div class="row">
							<div class="col">
								<ul class="nav">
									<li class="nav-item">
										<a class="nav-link text-light" href="#">关于我们</a>
									</li>
									<li class="nav-item">
										<a class="nav-link text-light" href="#">加入我们</a>
									</li>
									<li class="nav-item">
										<a class="nav-link text-light" href="#">意见反馈</a>
									</li>
									<li class="nav-item">
										<a class="nav-link text-light" href="#">企业服务</a>
									</li>
									<li class="nav-item">
										<a class="nav-link text-light" href="#">联系我们</a>
									</li>
									<li class="nav-item">
										<a class="nav-link text-light" href="#">免责声明</a>
									</li>
									<li class="nav-item">
										<a class="nav-link text-light" href="#">友情链接</a>
									</li>
								</ul>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<ul class="nav btn-group-vertical company-info">
									<li class="nav-item text-white-50">
										公司地址：北京市朝阳区大屯路东金泉时代3-2708北京牛客科技有限公司
									</li>
									<li class="nav-item text-white-50">
										联系方式：010-60728802(电话)&nbsp;&nbsp;&nbsp;&nbsp;admin@nowcoder.com
									</li>
									<li class="nav-item text-white-50">
										牛客科技©2018 All rights reserved
									</li>
									<li class="nav-item text-white-50">
										京ICP备14055008号-4 &nbsp;&nbsp;&nbsp;&nbsp;
										<img src="http://static.nowcoder.com/company/images/res/ghs.png" style="width:18px;" />
										京公网安备 11010502036488号
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	</div>

	<script src="https://code.jquery.com/jquery-3.3.1.min.js" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" crossorigin="anonymous"></script>
	<script th:src="@{/js/global.js}"></script>
	<script th:src="@{js/index.js}"></script>
</body>
</html>

```

#### 启动项目

> 地址栏输入项目服务地址：```http://localhost:8080/community/index```

![](https://images.waer.ltd/img/indexs.png)

> 成功运行并加载了数据库的帖子数据。

****

## 开发社区注册功能

> 实现社区注册功能，包括邮件激活。

![](https://images.waer.ltd/img/z1.png)

#### 业务分析/描述

> 当用户点击注册之后，跳转注册页。完成注册信息的填写，如果用户点击了【立即注册】按钮，后台对输入的表单数据进行规则校验，校验通过就将注册信息写入数据库，并提示用户进行邮件激活。
>
> 大致流程图如下：

<img src="https://images.waer.ltd/img/z2.png" style="zoom:50%;" />

#### 编码工作

> 根据上面的业务需求，后端需要做的工作主要有3个，
>
> - 校验前台注册表单提交来的数据。
> - 将通过校验规则的数据写入数据库。
> - 给注册成功的用户发送激活邮件。
> - 执行账户激活操作的后端处理。



------

##### mapper.xml

> 主要是对用户表数据的增删改查，没有很复杂的sql。

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.nowcoder.community.dao.UserMapper">
    <sql id="insertFields">
        username,password,salt,email,type,status,activation_code,header_url,create_time
    </sql>

    <sql id="selectFields">
        id, username,password,salt,email,type,status,activation_code,header_url,create_time
    </sql>
    <select id="selectById" resultType="com.nowcoder.community.entity.User">
        select <include refid="selectFields"/>
        from user
        where id = #{id}
    </select>

    <select id="selectByName" resultType="com.nowcoder.community.entity.User">
        select <include refid="selectFields"/>
        from user
        where username = #{username}
    </select>

    <select id="selectByEmail" resultType="com.nowcoder.community.entity.User">
        select <include refid="selectFields"/>
        from user
        where email = #{email}
    </select>

    <insert id="insertUser" parameterType="com.nowcoder.community.entity.User" keyProperty="id">
        insert into user (<include refid="insertFields"/>)
        values (#{username},#{password},#{salt},#{email},#{type},#{status},#{activationCode},#{headerUrl},#{createTime})
    </insert>

    <update id="updateStatus">
        update user set status=#{status}
        where id=#{id}
    </update>

    <update id="updateHeader">
        update user set header_url=#{headerUrl}
        where id=#{id}
    </update>

    <update id="updatePassword">
        update user set password=#{password}
        where id=#{id}
    </update>
</mapper>
```



##### DAO层

```java
@Mapper
@Repository
public interface UserMapper {
    User selectById(int id);

    User selectByName(String username);

    User selectByEmail(String email);

    int insertUser(User user);

    int updateStatus(int id,int status);

    int updateHeader(int id,String headerUrl);

    int updatePassword(int id,String password);

}
```

> 别忘了加上```@Mapper```,```@Repository```注解。



##### 服务层

> 所有实现主要功能的业务均回在这里进行处理。所以是重点。

- 需要用到的数据

  ```java
  @Autowired
  private UserMapper userMapper;
  
  @Autowired
  private MailClient mailClient;
  
  //将thymeleaf模板注入，后面发送邮件会用到
  @Autowired
  private TemplateEngine templateEngine;
  //配置路径，用于后面邮件激活功能
  @Value("${community.path.domain}")
  private String domain;
  //将配置文件里的服务路径注入进来，后面也会用到
  @Value("${server.servlet.context-path}")
  private String contextPath;
  ```

- 注册用户（写入用户信息）

  ```Java
  /**
   * 用户注册功能
   * @param user 注册用户
   * @return map
   */
  public Map<String,Object> register(User user){
      Map<String, Object> map = new HashMap<>();
      /*处理空值*/
      if(Objects.equals(user,null)){
          throw new IllegalArgumentException("参数不能为空!");
  
      }
      if(StringUtils.isBlank(user.getUsername())){
          map.put("usernameMsg","账号不能为空!");
          return map;
      }
      if(StringUtils.isBlank(user.getPassword())){
          map.put("passwordMsg","密码不能为空！");
          return map;
      }
      if(StringUtils.isBlank(user.getEmail())){
          map.put("emailMsg","邮箱不能为空！");
          return map;
      }
      /*验证账号*/
      User u = userMapper.selectByName(user.getUsername());
      if(!Objects.equals(u,null)){
          map.put("usernameMsg","该账号已存在!");
          return map;
      }
      /*验证邮箱*/
      u= userMapper.selectByEmail(user.getEmail());
      if(!Objects.equals(u,null)){
          map.put("emailMsg","该邮箱已被注册!");
          return map;
      }
      /*用户注册*/
      user.setSalt(CommunityUtil.generateUUID().substring(0,5));
      user.setPassword(CommunityUtil.md5(user.getPassword()+user.getSalt()));
      user.setType(0);
      user.setStatus(0);
      user.setActivationCode(CommunityUtil.generateUUID());
      user.setHeaderUrl(String.format("http://images.nowcoder.com/head/%dt.png",new Random().nextInt(1000)));
      user.setCreateTime(new Date());
      userMapper.insertUser(user);
      /*发送激活邮件*/
      Context context = new Context();
      context.setVariable("email",user.getEmail());
      /*http:localhost:8080/community/activation/101/code*/
      String url = domain+contextPath+"/activation/"+user.getId()+"/"+user.getActivationCode();
      context.setVariable("url",url);
      String contents = templateEngine.process("/mail/activation",context);
      mailClient.sendMail(user.getEmail(),"激活账号",contents);
      return map;
  }
  ```

  > 这里面用到了两个工具类```StringUtils```,```mail```在pom里面需要导入对应的坐标。
  >
  > ```xml
  > <!--发送邮件-->
  > <dependency>
  > <groupId>org.springframework.boot</groupId>
  > <artifactId>spring-boot-starter-mail</artifactId>
  > <version>2.5.4</version>
  > </dependency>
  > <!--字符串判空-->
  > <dependency>
  > <groupId>org.apache.commons</groupId>
  > <artifactId>commons-lang3</artifactId>
  > <version>3.9</version>
  > </dependency>
  > ```

  > 发送邮件需要配置客户端工具类```MailClient```，在utils包中创建一个```MailClient.java```类
  >
  > 具体内容如下：
  >
  > ```java
  > package com.nowcoder.community.utils;
  > import org.slf4j.Logger;
  > import org.slf4j.LoggerFactory;
  > import org.springframework.beans.factory.annotation.Autowired;
  > import org.springframework.beans.factory.annotation.Value;
  > import org.springframework.mail.javamail.JavaMailSender;
  > import org.springframework.mail.javamail.MimeMessageHelper;
  > import org.springframework.stereotype.Component;
  > import org.thymeleaf.TemplateEngine;
  > import javax.mail.MessagingException;
  > import javax.mail.internet.MimeMessage;
  > /**
  >  * @author: XuYi
  >  * @date: 2021/11/22 17:54
  >  * @description: 封装邮件发送工具客户端
  >  */
  > @Component
  > public class MailClient {
  >     //用来记录日志，方便抓邮件发送中出现的问题。
  >     private static final Logger logger = LoggerFactory.getLogger(MailClient.class);
  >     @Autowired
  >     private JavaMailSender mailSender;
  >     @Autowired
  >     private TemplateEngine templateEngine;
  > 	//发送邮件需要一个发送者的邮箱，用@value注解进行注入
  >     @Value("${spring.mail.username}")
  >     private String from;
  >     public void sendMail(String to, String subject, String content) {
  >         try {
  >             MimeMessage message = mailSender.createMimeMessage();
  >             MimeMessageHelper helper = new MimeMessageHelper(message);
  >             helper.setFrom(from);
  >             helper.setTo(to);
  >             helper.setSubject(subject);
  >             helper.setText(content, true);
  >             mailSender.send(helper.getMimeMessage());
  >         } catch (MessagingException e) {
  >             logger.error("发送邮件失败:" + e.getMessage());
  >         }
  >         logger.info("邮件发送成功");
  >     }
  > }
  > ```

  > 在```application```配置文件中配置发送者的相关信息。
  >
  > ```java
  > # Mail相关
  > 	//邮件发送方
  > spring.mail.host=smtp.sina.com
  > //端口号一般为465
  > spring.mail.port=465
  > //发送者邮箱号
  > spring.mail.username=workcoder@sina.com
  > //邮箱授权码：这里也可以填写密码，安全起见，我用的授权码
  > spring.mail.password=d6dd27b52588xxxa
  > //开启smtp
  > spring.mail.protocol=smtp
  > //安全验证
  > spring.mail.properties.mail.smtp.ssl.enable=true
  > //这条是可选的，但建议写上，避免可能出现乱七八糟的问题
  > spring.mail.properties.mail.smtp.starttls.enable=true
  > 
  > # community
  > //项目地址
  > community.path.domain =  http://localhost:8080
  > ```

- 配置邮箱相关功能，获取授权码。

> 由于我是用的新浪邮箱，所以这里就以新浪邮箱为例。

![](https://images.waer.ltd/img/z3.png)



##### 邮件激活

```Java
/**
 * 激活注册过的账号
 * @param userId 注册用户id
 * @param code 携带的激活码
 * @return 激活状态
 */
public int activation(int userId,String code){
    User user = userMapper.selectById(userId);
    if(Objects.equals(user.getStatus(),1)){
        return ACTIVATION_REPEAT;
    }else if(Objects.equals(user.getActivationCode(),code)){
        userMapper.updateStatus(userId,1);
        return ACTIVATION_SUCCESS;
    }else{
        return ACTIVATION_FAILURE;
    }
}
```

> ```CommunityConstant.java```接口

```java
package com.nowcoder.community.utils;

/**
 * @author: XuYi
 * @date: 2021/11/24 19:22
 * @description: 公用数据接口
 */
public interface CommunityConstant {
    /*激活成功*/
    int ACTIVATION_SUCCESS = 0;
    /*重复激活*/
    int ACTIVATION_REPEAT = 1;
    /*激活失败*/
    int ACTIVATION_FAILURE = 2;
}
```

- 控制层

  > 主要负责数据的分发和简单处理。

  ```java
  package com.nowcoder.community.controller;
  import com.nowcoder.community.entity.User;
  import com.nowcoder.community.service.UserService;
  import com.nowcoder.community.utils.CommunityConstant;
  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.stereotype.Controller;
  import org.springframework.ui.Model;
  import org.springframework.web.bind.annotation.PathVariable;
  import org.springframework.web.bind.annotation.RequestMapping;
  import org.springframework.web.bind.annotation.RequestMethod;
  import java.util.Map;
  import java.util.Objects;
  /**
   * @author: XuYi
   * @date: 2021/11/24 17:15
   * @description: 登录注册
   */
  @Controller
  
  public class LoginController implements CommunityConstant {
      @Autowired
      private UserService userService;
  
      /**
       * 返回注册页面
       * @return strPage
       */
      @RequestMapping(path = "/register",method = RequestMethod.GET)
      public String getRegisterPage() {
          return "/site/register";
      }
  
      /**
       * 返回登录页面
       * @return str Page
       */
      @RequestMapping(path = "/login", method = RequestMethod.GET)
      public String getLoginPage() {
          return "/site/login";
      }
  
      /**
       * 用户注册
       * @param model model
       * @param user 用户对象
       * @return String Msg
       */
      @RequestMapping(path = "/register", method = RequestMethod.POST)
      public String register(Model model, User user){
          Map<String, Object> map = userService.register(user);
          if(Objects.equals(map,null) || map.isEmpty()){
              model.addAttribute("msg","注册成功,我们已经向您的邮箱发送了激活邮件,请尽快激活!");
              model.addAttribute("target","/index");
              return "/site/operate-result";
          }else{
              model.addAttribute("usernameMsg", map.get("usernameMsg"));
              model.addAttribute("passwordMsg", map.get("passwordMsg"));
              model.addAttribute("emailMsg", map.get("emailMsg"));
              return "/site/register";
          }
      }
  
      @RequestMapping(path = "/activation/{userId}/{code}",method = RequestMethod.GET)
      public String activation(Model model, @PathVariable("userId") int userId, @PathVariable("code") String code){
          int result = userService.activation(userId, code);
          if(result== ACTIVATION_SUCCESS){
              model.addAttribute("msg","您的账号已经可以正常使用了!");
              model.addAttribute("target","/login");
          }else if(result == ACTIVATION_REPEAT){
              model.addAttribute("msg","该账号已激活,请勿重复操作!");
              model.addAttribute("target","/index");
          }else {
              model.addAttribute("msg","激活失败,您提供的激活码不正确!");
              model.addAttribute("target","/index");
          }
          return "/site/operate-result";
      }
  }
  ```

##### 前端页面

> 获取表单数据，进行数据的校验结果回显。

```html
<!doctype html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
   <link rel="icon" href="https://static.nowcoder.com/images/logo_87_87.png"/>
   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
   <link rel="stylesheet" th:href="@{/css/global.css}" />
   <link rel="stylesheet" th:href="@{/css/login.css}" />
   <title>牛客网-注册</title>
</head>
<body>
   <div class="nk-container">
      <!-- 头部 -->
      <header class="bg-dark sticky-top" th:replace="index::header">
         <div class="container">
            <!-- 导航 -->
            <nav class="navbar navbar-expand-lg navbar-dark">
               <!-- logo -->
               <a class="navbar-brand" href="#"></a>
               <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
               </button>
               <!-- 功能 -->
               <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav mr-auto">
                     <li class="nav-item ml-3 btn-group-vertical">
                        <a class="nav-link" href="../index.html">首页</a>
                     </li>
                     <li class="nav-item ml-3 btn-group-vertical">
                        <a class="nav-link position-relative" href="letter.html">消息<span class="badge badge-danger">12</span></a>
                     </li>
                     <li class="nav-item ml-3 btn-group-vertical">
                        <a class="nav-link" href="register.html">注册</a>
                     </li>
                     <li class="nav-item ml-3 btn-group-vertical">
                        <a class="nav-link" href="login.html">登录</a>
                     </li>
                     <li class="nav-item ml-3 btn-group-vertical dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                           <img src="http://images.nowcoder.com/head/1t.png" class="rounded-circle" style="width:30px;"/>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                           <a class="dropdown-item text-center" href="profile.html">个人主页</a>
                           <a class="dropdown-item text-center" href="setting.html">账号设置</a>
                           <a class="dropdown-item text-center" href="login.html">退出登录</a>
                           <div class="dropdown-divider"></div>
                           <span class="dropdown-item text-center text-secondary">nowcoder</span>
                        </div>
                     </li>
                  </ul>
                  <!-- 搜索 -->
                  <form class="form-inline my-2 my-lg-0" action="search.html">
                     <input class="form-control mr-sm-2" type="search" aria-label="Search" />
                     <button class="btn btn-outline-light my-2 my-sm-0" type="submit">搜索</button>
                  </form>
               </div>
            </nav>
         </div>
      </header>

      <!-- 内容 -->
      <div class="main">
         <div class="container pl-5 pr-5 pt-3 pb-3 mt-3 mb-3">
            <h3 class="text-center text-info border-bottom pb-3">注&nbsp;&nbsp;册</h3>
            <form class="mt-5" method="post" th:action="@{/register}">
               <div class="form-group row">
                  <label for="username" class="col-sm-2 col-form-label text-right">账号:</label>
                  <div class="col-sm-10">
                     <input type="text"
                           th:class="|form-control ${usernameMsg!=null ? 'is-invalid' :''}| "
                           name="username"
                           id="username"
                           th:value="${user!=null ? user.username:''}"
                           placeholder="请输入您的账号!" required>
                     <div class="invalid-feedback" th:text="${usernameMsg}">
                        该账号已存在!
                     </div>
                  </div>
               </div>
               <div class="form-group row mt-4">
                  <label for="password" class="col-sm-2 col-form-label text-right">密码:</label>
                  <div class="col-sm-10">
                     <input type="password" th:class="|form-control ${passwordMsg!=null ? 'is-invalid' :''}| "
                           name="password"
                           id="password"
                           th:value="${user!=null ? user.password:''}"
                           placeholder="请输入您的密码!"
                           required>
                     <div class="invalid-feedback" th:text="${passwordMsg}">
                        密码长度不能小于8位!
                     </div>                   
                  </div>
               </div>
               <div class="form-group row mt-4">
                  <label for="confirm-password" class="col-sm-2 col-form-label text-right">确认密码:</label>
                  <div class="col-sm-10">
                     <input type="password" class="form-control"
                           id="confirm-password"
                           th:value="${user!=null ? user.password:''}"
                           placeholder="请再次输入密码!" required>
                     <div class="invalid-feedback">
                        两次输入的密码不一致!
                     </div>
                  </div>
               </div>
               <div class="form-group row">
                  <label for="email" class="col-sm-2 col-form-label text-right">邮箱:</label>
                  <div class="col-sm-10">
                     <input type="email"
                           th:class="|form-control ${emailMsg!=null ? 'is-invalid' :''}| "
                           name="email"
                           th:value="${user!=null ? user.email:''}"
                           id="email" placeholder="请输入您的邮箱!"
                           required>
                     <div class="invalid-feedback" th:text="${emailMsg}">
                        该邮箱已注册!
                     </div>
                  </div>
               </div>
               <div class="form-group row mt-4">
                  <div class="col-sm-2"></div>
                  <div class="col-sm-10 text-center">
                     <button type="submit" class="btn btn-info text-white form-control">立即注册</button>
                  </div>
               </div>
            </form>             
         </div>
      </div>

      <!-- 尾部 -->
      <footer class="bg-dark">
         <div class="container">
            <div class="row">
               <!-- 二维码 -->
               <div class="col-4 qrcode">
                  <img src="https://uploadfiles.nowcoder.com/app/app_download.png" class="img-thumbnail" style="width:136px;" />
               </div>
               <!-- 公司信息 -->
               <div class="col-8 detail-info">
                  <div class="row">
                     <div class="col">
                        <ul class="nav">
                           <li class="nav-item">
                              <a class="nav-link text-light" href="#">关于我们</a>
                           </li>
                           <li class="nav-item">
                              <a class="nav-link text-light" href="#">加入我们</a>
                           </li>
                           <li class="nav-item">
                              <a class="nav-link text-light" href="#">意见反馈</a>
                           </li>
                           <li class="nav-item">
                              <a class="nav-link text-light" href="#">企业服务</a>
                           </li>
                           <li class="nav-item">
                              <a class="nav-link text-light" href="#">联系我们</a>
                           </li>
                           <li class="nav-item">
                              <a class="nav-link text-light" href="#">免责声明</a>
                           </li>
                           <li class="nav-item">
                              <a class="nav-link text-light" href="#">友情链接</a>
                           </li>
                        </ul>
                     </div>
                  </div>
                  <div class="row">
                     <div class="col">
                        <ul class="nav btn-group-vertical company-info">
                           <li class="nav-item text-white-50">
                              公司地址：北京市朝阳区大屯路东金泉时代3-2708北京牛客科技有限公司
                           </li>
                           <li class="nav-item text-white-50">
                              联系方式：010-60728802(电话)&nbsp;&nbsp;&nbsp;&nbsp;admin@nowcoder.com
                           </li>
                           <li class="nav-item text-white-50">
                              牛客科技©2018 All rights reserved
                           </li>
                           <li class="nav-item text-white-50">
                              京ICP备14055008号-4 &nbsp;&nbsp;&nbsp;&nbsp;
                              <img src="http://static.nowcoder.com/company/images/res/ghs.png" style="width:18px;" />
                              京公网安备 11010502036488号
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   </div>

   <script src="https://code.jquery.com/jquery-3.3.1.min.js" crossorigin="anonymous"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" crossorigin="anonymous"></script>
   <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" crossorigin="anonymous"></script>
   <script th:src="@{/js/global.js}"></script>
   <script th:src="@{/js/register.js}"></script>
</body>
</html>
```

> 激活成功之后的提示页面

```html
<!doctype html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="icon" href="https://static.nowcoder.com/images/logo_87_87.png"/>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
	<link rel="stylesheet" th:href="@{/css/global.css}" />
	<title>牛客网-操作结果</title>
</head>
<body class="bg-white">
<div class="nk-container">
	<!-- 头部 -->
	<header class="bg-dark sticky-top" th:replace="idx::header">
		<div class="container">
			<!-- 导航 -->
			<nav class="navbar navbar-expand-lg navbar-dark">
				<!-- logo -->
				<a class="navbar-brand" href="#"></a>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<!-- 功能 -->
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav mr-auto">
						<li class="nav-item ml-3 btn-group-vertical">
							<a class="nav-link" href="../index.html">首页</a>
						</li>
						<li class="nav-item ml-3 btn-group-vertical">
							<a class="nav-link position-relative" href="letter.html">消息<span class="badge badge-danger">12</span></a>
						</li>
						<li class="nav-item ml-3 btn-group-vertical">
							<a class="nav-link" href="register.html">注册</a>
						</li>
						<li class="nav-item ml-3 btn-group-vertical">
							<a class="nav-link" href="login.html">登录</a>
						</li>
						<li class="nav-item ml-3 btn-group-vertical dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<img src="http://images.nowcoder.com/head/1t.png" class="rounded-circle" style="width:30px;"/>
							</a>
							<div class="dropdown-menu" aria-labelledby="navbarDropdown">
								<a class="dropdown-item text-center" href="profile.html">个人主页</a>
								<a class="dropdown-item text-center" href="setting.html">账号设置</a>
								<a class="dropdown-item text-center" href="login.html">退出登录</a>
								<div class="dropdown-divider"></div>
								<span class="dropdown-item text-center text-secondary">nowcoder</span>
							</div>
						</li>
					</ul>
					<!-- 搜索 -->
					<form class="form-inline my-2 my-lg-0" action="search.html">
						<input class="form-control mr-sm-2" type="search" aria-label="Search" />
						<button class="btn btn-outline-light my-2 my-sm-0" type="submit">搜索</button>
					</form>
				</div>
			</nav>
		</div>
	</header>

	<!-- 内容 -->
	<div class="main">
		<div class="container mt-5">
			<div class="jumbotron">
				<p class="lead" th:text="${msg}">您的账号已经激活成功,可以正常使用了!</p>
				<hr class="my-4">
				<p>
					系统会在 <span id="seconds" class="text-danger">8</span> 秒后自动跳转,
					您也可以点此 <a id="target" th:href="@{${target}}" class="text-primary">链接</a>, 手动跳转!
				</p>
			</div>
		</div>
	</div>

	<!-- 尾部 -->
	<footer class="bg-dark">
		<div class="container">
			<div class="row">
				<!-- 二维码 -->
				<div class="col-4 qrcode">
					<img src="https://uploadfiles.nowcoder.com/app/app_download.png" class="img-thumbnail" style="width:136px;" />
				</div>
				<!-- 公司信息 -->
				<div class="col-8 detail-info">
					<div class="row">
						<div class="col">
							<ul class="nav">
								<li class="nav-item">
									<a class="nav-link text-light" href="#">关于我们</a>
								</li>
								<li class="nav-item">
									<a class="nav-link text-light" href="#">加入我们</a>
								</li>
								<li class="nav-item">
									<a class="nav-link text-light" href="#">意见反馈</a>
								</li>
								<li class="nav-item">
									<a class="nav-link text-light" href="#">企业服务</a>
								</li>
								<li class="nav-item">
									<a class="nav-link text-light" href="#">联系我们</a>
								</li>
								<li class="nav-item">
									<a class="nav-link text-light" href="#">免责声明</a>
								</li>
								<li class="nav-item">
									<a class="nav-link text-light" href="#">友情链接</a>
								</li>
							</ul>
						</div>
					</div>
					<div class="row">
						<div class="col">
							<ul class="nav btn-group-vertical company-info">
								<li class="nav-item text-white-50">
									公司地址：北京市朝阳区大屯路东金泉时代3-2708北京牛客科技有限公司
								</li>
								<li class="nav-item text-white-50">
									联系方式：010-60728802(电话)&nbsp;&nbsp;&nbsp;&nbsp;admin@nowcoder.com
								</li>
								<li class="nav-item text-white-50">
									牛客科技©2018 All rights reserved
								</li>
								<li class="nav-item text-white-50">
									京ICP备14055008号-4 &nbsp;&nbsp;&nbsp;&nbsp;
									<img src="http://static.nowcoder.com/company/images/res/ghs.png" style="width:18px;" />
									京公网安备 11010502036488号
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</footer>
</div>

<script src="https://code.jquery.com/jquery-3.3.1.min.js" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" crossorigin="anonymous"></script>
<script>
	$(function(){
		setInterval(function(){
			var seconds = $("#seconds").text();
			$("#seconds").text(--seconds);
			if(seconds == 0) {
				location.href = $("#target").attr("href");
			}
		}, 1000);
	});
</script>
</body>
</html>
```



> 邮件内容发送模板

```html
<!doctype html>
<html lang="en" xmlns:th="http://www.thymeleaf.org" >
<head>
	<meta charset="utf-8">
	<link rel="icon" href="https://static.nowcoder.com/images/logo_87_87.png"/>
	<title>牛客网-激活账号</title>
</head>
<body>
<div>
	<p>
		<b th:text="${email}">xxx@xxx.com</b>, 您好!
	</p>
	<p>
		您正在注册牛客网社区, 这是一封激活邮件, 请点击
		<a th:href="${url}">此链接</a>,
		激活您的牛客社区账号!
	</p>
</div>
</body>
</html>
```

#### 启动服务，测试注册功能

> 表单校验正常

![](https://images.waer.ltd/img/z4.png)

> 注册功能正常

![](https://images.waer.ltd/img/z5.png)

****

##  kaptcha生成验证码

> 结合 kaptcha生成验证码功能。

[kaptcha官网](https://code.google.com/archive/p/kaptcha)

- 导入jar包
- 编写Kaptcha配置类
- 生成随机字符、生成图片

### 导包

```xml
<!-- https://mvnrepository.com/artifact/com.github.penggle/kaptcha -->
<dependency>
    <groupId>com.github.penggle</groupId>
    <artifactId>kaptcha</artifactId>
    <version>2.3.2</version>
</dependency>
```

#### 编写配置类

```java
   @Bean
    public Producer kaptchaProducer(){
        Properties properties = new Properties();
        /*设置宽高*/
        properties.setProperty("kaptcha.image.width","100");
        properties.setProperty("kaptcha.image.height","40");
        /*字体和颜色*/
        properties.setProperty("kaptcha.textproducer.font.size","32");
        properties.setProperty("kaptcha.textproducer.font.color","0,0,0");
        /*生成的字符串范围*/
        properties.setProperty("kaptcha.textproducer.char.string","0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        /*验证码产犊：4位*/
        properties.setProperty("kaptcha.textproducer.char.length","4");
        /*干扰规则*/
        properties.setProperty("kaptcha.noise.impl","com.google.code.kaptcha.impl.NoNoise");
        DefaultKaptcha kaptcha = new DefaultKaptcha();
        Config config  = new Config(properties);
        kaptcha.setConfig(config);
        return kaptcha;
```

#### 使用

- controller层

> 自动注入
>
> ```java
> @Autowired
> private Producer kaptchaProducer;
> ```
>
> 请求方法:详细注释
>
> ```java
> @RequestMapping(path = "/kaptcha",method = RequestMethod.GET)
> public void getKaptch(HttpServletResponse response , HttpSession session){
>   /*生成验证码*/
>   String text = kaptchaProducer.createText();
>   /*传入验证码生成验证码图片*/
>   BufferedImage image = kaptchaProducer.createImage(text);
>   /*将验证码存入session*/
>   session.setAttribute("kaptcha",text);
>   /*图片输出给浏览器*/
>   response.setContentType("image/png");
>   try {
>       /*以输出流写入图片*/
>       OutputStream os = response.getOutputStream();
>       ImageIO.write(image, "png", os);
>   } catch (IOException e) {
>       logger.error("响应验证码失败"+e.getMessage());
>   }
> }
> ```
>
> 测试:输入请求路径，获得一张验证码图片，说明方法是没什么问题的。
>
> ![](https://images.waer.ltd/img/验证码.png)



#### 引入登录页

- 引入验证码

> 测试完成后，可以在登录页面进行引入了，替换前端的静态图片。

```html
<div class="col-sm-4">
<img th:src="@{/img/captcha.png}" style="width:100px;height:40px;" class="mr-2"/>
							<a href="javascript:;" class="font-size-12 align-bottom">刷新验证码</a>
</div>    
```

> 只需要将其中的img路径换掉即可。

```html
<img th:src="@{/kaptcha}" />
```

- 刷新验证码操作

> 替换超链接指向:```refresh_kaptcha(）```为刷新验证码的```javascript```方法

```html
<a href="javascript:refresh_kaptcha();" class="font-size-12 align-bottom">刷新验证码</a>
```

> 为了降低代码的复用性，将请求的项目路径放入全局JS中作为一个常量处理。

```javascript
var CONTEXT_PATH = "/community";
```

> javascript实现点击刷新验证码
>
> ```javascript
> <script>
> 		/*刷新验证码实现*/
> 		function refresh_kaptcha(){
> 			/*注意这里的/kaptcha和图片中的路径其实是一样的，为了防止浏览器误以为是同一个请求路径请求静态资源而被忽略，在后面加一些参数(参数本身对功能没有影响)*/
> 			var path = CONTEXT_PATH + "/kaptcha?p=" + Math.random();
> 			$("#kaptcha").attr("src",path);
> 		}
> 	</script>
> ```
>
> > **注意这里的/kaptcha和图片中的路径其实是一样的，为了防止浏览器误以为是同一个请求路径请求静态资源而被忽略，在后面加一些参数(参数本身对功能没有影响)**



#### 最终效果

![](https://images.waer.ltd/img/KAPTCHA.gif)

****

## 开发登录/退出

### 生成实体类```LoginTicket```

```java
	//编号
	private int id;
	//用户id
    private int userId;
	//用户凭证
    private String ticket;
	//用户状态
	private int status;
	//日期
    private Date expired;
	//对应的get、set、tiString()方法
```

### 编写Dao

> 主要就是对用户信息的增删改查实现。

```java
 /**
     * 插入实现
     * @param loginTicket loginTicket实体对象
     * @return int
     */
    int insertLoginTicket(LoginTicket loginTicket);

    /**
     * 根据用户的ticket作为条件查询用户信息
     * @param ticket 用户凭证
     * @return Ticket对象
     */
    LoginTicket selectByTicket(String ticket);

    /**
     * 修改用户状态
     * @param ticket 凭证
     * @param status 状态
     * @return int
     */
    int updateStatus(String ticket,int status);
```



### 编写对应的SQL语句

> 为了方便书写，少建一个XML文件，可以以注解的方式将```SQL```语句写在```dao```层接口中。

```java
 /**
     * 插入实现
     * @param loginTicket loginTicket实体对象
     * @return int
     */
    @Insert({
            "insert into login_ticket(user_id,ticket,status,expired) ",
            "values(#{userId},#{ticket},#{status},#{expired})"
    })
    @Options(useGeneratedKeys = true,keyProperty = "id")
    int insertLoginTicket(LoginTicket loginTicket);

    /**
     * 根据用户的ticket作为条件查询用户信息
     * @param ticket 用户凭证
     * @return Ticket对象
     */
    @Select({
            "select id,user_id,ticket,status,expired ",
            "from login_ticket where ticket = #{ticket}"
    })
    LoginTicket selectByTicket(String ticket);

    /**
     * 修改用户状态
     * @param ticket 凭证
     * @param status 状态
     * @return int
     */
    @Update({
            "<script>",
            "update login_ticket set status = #{status} where ticket=#{ticket} ",
            "<if test=\"ticket!=null\">",
            "and 1=1",
            "</if>",
            "</script>"
    })
    int updateStatus(String ticket,int status);
```

> 使用的方法也很简单。
>
> 首先判断你的接口方法需要用到什么类型的```sql```语句【```select```、```update```、```insert```、```delete```】



> 再以```@sql类型({})```的**注解形式**写在方法体的上面即可。比如```@Insert({})```



> 注解形式的```sql```支持多个字符串分开写，完了系统回自动给你进行```sql```的拼接，同样，这种方式也是支持**动态SQL**的，比如上面的```update```语句就是一个示例。需要以```<script>```标签进行包括，以标识这是动态脚本，内部的写法和在```XML```文件中书写的```SQL```没什么区别。



> 此外，如果有自动递增的字段且需要将其带回填充给对应的实体的话，需要加上注解【```@Options(useGeneratedKeys = true,keyProperty = "字段名")```】



> ```SQL```以```XML```文件的形式和以注解的形式写**都是可以的**，二者各有**优缺**。注解的方式可能用起来比较方便，毕竟直接少写了一个```XML```文件，而后者则是更便于阅读，也支持```SQL```字段的一些提示，减低了```SQL```写错的概率，所以说，如果业务涉及的```SQL```**很复杂**的情况下，建议以```XML```文件的形式。不然，注解的方式也是不错的选择。

#### 测试SQL

> 通常情况下，为了保证```SQL```的**正确性和减低后期返工的概率**，我们一般需要在后续业务代码编写之前先对已写好的```SQL```进行简单的测试。

- 在**测试包**下新建一个```MapperTest```测试类
- 加入对应的**自动装配**

```java
 @Autowired
 private LoginTicketMapper loginTicketMap;
```

- 编写I```Insert()```的测试方法：

```java
  @Test
    public void testInserLoginTicket(){
        LoginTicket loginTicket = new LoginTicket();
        loginTicket.setUserId(101);
        loginTicket.setTicket("absa");
        loginTicket.setStatus(0);
        loginTicket.setExpired(new Date(System.currentTimeMillis()+1000 * 60 * 10));
        loginTicketMap.insertLoginTicket(loginTicket);
    }
```

> 测试结果

![](https://images.waer.ltd/img/login-2.png)
![](https://images.waer.ltd/img/login-1.png)

> 测试成功，说明```Insert()```语句没问题。

------

- 编写其他两个```SQL```的测试方法.......相似的重复工作，不再贴图。

### 编写Service

> 自动装配就不说了，基操！！

> 业务层登录实现的代码:

- 方法体

```java
 /**
     * 处理登录业务
     * @param username 用户名
     * @param password 密码
     * @param expiredSeconds 过期时间(秒值)
     * @return map
     */
public Map<String,Object> login(String username,String password,int expiredSeconds){
       Map<String,Object> map = new HashMap<>();
    }
```

> 由于我们需要向客户端返回一些信息，所以返回值这里选择Map

- 空值处理

```java
   /*空值处理*/
        if(StringUtils.isBlank(username)){
            map.put("usernameMsg","账号不能为空!");
            return map;
        }
        if(StringUtils.isBlank(password)){
            map.put("passwordMsg","密码不能为空!");
            return map;
        }
```

- 合法性校验

```java
   /*合法性验证*/
        User user = userMapper.selectByName(username);
        if(Objects.equals(user,null)){
            map.put("usernameMsg","该账号不存在!");
            return map;
        }
        /*账号是否激活*/
        if(user.getStatus()==0){
            map.put("usernameMsg","该账号未激活!");
            return map;
        }
```

- 密码校验

```java
  /*密码校验*/
        password = CommunityUtil.md5(password+user.getSalt());
        if(!Objects.equals(user.getPassword(),password)){
            map.put("passwordMsg","密码不正确!");
            return map;
        }
```

- 生成登录凭证

```java
  /*生成登录凭证*/
        LoginTicket loginTicket  = new LoginTicket();
        loginTicket.setUserId(user.getId());
        loginTicket.setTicket(CommunityUtil.generateUUID());
        loginTicket.setStatus(0);
        /*过期时间为当前时间往后推移expiredSeconds*1000秒*/
        loginTicket.setExpired(new Date(System.currentTimeMillis()+expiredSeconds * 1000L));
        loginTicketMapper.insertLoginTicket(loginTicket);
        map.put("ticket",loginTicket.getTicket());
```

- 返回结果

```java
return map;
```

- 一些值得注意的地方

> 在实际的业务中，对空值的判断场景很常见，方法也比较多。
>
> 个人比较习惯的方法是利用```Objects.equals(p1,p2)```方法。这是```java.util```包下的一个工具类，专门用于处理各种值之间是否相等的判断。使用它的一个好处是你不必担心会有空指针异常抛出，因为通常的```.equals()```方法，如果使用不当很容易导致空指针，原因这里不再展开。我也是在被坑过几次之后才转粉的，相信有写过一些项目的同胞大概也和我一样教训惨痛吧。

------

### 编写(Controller)

- 方法体

  ```java
   /**
       * 请求登录方法
       * @param username 用户名
       * @param password 密码
       * @param code 验证码
       * @param rememberme 是否记住我
       * @param model 视图
       * @param session 会话
       * @param response response响应
       * @return String
       */
      @RequestMapping(path = "/login",method = RequestMethod.POST)
      public String login(String username, String password, String code, boolean rememberme,Model model,
                          HttpSession session,HttpServletResponse response){
  
      }
  ```

  > 啊这...方法参数稍微有一点长，忍一下啊!!!

  > 注意```@RequestMapping()```中，相同的```path```**不同的请求方式**视为**不同方法**，是可以的，如果二者都一样，那就会冲突。

- 验证码校验

```java
 String kaptcha =(String) session.getAttribute("kaptcha");
        /*判断验证码*/
        if(StringUtils.isBlank(kaptcha) || StringUtils.isBlank(code) || !kaptcha.equalsIgnoreCase(code)){
            model.addAttribute("codeMsg","验证码不正确!");
            return "/site/login";
        }
```

- 账号、密码校验

```java
  /*校验账号和密码*/
        int expireSeconds = rememberme ? REMEMBER_EXPIRED_SECONDS : DEFAULT_EXPIRED_SECONDS;
        Map<String, Object> map = userService.login(username, password, expireSeconds);
        if(map.containsKey("ticket")){
            Cookie cookie = new Cookie("ticket",map.get("ticket").toString());
            cookie.setPath(contextPath);
            cookie.setMaxAge(expireSeconds);
            response.addCookie(cookie);
            return "/redirect:/index";
        }else{
            model.addAttribute("usernameMsg",map.get("usernameMsg"));
            model.addAttribute("passwordMsg",map.get("passwordMsg"));
            return "/site/login";
        }
```

> **注意：**账号凭证有效期单独作为常量在```CommunityContast```类中进行声明处理。

```java
   /*默认状态登录凭证的超时时间:12小时*/
    int DEFAULT_EXPIRED_SECONDS = 3600 * 12;
    /*记住我状态超时时间:100天*/
    int REMEMBER_EXPIRED_SECONDS = 3600 * 24 * 100;
```

> 同时我们需要将凭证存到cookie中，在登录之后作为全局的一个登录凭证判断。所以cookie的有效路径是整个项目，为了不写死，可以将```application.properties```中配置好的项目路径以```@Value(${})```注解的形式放到```Controller```进行使用,具体如下:

```java
@Value("${server.servlet.context-path}")
private String contextPath;//将上述注解中的值赋给该变量
```

------

### 处理静态前端页面

- 修改登录表单的一些参数

```html
//提交方式和请求路径
method="post" th:action="@{/login}"
//用户名name属性
name = "username"
//密码name属性
name = "password"
//验证码name属性
name = "code"
//是否勾选记住我的name属性
name = "rememberme"
```

- 表单数据回显

> 由于我们在Controller中的账户信息，比如用户名和密码是以平台字符串形式入参的，所以spring是不会将他们封装到model里面的。也就是不能通过model获得，所以这里通过request的方式进行获取。
>
> 那么在thleafy中，可以用如下方式进行获取request中的数据```${param.username}```
>
> 等效于```{request.username}```
>
> ````html
> //回显用户名和密码于是否记住我的勾选
> th:value="${param.password}"
> th:value="${param.username}"  
> th:checked="${param.rememberme}"
> ````

- 其他业务调整(完整代码)

```html
	<form class="mt-5" method="post" th:action="@{/login}">
					<div class="form-group row">
						<label for="username" class="col-sm-2 col-form-label text-right">账号:</label>
						<div class="col-sm-10">
							<input type="text" th:class="| form-control ${usernameMsg!=null ? 'is-invalid':''}|"
								   th:value="${param.username}"
								   id="username"
								   name="username"
								   placeholder="请输入您的账号!" required>
							<div class="invalid-feedback" th:text="${usernameMsg}">
								该账号不存在!
							</div>
						</div>
					</div>
					<div class="form-group row mt-4">
						<label for="password" class="col-sm-2 col-form-label text-right">密码:</label>
						<div class="col-sm-10">
							<input type="password" th:class="| form-control ${passwordMsg!=null ? 'is-invalid':''}|"
								   th:value="${param.password}"
								   id="password"
								   name="password"
								   placeholder="请输入您的密码!" required>
							<div class="invalid-feedback" th:text="${passwordMsg}">
								密码长度不能小于8位!
							</div>							
						</div>
					</div>
					<div class="form-group row mt-4">
						<label for="verifycode" class="col-sm-2 col-form-label text-right">验证码:</label>
						<div class="col-sm-6">
							<input type="text" th:class="| form-control ${codeMsg!=null ? 'is-invalid':''}|"
								   name="code"
								   id="verifycode" placeholder="请输入验证码!">
							<div class="invalid-feedback" th:text="${codeMsg}">
								验证码不正确!
							</div>
						</div>
						<div class="col-sm-4">
							<img th:src="@{/kaptcha}" style="width:100px;height:40px;" class="mr-2" id="kaptcha"/>
							<a href="javascript:refresh_kaptcha();" class="font-size-12 align-bottom">刷新验证码</a>
						</div>
					</div>				
					<div class="form-group row mt-4">
						<div class="col-sm-2"></div>
						<div class="col-sm-10">
							<input type="checkbox" id="remember-me" name="rememberme"
								   th:checked="${param.rememberme}">
							<label class="form-check-label" for="remember-me">记住我</label>
							<a href="forget.html" class="text-danger float-right">忘记密码?</a>
						</div>
					</div>				
					<div class="form-group row mt-4">
						<div class="col-sm-2"></div>
						<div class="col-sm-10 text-center">
							<button type="submit" class="btn btn-info text-white form-control">立即登录</button>
						</div>
					</div>
				</form>	
```

#### 登录测试

> OK!

------

### 退出功能

- Service

```java
    /**
     * 退出登录
     * @param ticket 凭证
     */
    public void loginout(String ticket){
        loginTicketMapper.updateStatus(ticket,1);
    }
```

- Controller

```java
  /**
     * 退出登录
     * @param ticket 凭证
     * @return string
     */
    @RequestMapping(path = "/logout",method = RequestMethod.GET)
    public String logout(@CookieValue("ticket") String ticket){
        userService.logout(ticket);
        return "redirect:/login";
    }
```

- index.html页面

```html
	<a class="dropdown-item text-center" th:href="@{/logout}">退出登录</a>
```

#### 退出登录测试

> OK!

### 最终效果演示

![](https://images.waer.ltd/img/login.gif)

****



## 用户信息显示

#### 实现的基本逻辑

![](https://images.waer.ltd/img/ljq.png)



> 服务器从浏览器端获得含有登录凭证的ticket的cookie信息，将该凭证传入数据库查询获得用户的信息user。再将user传给前端引擎，重渲染之后返回页面给浏览器，从而实现用户信息的显示。

### 封装Cookie工具类

> 由于会频繁地用到cookie，所以将它封装为一个简单的静态工具类，方便调用。

> 在项目的utils包下新建一个```CookieUtil```类。

```java
package com.nowcoder.community.utils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.Objects;

/**
 * @author: Tisox
 * @date: 2022/1/10 21:30
 * @description: cookie工具类的简单封装
 * @blog:www.waer.ltd
 */
public class CookieUtil {
    public static String getValue(HttpServletRequest request , String name){
        if (Objects.equals(request,null) || Objects.equals(name,null)){
            throw new IllegalArgumentException("参数为空!");
        }
        Cookie[] cookies = request.getCookies();
        if(cookies != null){
            for (Cookie cookie : cookies) {
                if(cookie.getName().equals(name)){
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
```



### 编写Controller

> 在Controller包下新建一个Interceptor包，用来存放拦截器相关的类。
>
> 在其中编写下面的拦截器方法

```java
/**
 * @author: Tisox
 * @date: 2022/1/10 21:27
 * @description:
 * @blog:www.waer.ltd
 */
@Component
public class LoginTicketInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
       //方法主体
        return true;
    }
}
```

> 在正式编写方法内容主体之前，需要有一个查询```ticket```的方法。

#### 在UserService中

```java
/**
     * 服务层根据用户凭证查询用户的信息
     * @param ticket ticket
     * @return loginTicket
     */
    public LoginTicket findLoginTicket(String ticket){
        return loginTicketMapper.selectByTicket(ticket);
    }
```

> 很简单的一个查询，没啥好说的,继续编写拦截器逻辑。

- **preHandler**方法

```java
 /**
     * 在Controller之前执行
     * @param request req
     * @param response resp
     * @param handler handler
     * @return bool
     * @throws Exception ex
     */
@Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String ticket = CookieUtil.getValue(request, "ticket");
        if(!Objects.equals(ticket,null)){
            /*查询凭证信息*/
            LoginTicket loginTicket = userService.findLoginTicket(ticket);
            /*检擦凭证是否还有效*/
            if(!Objects.equals(loginTicket,null) && Objects.equals(loginTicket.getStatus(),0) && loginTicket.getExpired().after(new Date())){
               /*根据凭证查询用户*/
                User user = userService.findUserById(loginTicket.getUserId());
                /*在本次请求持有用户信息*/
                /* 由于在获取用户信息的时候，浏览器对服务器是一对多的情况，需要考虑并发环境，不能简单的进行一个变量的容器存储，这里采用线程隔离的方式处理。
                *  线程隔离处理：封装为工具类：hostHolder.java
                * */
                hostHolder.setUser(user);

            }
        }
        return true;
    }

```

> 由于在获取用户信息的时候，浏览器对服务器是一对多的情况，需要考虑**并发环境**，不能简单的进行一个变量的容器存储，这里采用**线程隔离(ThreadLocal)**的方式处理。

**ThreadLocal的源码：set方法实现**

```java
public void set(T value) {
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
        if (map != null) {
            map.set(this, value);
        } else {
            createMap(t, value);
        }
    }
```

> 可以看到，它在实现```set```方法存值处理上，是根据当前的线程来存储的，每一个线程的```map```都不同，从而实现隔离。



**ThreadLocal的源码：get方法实现**

```java
  public T get() {
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
        if (map != null) {
            ThreadLocalMap.Entry e = map.getEntry(this);
            if (e != null) {
                @SuppressWarnings("unchecked")
                T result = (T)e.value;
                return result;
            }
        }
        return setInitialValue();
    }
```

> 再来看```get```方法也是同样的原理，根据当前线程获得一个map，再根据这个```map```去获取到对应的值。也就是说，这里的map是以线程为```key```进行值得存取。

**postHandler**方法

```java
   /**
     * 在Controller之后执行
     * @param request re
     * @param response resp
     * @param handler handler
     * @param modelAndView mv
     * @throws Exception ex
     */ 
@Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        User user = hostHolder.getUser();
        if(!Objects.equals(user,null) && Objects.equals(modelAndView,null)){
            modelAndView.addObject("loginUser",user);
        }
    }
```

```java
 /**
     * 在TemplateEngine之后执行
     * @param request resq
     * @param response ersp
     * @param handler handler
     * @param ex ex
     * @throws Exception ex
     */
@Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        hostHolder.clear();
    }
```

**编写HostHolder工具**

```java
package com.nowcoder.community.nkcommunity.utils;

import com.nowcoder.community.nkcommunity.entity.User;
import org.springframework.stereotype.Component;

@SuppressWarnings("all")
/**
 * @author: Tisox
 * @date: 2022/5/22 13:55
 * @description: 封装一个hostHolder本地线程根据类，用来存放用户的登录信息
 * @blog:www.waer.ltd
 */

@Component
public class HostHolder {
    private ThreadLocal<User> users= new ThreadLocal<>();

    /**
     * 获取用户信息
     * @return User
     */
    public User getUser() {
     return users.get();
    }

    /**
     * 存储用户信息
     * @param user 用户信息
     */
    public void setUser(User user){
        users.set(user);
    }

    /**
     * 销毁用户信息
     */
    public void clear(){
        users.remove();
    }
}
```

#### 拦截器的配置

```java
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Autowired
    private AlphaInterceptor alphaInterceptor;
    @Autowired
    private LoginTicketInterceptor loginTicketInterceptor;
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginTicketInterceptor)
                .excludePathPatterns("/**/*.css","/**/*.js","/**/*.png","/**/*.jpg",
                        "/**/*.jpeg");
    }

}
```

> 实现```WebMvcConfigurer```配置拦截器。



### 静态页面调整

> 调整部分的完整代码

```html
<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav mr-auto">
							<li class="nav-item ml-3 btn-group-vertical">
								<a class="nav-link" th:href="@{index}">首页</a>
							</li>
							<li class="nav-item ml-3 btn-group-vertical" th:if="${loginUser!=null}">
								<a class="nav-link position-relative" href="site/letter.html">消息<span class="badge badge-danger">12</span></a>
							</li>
							<li class="nav-item ml-3 btn-group-vertical" th:if="${loginUser==null}">
								<a class="nav-link" th:href="@{/register}">注册</a>
							</li>
							<li class="nav-item ml-3 btn-group-vertical" th:if="${loginUser==null}">
								<a class="nav-link" th:href="@{/login}">登录</a>
							</li>
							<li class="nav-item ml-3 btn-group-vertical dropdown" th:if="${loginUser!=null}">
								<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<img th:src="${loginUser.headerUrl}" class="rounded-circle" style="width:30px;"/>
								</a>
								<div class="dropdown-menu" aria-labelledby="navbarDropdown">
									<a class="dropdown-item text-center" href="site/profile.html">个人主页</a>
									<a class="dropdown-item text-center" href="site/setting.html">账号设置</a>
									<a class="dropdown-item text-center" th:href="@{/logout}">退出登录</a>
									<div class="dropdown-divider"></div>
									<span class="dropdown-item text-center text-secondary"
										  th:utext="${loginUser.username}">nowcoder</span>
								</div>
							</li>
						</ul>
						<!-- 搜索 -->
						<form class="form-inline my-2 my-lg-0" action="site/search.html">
							<input class="form-control mr-sm-2" type="search" aria-label="Search" />
							<button class="btn btn-outline-light my-2 my-sm-0" type="submit">搜索</button>
						</form>
					</div>
```



### 最终效果演示

![](https://images.waer.ltd/img/users.gif)

****

## 账号设置(头像上传)

### 编写Service

```java
  /**
     * 更新用户头像路径
     * @param userId 用户id
     * @param headerUrl 头像路径
     * @return int
     */
    public int updateHeader(int userId,String headerUrl){
        return userMapper.updateHeader(userId, headerUrl);
    }
```

****



### 配置上传路径

> application.properties中添加：

```xml
community.path.upload = d:/work/data/upload
```

****



### 编写Controller

- 调整相关的跳转链接，使得跳转到账号设置正常。

- 准备引入资源

```java
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Value("${community.path.upload}")
    private String uploadPath;

    @Value("${community.path.domain}")
    private String uploadDomain;

    @Value("${server.servlet.context-path}")
    private String contextPath;

    @Autowired
    private UserService userService;

    @Autowired
    private HostHolder hostHolder;
```

- **uploadHeader方法**

> 异常处理

```java
 if(Objects.equals(headerImage,null)){
            model.addAttribute("error","请选择图片!");
            return "/site/setting";
        }
 String filename = headerImage.getOriginalFilename();
        String suffix = filename.substring(filename.lastIndexOf(".")+1);
        if(StringUtils.isEmpty(suffix)){
            model.addAttribute("error","文件格式不正确！");
        }
```

> 文件重命名

```java
   /*生成随机的文件名*/
        filename = CommunityUtil.generateUUID()+suffix;
        /*确定文件存放的路径*/
        File dest = new File(uploadPath+"/"+filename);
        try {
            headerImage.transferTo(dest);
        } catch (IOException e) {
            logger.error("上传文件失败！"+e.getMessage());
            throw new RuntimeException("上传文件失败,服务器发生异常!",e);
        }
```

> 更新用户头像

```java
 /*更新当前用户的头像路径*/
        //http://locahost:8080/community/user/header/xxxx.png
        User user = hostHolder.getUser();
        String headerUrl = domain+contextPath+"/user/header/"+filename;
        userService.updateHeader(user.getId(),headerUrl);

        return "redirect:/index";
```

> 完整代码

```java
    /**
     * 上传头像
     * @param headerImage 头像
     * @param model model
     * @return Strng
     */
    @RequestMapping(path = "upload",method = RequestMethod.POST)
    public String uploadHeader(MultipartFile headerImage, Model model){
        if(Objects.equals(headerImage,null)){
            model.addAttribute("error","请选择图片!");
            return "/site/setting";
        }
        String filename = headerImage.getOriginalFilename();
        String suffix = filename.substring(filename.lastIndexOf(".")+1);
        if(StringUtils.isEmpty(suffix)){
            model.addAttribute("error","文件格式不正确！");
        }
        /*生成随机的文件名*/
        filename = CommunityUtil.generateUUID()+suffix;
        /*确定文件存放的路径*/
        File dest = new File(uploadPath+"/"+filename);
        try {
            headerImage.transferTo(dest);
        } catch (IOException e) {
            logger.error("上传文件失败！"+e.getMessage());
            throw new RuntimeException("上传文件失败,服务器发生异常!",e);
        }
        /*更新当前用户的头像路径*/
        //http://locahost:8080/community/user/header/xxxx.png
        User user = hostHolder.getUser();
        String headerUrl = domain+contextPath+"/user/header/"+filename;
        userService.updateHeader(user.getId(),headerUrl);

        return "redirect:/index";
    }
```

- **getHeader方法**

> 获取头像的方法

```java
 /*服务器存放路径*/
        fileName = uploadPath+"/"+fileName;
        /*文件后缀*/
        String suffix = fileName.substring(fileName.lastIndexOf(".") + 1);
```

> 响应图片

```java
   /*响应图片*/
        response.setContentType("image/"+suffix);
        try(   FileInputStream fis = new FileInputStream(fileName);
               OutputStream os = response.getOutputStream();) {
            byte[] buffer = new byte[1024];
            int b  = 0;
            while ((b=fis.read(buffer))!=-1){
                os.write(buffer,0,b);
            }
        } catch (IOException e) {
            logger.error("读取头像失败:"+e.getMessage());
        }
```

> 注意其中```try(){}```括号里放入声明的对象，这是```Java7```的语法，这样做的好处是，系统会自动关闭```()```里面需要关闭的资源。

****



### 静态页面调整

> - 处理返回的异常提示信息
> - 修改name属性
> - 修改表单提交参数

```html
<h6 class="text-left text-info border-bottom pb-2">上传头像</h6>
				<form class="mt-5" method="post" enctype="multipart/form-data" th:action="@{/user/upload}">
					<div class="form-group row mt-4">
						<label class="col-sm-2 col-form-label text-right">选择头像:</label>
						<div class="col-sm-10">
							<div class="custom-file">
								<input type="file" th::class="|custom-file-input ${error!=null?'is-invalid':''}|"
									   id="head-image" name="headerImage"
									   lang="es" required="">
								<label class="custom-file-label" for="head-image" data-browse="文件">选择一张图片</label>
								<div class="invalid-feedback" th:text="${error}">
									该账号不存在!
								</div>
							</div>		
						</div>
					</div>
```



**setting.html**

```html
<!doctype html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="icon" href="https://static.nowcoder.com/images/logo_87_87.png"/>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
	<link rel="stylesheet" th:href="@{/css/global.css}" />
	<link rel="stylesheet" th:href="@{/css/login.css}" />
	<title>牛客网-账号设置</title>
</head>
<body>
<div class="nk-container">
	<!-- 头部 -->
	<header class="bg-dark sticky-top" th:replace="index::header">
		<div class="container">
			<!-- 导航 -->
			<nav class="navbar navbar-expand-lg navbar-dark">
				<!-- logo -->
				<a class="navbar-brand" href="#"></a>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<!-- 功能 -->
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav mr-auto">
						<li class="nav-item ml-3 btn-group-vertical">
							<a class="nav-link" href="../index.html">首页</a>
						</li>
						<li class="nav-item ml-3 btn-group-vertical">
							<a class="nav-link position-relative" href="letter.html">消息<span class="badge badge-danger">12</span></a>
						</li>
						<li class="nav-item ml-3 btn-group-vertical">
							<a class="nav-link" href="register.html">注册</a>
						</li>
						<li class="nav-item ml-3 btn-group-vertical">
							<a class="nav-link" href="login.html">登录</a>
						</li>
						<li class="nav-item ml-3 btn-group-vertical dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<img src="http://images.nowcoder.com/head/1t.png" class="rounded-circle" style="width:30px;"/>
							</a>
							<div class="dropdown-menu" aria-labelledby="navbarDropdown">
								<a class="dropdown-item text-center" href="profile.html">个人主页</a>
								<a class="dropdown-item text-center" href="setting.html">账号设置</a>
								<a class="dropdown-item text-center" href="login.html">退出登录</a>
								<div class="dropdown-divider"></div>
								<span class="dropdown-item text-center text-secondary">nowcoder</span>
							</div>
						</li>
					</ul>
					<!-- 搜索 -->
					<form class="form-inline my-2 my-lg-0" action="search.html">
						<input class="form-control mr-sm-2" type="search" aria-label="Search" />
						<button class="btn btn-outline-light my-2 my-sm-0" type="submit">搜索</button>
					</form>
				</div>
			</nav>
		</div>
	</header>

	<!-- 内容 -->
	<div class="main">
		<div class="container p-5 mt-3 mb-3">
			<!-- 上传头像 -->
			<h6 class="text-left text-info border-bottom pb-2">上传头像</h6>
			<form class="mt-5" method="post" enctype="multipart/form-data" th:action="@{/user/upload}">
				<div class="form-group row mt-4">
					<label for="head-image" class="col-sm-2 col-form-label text-right">选择头像:</label>
					<div class="col-sm-10">
						<div class="custom-file">
							<input type="file" class="custom-file-input" id="head-image" name="headerImage" lang="es" required="">
							<label class="custom-file-label" for="head-image" data-browse="文件">选择一张图片</label>
						</div>
					</div>
				</div>
				<div class="form-group row mt-4">
					<div class="col-sm-2"></div>
					<div class="col-sm-10 text-center">
						<button type="submit" class="btn btn-info text-white form-control">立即上传</button>
					</div>
				</div>
			</form>
			<!-- 修改密码 -->
			<h6 class="text-left text-info border-bottom pb-2 mt-5">修改密码</h6>
			<form class="mt-5" th:action="@{/user/updatePassword}" method="post">
				<div class="form-group row mt-4">
					<label for="old-password" class="col-sm-2 col-form-label text-right">原密码:</label>
					<div class="col-sm-10">
						<input type="password" th:class="|form-control ${oldPasswordMsg!=null?'is-invalid':''}|"
							   name="oldPassword" th:value="${param.oldPassword}" id="old-password" placeholder="请输入原始密码!" required>
						<div class="invalid-feedback" th:text="${oldPasswordMsg}">
							密码长度不能小于8位!
						</div>
					</div>
				</div>
				<div class="form-group row mt-4">
					<label for="new-password" class="col-sm-2 col-form-label text-right">新密码:</label>
					<div class="col-sm-10">
						<input type="password" th:class="|form-control ${newPasswordMsg!=null?'is-invalid':''}|"
							   name="newPassword" th:value="${param.newPassword}" id="new-password" placeholder="请输入新的密码!" required>
						<div class="invalid-feedback" th:text="${newPasswordMsg}">
							密码长度不能小于8位!
						</div>
					</div>
				</div>
				<div class="form-group row mt-4">
					<label for="confirm-password" class="col-sm-2 col-form-label text-right">确认密码:</label>
					<div class="col-sm-10">
						<input type="password" class="form-control" th:value="${param.newPassword}" id="confirm-password" placeholder="再次输入新密码!" required>
						<div class="invalid-feedback">
							两次输入的密码不一致!
						</div>
					</div>
				</div>
				<div class="form-group row mt-4">
					<div class="col-sm-2"></div>
					<div class="col-sm-10 text-center">
						<button type="submit" class="btn btn-info text-white form-control">立即保存</button>
					</div>
				</div>
			</form>
		</div>
	</div>

	<!-- 尾部 -->
	<footer class="bg-dark">
		<div class="container">
			<div class="row">
				<!-- 二维码 -->
				<div class="col-4 qrcode">
					<img src="https://uploadfiles.nowcoder.com/app/app_download.png" class="img-thumbnail" style="width:136px;" />
				</div>
				<!-- 公司信息 -->
				<div class="col-8 detail-info">
					<div class="row">
						<div class="col">
							<ul class="nav">
								<li class="nav-item">
									<a class="nav-link text-light" href="#">关于我们</a>
								</li>
								<li class="nav-item">
									<a class="nav-link text-light" href="#">加入我们</a>
								</li>
								<li class="nav-item">
									<a class="nav-link text-light" href="#">意见反馈</a>
								</li>
								<li class="nav-item">
									<a class="nav-link text-light" href="#">企业服务</a>
								</li>
								<li class="nav-item">
									<a class="nav-link text-light" href="#">联系我们</a>
								</li>
								<li class="nav-item">
									<a class="nav-link text-light" href="#">免责声明</a>
								</li>
								<li class="nav-item">
									<a class="nav-link text-light" href="#">友情链接</a>
								</li>
							</ul>
						</div>
					</div>
					<div class="row">
						<div class="col">
							<ul class="nav btn-group-vertical company-info">
								<li class="nav-item text-white-50">
									公司地址：北京市朝阳区大屯路东金泉时代3-2708北京牛客科技有限公司
								</li>
								<li class="nav-item text-white-50">
									联系方式：010-60728802(电话)&nbsp;&nbsp;&nbsp;&nbsp;admin@nowcoder.com
								</li>
								<li class="nav-item text-white-50">
									牛客科技©2018 All rights reserved
								</li>
								<li class="nav-item text-white-50">
									京ICP备14055008号-4 &nbsp;&nbsp;&nbsp;&nbsp;
									<img src="http://static.nowcoder.com/company/images/res/ghs.png" style="width:18px;" />
									京公网安备 11010502036488号
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</footer>
</div>

<script src="https://code.jquery.com/jquery-3.3.1.min.js" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bs-custom-file-input/dist/bs-custom-file-input.js" crossorigin="anonymous"></script>
<script th:src="@{/js/global.js}"></script>
<script>
	$(function(){
		bsCustomFileInput.init();
	});
</script>
</body>
</html>
```



****

### 最终效果演示

![](https://images.waer.ltd/img/headerUpload.gif)

****

## 登录状态检查

> 相关的技术、知识点

- 拦截器
- 注解方式的拦截
- 自定义注解

> 实现业务

- 检查用户的登录状态
- 对用户的操作权限进行控制



### 常用的注解

> 用来实现自定义注解。

- 元注解

```@Target```:指定注解作用目标。

```@Retention```:注解的作用时间、有效期。

```@Document```:自定义注解在生成文档时要不要带上

```@Inherited```:是否继承父类注解

****

### 实现自定义注解

> 以自定义注解的方式用来对需要登录权限才能进行操作和查阅的内容进行拦截处理。

> 在项目目录下新建一个包```annotation```,包下心建一个自定义注解```LoginRequired```

```java
/**
 * @author: Tisox
 * @date: 2022/1/11 21:30
 * @description:
 * @blog:www.waer.ltd
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface LoginRequired {
	//方法逻辑....
}
```

> 注解:```@Target(ElementType.METHOD)```表示该自定义注解作用再方法上。
>
> 注解```@Retention(RetentionPolicy.RUNTIME)```表示该自定义注解在项目运行时生效。

- 实现拦截器

```java
  @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        /*判断拦截到的handler是否为HandlerMethod类型*/
        if(handler instanceof HandlerMethod){
            HandlerMethod handlerMethod =  (HandlerMethod) handler;
            /*获取其中的方法列表*/
            Method method = handlerMethod.getMethod();
            /*根据方法查询其带有的指定注解*/
            LoginRequired loginRequired = method.getAnnotation(LoginRequired.class);
            /*逻辑判断:如果该方法有拦截的注解并且用户是未登录状态，就需要进行拦截*/
            if(!Objects.equals(loginRequired,null) && Objects.equals(hostHolder.getUser(),null)){
                /*重定向到登录页面*/
                response.sendRedirect(request.getContextPath()+"/login");
                return false;
            }
        }
        return true;
    }
```

> 见注释。

- 配置拦截路径

> 由于只需要对请求的方法进行拦截处理，所以所有的静态资源的请求不需要拦截，应当放行。

```java
  registry.addInterceptor(loginRequiredInterceptor)
                .excludePathPatterns("/**/*.css", "/**/*.js", "/**/*.png", "/**/*.jpg", "/**/*.jpeg");
```

****

### 最终效果演示

![](https://images.waer.ltd/img/req.gif)

> 可以看到，如果用户没有登录，是没办法进入相应的页面进行操作的。

****

## 敏感词过滤

> 相关的技术、知识点

- 字典树(Trie)
- Java内部类

> 实现业务

- 实现敏感词过滤算法

### 字典树

> 高效的查找树，具体参考：[字典树](https://www.waer.ltd/blog/30)

****

### 敏感词过滤算法原理

- 实现目标

> 敏感词过滤，主要利用字典树来实现，需要实现的效果是，一串可能包含有敏感词的文本，通过该过滤算法之后，将敏感词替换为特定的字符输出，比如以*替换。

- 实现原理

> 假设有如下敏感词【abc】【bf】【be】,生成对应的敏感词Trie如下

![](https://images.waer.ltd/img/t树.png)

> 初始时```p2```,```p3```指向文本串中的第一个字符，开始检查，如果```root```(```p1```指针)指向不是敏感词，```p1```,```p2```后移一位，记录该非敏感词的字符。

> 如果```root```指向有敏感词嫌疑【也就是含有敏感词的一部分字符】并且未到树结尾，那么此时```p2```标记该嫌疑字符位置，```p3```开始后移，同时配合```root```后续的字符，若此时```root==p3```但没有到达敏感词尾部，则说明该区间```[p2,p3]```内的字符串不构成敏感词，此时```root```重新指向开头，```p2```后移一位，同时```p3```也指向```p2```的位置，准备下一轮的尝试。

****

### 代码实现

> 在utils中封装该算法【```SensitiveFilter.java```】，以备后续使用。

- 创建敏感词库

> resources下创建```sensitive-words.txt```,存放敏感词。
>
> ```txt
> 赌博
> 嫖娼
> 吸毒
> 开票
> 草泥马
> ```

- 完整代码

```java
public class SensitiveFilter {

    private static final Logger logger = LoggerFactory.getLogger(SensitiveFilter.class);

    // 替换符
    private static final String REPLACEMENT = "***";

    // 根节点
    private TrieNode rootNode = new TrieNode();
    
    @PostConstruct
    public void init() {
        try (
                InputStream is = this.getClass().getClassLoader().getResourceAsStream("sensitive-words.txt");
                BufferedReader reader = new BufferedReader(new InputStreamReader(is));
        ) {
            String keyword;
            while ((keyword = reader.readLine()) != null) {
                // 添加到前缀树
                this.addKeyword(keyword);
            }
        } catch (IOException e) {
            logger.error("加载敏感词文件失败: " + e.getMessage());
        }
    }

    // 将一个敏感词添加到前缀树中
    private void addKeyword(String keyword) {
        TrieNode tempNode = rootNode;
        for (int i = 0; i < keyword.length(); i++) {
            char c = keyword.charAt(i);
            TrieNode subNode = tempNode.getSubNode(c);

            if (subNode == null) {
                // 初始化子节点
                subNode = new TrieNode();
                tempNode.addSubNode(c, subNode);
            }

            // 指向子节点,进入下一轮循环
            tempNode = subNode;

            // 设置结束标识
            if (i == keyword.length() - 1) {
                tempNode.setKeywordEnd(true);
            }
        }
    }

    /**
     * 过滤敏感词
     *
     * @param text 待过滤的文本
     * @return 过滤后的文本
     */
    public String filter(String text) {
        if (StringUtils.isBlank(text)) {
            return null;
        }

        // 指针1
        TrieNode tempNode = rootNode;
        // 指针2
        int begin = 0;
        // 指针3
        int position = 0;
        // 结果
        StringBuilder sb = new StringBuilder();

        while (begin < text.length()) {
            char c = text.charAt(position);

            // 跳过符号
            if (isSymbol(c)) {
                // 若指针1处于根节点,将此符号计入结果,让指针2向下走一步
                if (tempNode == rootNode) {
                    sb.append(c);
                    begin++;
                }
                // 无论符号在开头或中间,指针3都向下走一步
                position++;
                continue;
            }

            // 检查下级节点
            tempNode = tempNode.getSubNode(c);
            if (tempNode == null) {
                // 以begin开头的字符串不是敏感词
                sb.append(text.charAt(begin));
                // 进入下一个位置
                position = ++begin;
                // 重新指向根节点
                tempNode = rootNode;
            } else if (tempNode.isKeywordEnd()) {
                // 发现敏感词,将begin~position字符串替换掉
                sb.append(REPLACEMENT);
                // 进入下一个位置
                begin = ++position;
                // 重新指向根节点
                tempNode = rootNode;
            } else {

                // 检查下一个字符
                if(position<text.length()-1){
                    position++;
                }
            }
        }
        return sb.toString();
    }

    // 判断是否为符号
    private boolean isSymbol(Character c) {
        // 0x2E80~0x9FFF 是东亚文字范围
        return !CharUtils.isAsciiAlphanumeric(c) && (c < 0x2E80 || c > 0x9FFF);
    }

    // 前缀树
    private class TrieNode {

        // 关键词结束标识
        private boolean isKeywordEnd = false;

        // 子节点(key是下级字符,value是下级节点)
        private Map<Character, TrieNode> subNodes = new HashMap<>();

        public boolean isKeywordEnd() {
            return isKeywordEnd;
        }

        public void setKeywordEnd(boolean keywordEnd) {
            isKeywordEnd = keywordEnd;
        }

        // 添加子节点
        public void addSubNode(Character c, TrieNode node) {
            subNodes.put(c, node);
        }

        // 获取子节点
        public TrieNode getSubNode(Character c) {
            return subNodes.get(c);
        }

    }
```

****

### 测试

> 测试算法是否可用。

```java
package com.nowcoder.community;

import com.nowcoder.community.utils.SensitiveFilter;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * @author: Tisox
 * @date: 2022/1/12 15:05
 * @description:
 * @blog:www.waer.ltd
 */
@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
@ContextConfiguration(classes = CommunityApplication.class)
public class SensitiveTests {
    @Autowired
    private SensitiveFilter sensitiveFilter;

    @Test
    public void testSensitiveFilter(){
        String text = "这里可以赌博，我草泥马，来吸毒啊，开票啦！@吸毒";
         text = sensitiveFilter.filter(text);
        System.out.println(text);
    }
}
```

- 测试结果

![](https://images.waer.ltd/img/sen.png)

****

## 社区帖发布

> 技术、知识点

- `AJAX(Asynchronous JavaScript and XML)`
- `JQuery`

> 实现业务

- 实现发帖功能。

### 准备阶段

- 导包

> Fastjson

```xml
<!-- https://mvnrepository.com/artifact/com.alibaba/fastjson -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.79</version>
</dependency>
```

- 封装一个JSON信息工具

```java
    public static String getJSONString(int code, String msg, Map<String,Object> map){
        JSONObject json = new JSONObject();
        json.put("code",code);
        json.put("msg",msg);
        if(map!=null){
            for(String key: map.keySet()){
                json.put(key,map.get(key));
            }
        }
        return json.toJSONString();
    }

    public static String getJSONString(int code,String msg){
        return getJSONString(code, msg, null);
    }

    public static String getJSONString (int code){
        return getJSONString(code,null,null);
    }
```

****



### 编写Dao代码

```java
int insertDiscussPost(DiscussPost discussPost);
```

**对应的SQL**

```sql
  <sql id="insertFields">
        user_id,title,content,type,status,create_time,comment_count,score
    </sql>
      <!--插入帖子-->
    <insert id="insertDiscussPost" parameterType="com.nowcoder.community.entity.DiscussPost">
        insert into discuss_post(<include refid="insertFields"></include>)
        values(#{userId},#{title},#{content},#{type},#{status},#{createTime},#{commentCount},#{score})
    </insert>
```

****



### 编写Service代码

- 方法体

```java
 /**
     * 添加帖子
     * @param post 帖子
     * @return int
     */
    public int addDiscussPost(DiscussPost post){
        //方法内容
    }
```

- 方法内容

> 参数判断

```java
 /*参数判断*/
if(post==null){
      throw new IllegalArgumentException("参数不能为空！");
  }
```

> HTML转义:由于帖子中的标题和内容部分可能会被一些坏吕人或者是坏蓝人写入一些HTML类似的标签或者JS脚本，因此需要用到spring提供的```HtmlUtils.htmlEscape(post.getTitle())```工具进行转义处理。

```java
    	/*转义HTML标记*/
        post.setTitle(HtmlUtils.htmlEscape(post.getTitle()));
        post.setContent(HtmlUtils.htmlEscape(post.getContent()));
```

> 敏感词过滤：同样是标题和帖子内容，需要进行敏感词的过滤，敏感词过滤算法，参考我的上一篇笔记：[项目【牛客社区】开发笔记9:实现敏感词过滤算法](https://www.waer.ltd/blog/37)。

```java
  		/*敏感词过滤*/
        post.setTitle(sensitiveFilter.filter(post.getTitle()));
        post.setContent(sensitiveFilter.filter(post.getContent()));
```

> return post

```java
   return discussPostMapper.insertDiscussPost(post);
```

****



### 编写Controller代码

```java
@RequestMapping(path = "/add",method = RequestMethod.POST)
@ResponseBody
    public String addDiscussPost(String title,String content){
        User user = hostHolder.getUser();
        if(Objects.equals(user,null){
            return CommunityUtil.getJSONString(403,"你还没有登录哈！");
        }
        DiscussPost post = new DiscussPost();
        post.setUserId(user.getId());
        post.setTitle(title);
        post.setContent(content);
        post.setCreateTime(new Date());
        discussPostService.addDiscussPost(post);
        //之后将会集中处理报错信息
        return CommunityUtil.getJSONString(0,"发布成功!");
    }
```

> 别忘了注入相关的依赖。

****



### 编写静态页面(包括JS)

- index.html

> 主要处理未登录状态下【发布帖子】按钮的隐藏

```html
		<button type="button" class="btn btn-primary btn-sm position-absolute rt-0" data-toggle="modal"
							data-target="#publishModal" th:if="${loginUser!=null}">我要发布</button>
```

- index.js

```javascript
$(function(){
	$("#publishBtn").click(publish);
});

function publish() {
	$("#publishModal").modal("hide");
	//获取标题和内容
	var title = $("#recipient-name").val();
	var content = $("#message-text").val();
	//发布异步请求
	$.post(
		CONTEXT_PATH+"/discuss/add",
		{
			title:title,
			content:content,		},
			function(data){
				data = $.parseJSON(data);
				//在提示框中显示返回的消息
				$("#hintBody").text(data.msg);
				//显示提示框
				$("#hintModal").modal("show");
				//2s后自动关闭提示框
				setTimeout(function(){
					$("#hintModal").modal("hide");
					//刷新页面
					if(data.code===0){
						window.location.reload();
					}
				}, 2000);
			}
	)
}
```

> 处理前端表单的动态显示，发送Ajax异步请求，实现帖子发布于提示信息显示。

****

### 最终效果演示

![](https://images.waer.ltd/img/dis.gif)



![](https://images.waer.ltd/img/moyu.gif)

****

## 帖子详情页

> 开发帖子详情页

- 增加帖子标题跳转
- 处理静态资源访问路径
- 显示标题、作者、发布时间、帖子正文等内容。

### 编写Dao代码

- mapper

> 主要就是一个查询方法

```java
DiscussPost selectDiscussPostById(int id);
```

- mapperXML

```xml
  <!--处理帖子详情-->
    <select id="selectDiscussPostById" resultType="com.nowcoder.community.entity.DiscussPost">
        select  <include refid="selectFields"/>
        from discuss_post
        where id=#{id}
    </select>
```

****

### 编写Service代码

```java
 /**
     * 处理帖子详情
     * @param id 帖子id
     * @return 帖子对象实体
     */
    public DiscussPost findDiscussPostById(int id){
        return discussPostMapper.selectDiscussPostById(id);
    }
```

****

### 编写Controller代码

```java
  /**
     * 查询帖子详情
     * @param discussPostId 帖子id
     * @param model model
     * @return String
     */
    @RequestMapping(path = "/detail/{discussPostId}",method = RequestMethod.GET)
    public String getDiscussPost(@PathVariable("discussPostId") int discussPostId, Model model){
        /*查询帖子*/
        DiscussPost post = discussPostService.findDiscussPostById(discussPostId);
        model.addAttribute("post",post);
        /*查询帖子作者*/
        User user = userService.findUserById(post.getUserId());
        model.addAttribute("user",user);
        
        return "/site/discuss-detail";
    }
```

> 帖子详情还有评论等信息，会在后续的开发中逐步完善。

****

### 静态页面处理

- 处理首页index.html

> 调整链接地址

```html
<a th:href="@{|/discuss/detail/${map.post.id}|}"
```

- 处理详情页discuss-detail.html

```html
	<!-- 帖子详情 -->
			<div class="container">
				<!-- 标题 -->
				<h6 class="mb-4">
					<img src="http://static.nowcoder.com/images/img/icons/ico-discuss.png"/>
					<span th:utext="${post.title}">备战春招，面试刷题跟他复习，一个月全搞定！</span>
					<div class="float-right">
						<button type="button" class="btn btn-danger btn-sm">置顶</button>
						<button type="button" class="btn btn-danger btn-sm">加精</button>
						<button type="button" class="btn btn-danger btn-sm">删除</button>
					</div>
				</h6>
				<!-- 作者 -->
				<div class="media pb-3 border-bottom">
					<a href="profile.html">
						<img th:src="${user.headerUrl}"
							 class="align-self-start mr-4 rounded-circle user-header" alt="用户头像" >
					</a>
					<div class="media-body">
						<div class="mt-0 text-warning" th:utext="${user.username}">寒江雪</div>
						<div class="text-muted mt-3">
							发布于 <b th:text="${#dates.format(post.createTime,'yyyy-MM-dd HH:mm:ss')}">2019-04-15
							15:32:18</b>
							<ul class="d-inline float-right">
								<li class="d-inline ml-2"><a href="#" class="text-primary">赞 11</a></li>
								<li class="d-inline ml-2">|</li>
								<li class="d-inline ml-2"><a href="#replyform" class="text-primary">回帖 7</a></li>
							</ul>
						</div>
					</div>
				</div>	
				<!-- 正文 -->
				<div class="mt-4 mb-3 content" th:utext="${post.content}">
					金三银四的金三已经到了，你还沉浸在过年的喜悦中吗？
					如果是，那我要让你清醒一下了：目前大部分公司已经开启了内推，正式网申也将在3月份陆续开始，金三银四，春招的求职黄金时期已经来啦！！！
					再不准备，作为19应届生的你可能就找不到工作了。。。作为20届实习生的你可能就找不到实习了。。。
					现阶段时间紧，任务重，能做到短时间内快速提升的也就只有算法了，
					那么算法要怎么复习？重点在哪里？常见笔试面试算法题型和解题思路以及最优代码是怎样的？
					跟左程云老师学算法，不仅能解决以上所有问题，还能在短时间内得到最大程度的提升！！！
				</div>
			</div>
```



****

### 最终效果演示

![](https://images.waer.ltd/img/deta.gif)

****

## 评论/回复信息显示

> 显示评论

- 数据层
  - 根据实体查询一页评论数据
  - 根据实体查询评论的数量
- 业务层
  - 处理查询评论的业务
  - 处理查询评论数量的业务
- 表现层次
  - 显示帖子详情数据时，同时显示该帖子所有评论数据。

### 编写实体类

```java
  	private int id;
    private int userId;
    private int entityType;
    private int entityId;
    private int targetId;
    private String content;
    private int status;
    private Date createTime;
	//get/set等方法
```

****

### 编写dao代码

- Mapper接口

```java
   List<Comment> selectCommentsByEntity(int entityType,int entityId,int offset,int limit);

    int selectCountByEntity(int enetype,int entityId);

```

- Mapper.XML

```xml
 <sql id="selectFields">
      id,user_id,entity_type,entity_id,target_id,content,status,create_time
  </sql>
    <select id="selectCommentsByEntity" resultType="com.nowcoder.community.entity.Comment">
        select<include refid="selectFields"/>
        from comment
        where status = 0
        and entity_type = #{entityType}
        and entity_id = #{entityId}
        order by create_time asc
        limit #{offset},#{limit}
    </select>
    <select id="selectCountByEntity" resultType="java.lang.Integer">
        select count(id)
        from comment
        where status = 0
          and entity_type = #{entityType}
          and entity_id = #{entityId}
    </select>
```

****

### 编写Service

```java
  @Autowired
    private CommentMapper commentMapper;

    /**
     * 查询评论数据
     * @param entityType 信息类型
     * @param entityId 类型id
     * @param offset 分页
     * @param limit li
     * @return list
     */
    public List<Comment> findCommentsByEntity(int entityType,int entityId,int offset,int limit){
        return commentMapper.selectCommentsByEntity(entityType, entityId, offset, limit);
    }

    /**
     * 统计评论数
     * @param entityType ty
     * @param entityId tyid
     * @return int
     */
    public int findCommentCount(int entityType,int entityId){
        return commentMapper.selectCountByEntity(entityType, entityId);
    }
```

****

### 编写Controller

- 添加实体类型常量

```java
/*实体类型：帖子*/
int ENTITY_TYPE_POST=1;
/*实体类型：评论*/
int ENTITY_TYPE_COMMENT=2;
```

- 修改之前的```DiscussPostController```的方法

> 由于需要显示帖子的评论信息，再次修改之前的```getDiscussPost```方法如下

> 添加```Page```对象，用来实现分页

> 其他修改的地方

```java
   //查询评论的分页信息
        page.setLimit(5);
        page.setPath("/discuss/detail/"+discussPostId);
        page.setRows(post.getCommentCount());
        //评论：给帖子的评论
        //回复：给评论的评论
        //评论列表
        List<Comment> commentList = commentService.findCommentsByEntity(ENTITY_TYPE_POST, post.getId(), page.getOffset(), page.getLimit());

        //评论VO列表
        List<Map<String,Object>> commentVoList = new ArrayList<>();
        if(commentList!=null){
            for(Comment comment : commentList){
                //评论VO
                Map<String,Object>  commentVo = new HashMap<>();
                //评论
                commentVo.put("comment",comment);
                //作者
                commentVo.put("user",userService.findUserById(comment.getUserId()));

                //查询回复
                List<Comment> replyList = commentService.findCommentsByEntity(ENTITY_TYPE_COMMENT, comment.getId(), 0, Integer.MAX_VALUE);
                //回复的VO列表
                List<Map<String,Object>>  replyVoList = new ArrayList<>();
                if(replyList != null){
                    for(Comment reply : replyList){
                        Map<String, Object> replyVo = new HashMap<>();
                        //回复
                        replyVo.put("reply",reply);
                        replyVo.put("user",userService.findUserById(reply.getUserId()));
                        //处理回复的目标
                        User target = reply.getTargetId()==0 ? null : userService.findUserById(reply.getTargetId());
                        replyVo.put("target",target);

                        replyVoList.add(replyVo);
                    }
                }
                commentVo.put("replys",replyVoList);
                //回复数量
                int replyCount = commentService.findCommentCount(ENTITY_TYPE_COMMENT, comment.getId());
                commentVo.put("replyCount",replyCount);
                commentVoList.add(commentVo);
            }
        }
      model.addAttribute("comments",commentVoList);
```

> 由于回复是一个递归的形式，需要搞清楚他们的层次关系，相对比较复杂。

****

### 处理静态页面

- index.html

```html
<li class="d-inline ml-2">回帖 <span th:text="${map.post.commentCount}">7</span></li>
```

- discuss-detail.html

> 处理帖子的回复

```html
<li class="media pb-3 pt-3 mb-3 border-bottom" th:each="cvo:${comments}">
						<a href="profile.html">
							<img th:src="${cvo.user.headerUrl}"
								 class="align-self-start mr-4 rounded-circle user-header" alt="用户头像" >
						</a>
						<div class="media-body">
							<div class="mt-0">
								<span class="font-size-12 text-success" th:utext="${cvo.user.username}">掉脑袋切切</span>
								<span class="badge badge-secondary float-right floor"><i
										th:text="${page.offset+cvoStat.count}">1
								</i>#</span>
							</div>
							<div class="mt-2" th:utext="${cvo.comment.content}">
								这开课时间是不是有点晚啊。。。
							</div>
							<div class="mt-4 text-muted font-size-12">
								<span>发布于
									<b
											th:text="${#dates.format(cvo.comment.createTime,'yyyy-MM-dd HH:mm:ss')}">2019-04-15
										15:32:18</b></span>
								<ul class="d-inline float-right">
									<li class="d-inline ml-2"><a href="#" class="text-primary">赞(1)</a></li>
									<li class="d-inline ml-2">|</li>
									<li
											class="d-inline ml-2"><a href="#" class="text-primary" >回复
										<i th:text="${cvo.replyCount}">
										(2)</i>
									</a></li>
								</ul>
							</div>
```

> 处理回复的回复

```html
<ul class="list-unstyled mt-4 bg-gray p-3 font-size-12 text-muted">
								<!-- 第1条回复 -->
								<li class="pb-3 pt-3 mb-3 border-bottom" th:each="rvo:${cvo.replys}">
									<div>
										<span th:if="${rvo.target==null}">
											<b class="text-info" th:text="${rvo.user.username}">寒江雪</b>:&nbsp;
											&nbsp;</span>
										<span th:if="${rvo.target!=null}">
											<i class="text-info" th:text="${rvo.user.username}">sssi</i>回复
											<b class="text-info" th:text="${rvo.target.username}">寒江雪</b>:&nbsp;
											&nbsp;</span>
										<span th:utext="${rvo.reply.content}">这个是直播时间哈，觉得晚的话可以直接看之前的完整录播的~</span>
									</div>
									<div class="mt-3">
										<span
												th:text="${#dates.format(rvo.reply.createTime,'yyyy-MM-dd HH:mm:ss')}">2019-04-15 15:32:18</span>
										<ul class="d-inline float-right">
											<li class="d-inline ml-2"><a href="#" class="text-primary">赞(1)</a></li>
											<li class="d-inline ml-2">|</li>
											<li class="d-inline ml-2"><a th:href="|#huifu01-${rvoStat.count}|"
																		 data-toggle="collapse"
																		 class="text-primary">回复</a></li>
										</ul>
										<div  th:id="|huifu-${rvoStat.count}|" class="mt-4 collapse">
											<div>
												<input type="text" class="input-size" placeholder="回复寒江雪"/>
											</div>
											<div class="text-right mt-2">
												<button type="button" class="btn btn-primary btn-sm" onclick="#">&nbsp;&nbsp;回&nbsp;&nbsp;复&nbsp;&nbsp;</button>
											</div>										
										</div>
									</div>								
								</li>
```

> 处理回复列表分页
>
> 直接复用首页的分页即可。

```html
<ul class="pagination justify-content-center" th:replace="index::pagination">
```

****

### 最终效果演示

> 考虑到服务器对gif图片的加载时间，这里就不再放动图了。

![](https://images.waer.ltd/img/reply.png)

****

## 评论功能

> 数据层

- 增加评论数据
- 修改帖子的评论数量

> 业务层次

- 处理添加评论的业务
- 先增加评论，再更新帖子的评论数量

> 表现层

- 处理添加评论数据的请求
- 设置添加评论的表单

> 知识点：事务管理

### 编写Dao

> 数据访问组要提供评论增加和查询帖子的评论数量的实现。

- CommentMapper

  ```java
  //dao
  int insertComment(Comment comment);
  //SQL
   <sql id="insertFields">
          user_id,entity_type,entity_id,target_id,content,status,create_time
      </sql>
      <!--添加评论-->
      <insert id="insertComment" parameterType="com.nowcoder.community.entity.Comment">
          insert into comment (<include refid="insertFields"/>)
          values(#{userId},#{entityType},#{entityId},#{targetId},#{content},#{status},#{createTime})
      </insert>
  ```

- DiscussPostMapper

```java
//dao
int updateCommentCount(int id,int commentCount);
//SQL
<update id = updateCommentCount>
    update discuss_post set comment_count = #{commentCount}
where id  =#{id}
</update>
```

****

### 编写Service

- DiscussPostService

```java
 /**
     * 查询帖子的评论数量
     * @param id 帖子id
     * @param commentCount 评论数量
     * @return int
     */
    public int updateCommentCount(int id,int commentCount){
        return discussPostMapper.updateCommentCount(id, commentCount);
    }
```

- CommentService

> 使用声明式事务的方式进行事务管理，整个操作要么成功，要么全部失败。

```java
   /**
     * 添加评论
     * @param comment 评论
     * @return int
     */
    @Transactional(isolation = Isolation.READ_COMMITTED,propagation = Propagation.REQUIRED)
    public int addComment(Comment comment){
        if(comment == null) {
            throw new IllegalArgumentException("参数不能为空!");
        }
        /*需要进行内容过滤并添加评论*/
        comment.setContent(HtmlUtils.htmlEscape(comment.getContent()));
        comment.setContent(sensitiveFilter.filter(comment.getContent()));
        int rows = commentMapper.insertComment(comment);
        /*更新帖子的评论数量*/
        if(comment.getEntityType()==ENTITY_TYPE_POST){
            int count = commentMapper.selectCountByEntity(comment.getEntityType(), comment.getEntityId());
            discussPostService.updateCommentCount(comment.getEntityId(),count);
        }
        return  rows;
    }
```

****

### 编写Controller

- CommentController

> 由于评论之后需要回到当前评论的帖子详情页，所以需要传入一个帖子的id**[discussPostId]**。

```java
    /**
     * 添加帖子评论
     * @param discussPostId
     * @param comment
     * @return
     */
    @RequestMapping(path = "/add/{discussPostId}",method = RequestMethod.POST)
    public String addComment(@PathVariable("discussPostId") int discussPostId, Comment comment){
        comment.setUserId(hostHolder.getUser().getId());
        comment.setStatus(0);
        comment.setCreateTime(new Date());
        commentService.addComment(comment);
        
        return "redirect:/discuss/detail/"+discussPostId;
    }
```

****

### 静态页面处理

- 处理回帖的评论框

```html
	<!-- 回帖输入 -->
			<div class="container mt-3">
				<form class="replyform" method="post" th:action="@{|/comment/add/${post.id}|}">
					<p class="mt-3">
						<a name="replyform"></a>
						<textarea placeholder="在这里畅所欲言你的看法吧!" name="content"></textarea>
						<input type="hidden" name="entityType" value="1">
						<input type="hidden" name="entityId" th:value="${post.id}">
					</p>
					<p class="text-right">
						<button type="submit" class="btn btn-primary btn-sm">&nbsp;&nbsp;回&nbsp;&nbsp;帖&nbsp;&nbsp;</button>
					</p>
				</form>
			</div>
		</div>
```

- 给评论评论(无回复对象)

```html
	<!-- 回复输入框 -->
								<li class="pb-3 pt-3">
									<form method="post"  th:action="@{|/comment/add/${post.id}|}">
										<div>
											<input type="text" class="input-size"  name="content" 
												   placeholder="请输入你的观点"/>
											<input type="hidden" name="entityType" value="2">
											<!--注意这里传入的是评论的id不是帖子的id了-->
											<input type="hidden" name="entityId" th:value="${cvo.comment.id}">
										</div>
										<div class="text-right mt-2">
											<button type="submit" class="btn btn-primary btn-sm" 
													onclick="#">&nbsp;&nbsp;回&nbsp;&nbsp;复&nbsp;&nbsp;</button>
										</div>
									</form>
									
								</li>
```



- 给评论评论(有回复对象)

```html
	<form  method="post"  th:action="@{|/comment/add/${post.id}|}">
												<div>
													<input type="text" name="content" class="input-size" 
														   th:placeholder="|回复${rvo.user.username}|"/>
													<input type="hidden" name="entityType" value="2">
													<!--注意这里传入的是评论的id不是帖子的id了-->
													<input type="hidden" name="entityId" th:value="${cvo.comment.id}">
													<input type="hidden" name="targetId" th:value="${rvo.user.id}">
												</div>
												<div class="text-right mt-2">
													<button type="submit" class="btn btn-primary btn-sm" 
															onclick="#">&nbsp;&nbsp;回&nbsp;&nbsp;复&nbsp;&nbsp;</button>
												</div>
											</form>
```

> 注意三者的区别处理。



****

### 最终效果展示

> 由于涉及的操作比较繁琐，特以图片的形式进行展示。

![](https://images.waer.ltd/img/comment.png)

![](https://images.waer.ltd/img/moyu.gif)

****

## 私信列表、详情

> 私信列表

- 查询当前用户的会话列表，每个会话只显示一条最新的私信。
- 支持分页显示

> 私信详情

- 查询某个会话包含的私信
- 支持分页显示

****

### 编写实体类

> 信息实体```Message.java```

```java
    /**消息编号*/
    private int id;
    /*消息发送者*/
    private int fromId;
    /*对话编号*/
    private String conversationId;
    /*对话内容*/
    private String content;
    /*消息状态*/
    private int status;
    /*消息时间*/
    private Date createTime;
```

****

### 编写Dao

- **MessageMapper**

> 主要涉及五个方法的实现。

```java
package com.nowcoder.community.dao;

import com.nowcoder.community.entity.Message;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author: Tisox
 * @date: 2022/1/24 15:33
 * @description: 信息数据处理
 * @blog:www.waer.ltd
 */
@Mapper
public interface MessageMapper {
    /**
     * 查询当前用户的会话列表，针对每一个会话只返回一条最新的私信。
     * @param userId 用户id
     * @param offset 分页信息
     * @param limit 分页信息
     * @return List<Message>
     */
    List<Message> selectConversations(int userId, int offset, int limit);

    /**
     * 查询当前用户的会话数量
     * @param userId 用户id
     * @return int
     */
    int selectConversationCount(int userId);

    /**
     * 查询某个会话所包含的私信列表
     * @param conversationId 会话id
     * @param offset 分页支持
     * @param limit 分页支持
     * @return List<Message>
     */
    List<Message> selectLetters(String conversationId,int offset,int limit);

    /**
     * 查询某个会话所包含的私信数量
     * @param conversationId 会话id
     * @return int
     */
    int selectLetterCount(String conversationId);

    /**
     * 查询未读私信的数量
     * @param userId 用户id
     * @param conversationId 会话ID
     * @return int
     */
    int selectLetterUnreadCount(int userId,String conversationId);   
}
```

- **MessageMapper.xml**

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.nowcoder.community.dao.MessageMapper">

<sql id="selectFields">
    id,from_id,to_id,conversation_id,content,status,create_time
</sql>
    <!--查询当前用户的会话列表，针对每一个会话只返回一条最新的私信。-->
    <select id="selectConversations" resultType="com.nowcoder.community.entity.Message">
        select <include refid="selectFields"/>
        from message
        where id in(
        select max(id) from message
        where status!=2
        and from_id!=1
        and (from_id=#{userId} or to_id=#{userId})
        group by conversation_id
        )
        order by id desc
        limit  #{offset},#{limit}
    </select>

    <select id="selectConversationCount" resultType="java.lang.Integer">
        select count(m.maxid) from (
                 select max(id) as maxid
                 from message
                 where status != 2
                   and from_id != 1
                   and (from_id = #{userId} or to_id = #{userId})
                 group by conversation_id
             )as m
    </select>

    <select id="selectLetters" resultType="com.nowcoder.community.entity.Message">
        select <include refid="selectFields"/>
        from message
        where status!=2
        and from_id!=1
        and conversation_id=#{conversationId}
        order by id desc
        limit #{offset},#{limit}
    </select>

    <select id="selectLetterCount" resultType="java.lang.Integer">
        select count(id)
        from message
        where status!=2
        and from_id!=1
        and conversation_id = #{conversationId}
    </select>

    <select id="selectLetterUnreadCount" resultType="java.lang.Integer">
        select count(id)
        from message
        where status=0
        and from_id!=1
        and to_id = #{userId}
        <if test="conversationId!=null">
            and conversation_id=#{conversationId}
        </if>
    </select>
</mapper>
```

> status注释：0-未读;1-已读;2-删除;

****

### 编写Service

```java
package com.nowcoder.community.service;

import com.nowcoder.community.dao.MessageMapper;
import com.nowcoder.community.entity.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author: Tisox
 * @date: 2022/1/24 16:58
 * @description:
 * @blog:www.waer.ltd
 */
@Service
public class MessageService {
    
    @Autowired
    private MessageMapper messageMapper;
    
    public List<Message> findConversations(int userId,int offset ,int limit){
        return messageMapper.selectConversations(userId, offset, limit);
    }
    
    public int findConversationCount(int userId){
        return messageMapper.selectConversationCount(userId);
    }
    
    public List<Message> findLetters(String conversationId,int offset,int limit){
        return messageMapper.selectLetters(conversationId, offset, limit);
    }
    
    public int findLetterCount(String conversationId){
        return messageMapper.selectLetterCount(conversationId);
    }
    
    public int findLetterUnreadCount(int userId,String conversationId){
        return messageMapper.selectLetterUnreadCount(userId,conversationId);
    }
}
```

****

### 编写 Controller

```java
package com.nowcoder.community.controller;

import com.nowcoder.community.entity.Message;
import com.nowcoder.community.entity.Page;
import com.nowcoder.community.entity.User;
import com.nowcoder.community.service.MessageService;
import com.nowcoder.community.service.UserService;
import com.nowcoder.community.utils.HostHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.*;

/**
 * @author: Tisox
 * @date: 2022/1/24 17:05
 * @description:
 * @blog:www.waer.ltd
 *
 */
@Controller
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private HostHolder hostHolder;

    @Autowired
    private UserService userService;
    /**
     * 私信列表
     * @param model model
     * @param page 分页信息
     * @return String
     */
    @RequestMapping(path = "/letter/list/",method = RequestMethod.GET)
    public String getLetterList(Model model, Page page){
        User user = hostHolder.getUser();
        /*分页信息*/
        page.setLimit(5);
        page.setPath("/letter/list/");
        page.setRows(messageService.findConversationCount(user.getId()));
        /*会话列表*/
        List<Message> conversationList = messageService.findConversations(user.getId(), page.getOffset(), page.getLimit());
        List<Map<String,Object>> conversations = new ArrayList<>();
        if(!Objects.equals(conversationList,null)){
            for (Message message : conversationList) {
                Map<String,Object> map = new HashMap<>();
                map.put("consversation",message);
                map.put("letterCount",messageService.findLetterCount(message.getConversationId()));
                /*未读消息数*/
                map.put("unreadCount",messageService.findLetterUnreadCount(user.getId(),message.getConversationId()));
                int targetId = user.getId()==message.getFromId()?message.getToId():message.getFromId();
                map.put("target",userService.findUserById(targetId));

                conversations.add(map);
            }
        }
        model.addAttribute("conversations",conversations);
        /*查询未读消息数【全部】*/
        int letterUnreadCount = messageService.findLetterUnreadCount(user.getId(),null);
        model.addAttribute("letterUnreadCount",letterUnreadCount);
        
        return "/site/letter";
    }
}

```

****

### 处理前端页面资源

> 由于改动的地方比较多，代码就贴主要的大部分

- letter.html

```html
	<!-- 私信列表 -->
				<ul class="list-unstyled">

					<li class="media pb-3 pt-3 mb-3 border-bottom position-relative" th:each="map:${conversations}">
						<span class="badge badge-danger" th:text="${map.unreadCount}" th:if="${map.unreadCount!=0}">3
						</span>
						<a href="profile.html">
							<img th:src="${map.target.headerUrl}"
								 class="mr-4 rounded-circle user-header" alt="用户头像" >
						</a>
						<div class="media-body">
							<h6 class="mt-0 mb-3">
								<span class="text-success" th:utext="${map.target.username}">落基山脉下的闲人</span>
								<span class="float-right text-muted font-size-12"
									  th:text="${#dates.format(map.conversation.createTime,'yyyy-MM-dd HH:mm:ss')}">2019-04-28
									14:13:25</span>
							</h6>
							<div>
								<a th:href="@{|/letter/detail/${map.conversation.conversationId}|}"
								   th:utext="${map.conversation.content}">米粉车, 你来吧!</a>
								<ul class="d-inline font-size-12 float-right">
									<li
											class="d-inline ml-2"><a href="#" class="text-primary" >共 <i
											th:text="${map.letterCount}">
										5</i>
										条会话</a></li>
								</ul>
							</div>
						</div>
					</li>																																								
				</ul>
```

- letter-detail.html

```html
	<!-- 私信列表 -->
				<ul class="list-unstyled mt-4">
					<li class="media pb-3 pt-3 mb-2" th:each="map:${letters}">
						<a href="profile.html">
							<img th:src="${map.fromUser.headerUrl}"
								 class="mr-4 rounded-circle user-header" alt="用户头像" >
						</a>
						<div class="toast show d-lg-block" role="alert" aria-live="assertive" aria-atomic="true">
							<div class="toast-header">
								<strong class="mr-auto" th:utext="${map.fromUser.username}">落基山脉下的闲人</strong>
								<small
										th:text="${#dates.format(map.letter.createTime,'yyyy-MM-dd HH:mm:ss')}">2019-04-25
									15:49:32</small>
								<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="toast-body" th:utext="${map.letter.content}">
								君不见, 黄河之水天上来, 奔流到海不复回!
							</div>
						</div>
					</li>

				</ul>
```

> 分页功能直接replace 到index::pagination复用即可。

> 在index.html中也需要修改跳转到消息的链接路径。

> 由于查看私信详情页面需要返回，调用如下JS方法即可。

```javascript
	function back(){
			location.href = CONTEXT_PATH+"/letter/list";
		}
```

****

## 私信发送、已读

> 发送私信

- 异步方式发送私信
- 发送成功后刷新私信列表

> 已读设置

- 访问私信详情时，将显示的私信设置为已读状态。

****

### 编写Dao

- MessageMapper

```java
   /**
     * 添加私信(发送私信功能)
     * @param message 私信
     * @return int
     */
    int insertMessage(Message message);


    /**
     * 修改消息状态
     * @param ids 消息id
     * @param status 状态
     * @return int
     */
    int updateStatus(List<Integer> ids,int status);
```

- message-mapper.xml

```xml
    <insert id="insertMessage" parameterType="com.nowcoder.community.entity.Message" keyProperty="id">
        insert into message(<include refid="insertFields"/>)
        values(#{fromId},#{toId},#{conversationId},#{content},#{status},#{createtime})
    </insert>

    <update id="updateStatus">
        update message set status = #{status}
        where id in
        <foreach collection="ids" item="id" open="(" separator="," close=")">
            #{id}
        </foreach>
    </update>
```

****

### 编写Service

```java
  /**
     * 发送私信
     * @param message 信息
     * @return int
     */
    public int addMessage(Message message){
        message.setContent(HtmlUtils.htmlEscape(message.getContent()));
        message.setContent(sensitiveFilter.filter(message.getContent()));
        return messageMapper.insertMessage(message);
    }

    /**
     * 设置已读状态
     * @param ids 消息id
     * @return int
     */
    public int readMessage(List<Integer> ids){
        return messageMapper.updateStatus(ids,1);
    }
```

****

### 编写Controller

- 处理私信发送

```java
 /**
     * 异步发送私信
     * @param toName 私信接收者(发给谁)
     * @param content 私信内容
     * @return JSON信息
     */
    @RequestMapping(path = "/letter/send",method = RequestMethod.POST)
    @ResponseBody
    public String sendLetter(String toName,String content){
        User target = userService.findByUsername(toName);
        if(Objects.equals(target,null)){
            return CommunityUtil.getJSONString(1,"目标用户不存在!");
        }
        Message message = new Message();
        message.setFromId(hostHolder.getUser().getId());
        message.setToId(target.getId());
        if(message.getFromId()<message.getToId()){
            message.setConversationId(message.getFromId()+"_"+message.getToId());
        }else {
            message.setConversationId(message.getToId()+"_"+message.getFromId());
        }
        message.setContent(content);
        message.setCreateTime(new Date());
        messageService.addMessage(message);
        return CommunityUtil.getJSONString(0);
    }
```

> 注意```findByUsername()```方法需要在UserService中进行实现。
>
> 由于返回的时JSON内容，需要加上```@ResponseBody```注解。

- 处理私信已读设置

> 写一个私有方法，用来获取未读消息的列表数据。

```java
  /**
     * 获取未读消息数据
     * @param letterList 未读消息列表
     * @return List<Integer>
     */
    private List<Integer> getLetterIds(List<Message> letterList){
        List<Integer> ids = new ArrayList<>();
        if(!Objects.equals(letterList,null)){
            for (Message message : letterList) {
                if(Objects.equals(hostHolder.getUser().getId(),message.getToId()) && message.getStatus()==0){
                    ids.add(message.getId());
                }
            }
        }
        return ids;
    }
```

- 在之前的```getLetterDetail()```方法中添加如下方法，将消息设置为已读状态。

```java
 /*设置已读*/
        List<Integer> ids = getLetterIds(letterList);
        if(!ids.isEmpty()){
            messageService.readMessage(ids);
        }
```

****

### 处理前端页面

- letter.js

```javascript
function send_letter() {
	$("#sendModal").modal("hide");
	var toName = $("#recipient-name").val();
	var content = $("#message-text").val();
	$.post(
		CONTEXT_PATH + "/letter/send",
		{"toName":toName,
		"content":content
		},
		function(data) {
     		data = $.parseJSON(data);
			 if(data.code===0){
				 $("#hintBody").text("发送成功!");
			 }else {
				 $("#hintBody").text(data.msg);
			 }
			$("#hintModal").modal("show");
			setTimeout(function(){
				$("#hintModal").modal("hide");
				location.reload();
			}, 2000);

        }
	)
}
```

- letter-detail.html

> 处理自动获取私信发送者用户名

```html
	<div class="form-group">
										<label for="recipient-name" class="col-form-label">发给：</label>
										<input type="text" class="form-control" id="recipient-name"
											   th:value="${target.username}">
									</div>
```

****

## 统一异常

> 统一异常处理

- 非异步请求异常处理
- 异步请求异常处理

> 主要知识点

- ```@ExceptionHandler```
- ```@ControllerAdvice```

### 处理error页面

> 由于项目出错时需要用到错误页面，在```HomeController```中先设置好页面跳转。

```java
  /**
     * 跳转错误页面500
     * @return string
     */
    @RequestMapping(path = "/error",method = RequestMethod.GET)
    public String getErrorPage(){
        return "/error/500";
    }
```

### 统一处理异常

> 在controller包下新建一个advice包，下建一个```ExceptionAdvice```通知类。

```java
@ControllerAdvice(annotations = Controller.class)
```

只扫描带有该注解的bean，进行统一处理。

```java
/**
 * @author: Tisox
 * @date: 2022/1/27 11:44
 * @description:
 * @blog:www.waer.ltd
 */
@ControllerAdvice(annotations = Controller.class)
public class ExceptionAdvice {
    private static final Logger logger = LoggerFactory.getLogger(ExceptionAdvice.class);
    //该注解可以指定所有的错误类型，如：Exception.class，将在controller出现异常后被调用。
    @ExceptionHandler({Exception.class})
    public  void handleException(Exception e, HttpServletRequest request, HttpServletResponse response) throws IOException {
        logger.error("服务器发生异常："+e.getMessage());
        /*遍历异常的详细信息*/
        for(StackTraceElement element : e.getStackTrace()){
            logger.error(element.toString());
        }
        /*通过request来判断请求的类型：是否为异步请求*/
        String xRequestedWith = request.getHeader("x-requested-with");
        if(Objects.equals(xRequestedWith,"XMLHttprequest")){
            /*返回：plain:普通的字符串，人为处理成json*/
            response.setContentType("application/plain;charset=utf-8");
            PrintWriter writer = response.getWriter();
            writer.write(CommunityUtil.getJSONString(1,"服务器异常！"));
        }else{
            //普通请求：非异步
            response.sendRedirect(request.getContextPath() + "/error");
        }
    }
}
```

****

## 统一日志

> 统一记录日志

- 统一记录用户的操作日志，在Service中

> 主要知识点

- AOP：面向切面编程，一种对OOP的补充，可以进一步提高编程的效率。

### AOP(面向切面编程)

- **概念**

> AOP （ Aspect-Oriented Programming ，面向切面编程）：是一种新的方法论，是对传统 OOP （ Object-Oriented Programming ，面向对象编程）的补充。 AOP 的主要编程对象是切面（ aspect ），而切面即模块化横切关注点。在应用 AOP 编程时，仍然需要定义公共功能，但可以明确的定义这个功能在哪里、以什么方式应用，并且不必修改受影响的类。这样一来横切关注点就被模块化到特殊的对象——切面里。

- **术语**

> 切面（ Aspect ）：横切关注点（跨越应用程序多个模块的功能）被模块化的特殊对象；
> 通知（ Advice ）：切面必须要完成的工作；
> 目标（ Target ）:被通知的对象；
> 代理（ Proxy ）：向目标对象应用通知之后创建的对象；
> 连接点（ ```Joinpoint``` ）：程序执行的某个特定位置，如类某个方法调用前、调用后、方法抛出异常后等。连接点由两个信息确定：方法表示的程序执行点、相对点表示的方位，
> 切入点（ Pointcut ）：每个类都拥有多个连接点，类比：连接点相当于数据库中的记录，切入点相当于查询条件。切入点和连接点不是一对一的关系，一个切入点匹配多个连接点，切入点通过 org.springframework.aop.Pointcut 接口进行描述，它使用类和方法作为连接点的查询条件。

- **AspctJ**

> @Aspect 注解的 Java 类，通知是标注有某种注解的简单的 Java 方法。
> AspectJ 支持 5 种类型的通知注解：
> @Before ：前置通知，在方法执行之前执行；
> @After ：后置通知，在方法执行之后执行；
> @AfterReturning ：返回通知，在方法返回结果之后执行；
> @AfterThrowing ：异常通知，在方法抛出异常之后；
> @Around ：环绕通知，围绕着方法执行。

### SpringAOP

- JDK动态代理
  - Java提供的动态代理技术，可以在运行时创建接口的代理实例
  - SpringAOP默认采用这种方式，在接口的代理实例中织入代码
- CGLib动态代理
  - 采用底层的字节码技术，在运行时创建子类代理实例。
  - 当目标对象不存在接口时，SpringAOP会采用这种方式，在子类实例中织入代码。

> 由于本项目目标Service并没有接口实现，所以Spring会采用**CGLib动态代理**的方式。

****

### 统一记录日志

> 使用aop的方式实现对service日志的统一记录。

> **ServiceLogAspect.java**

```java
package com.nowcoder.community.aspect;
/**
 * @author: Tisox
 * @date: 2022/1/27 17:03
 * @description:
 * @blog:www.waer.ltd
 */
@Component
@Aspect
public class ServiceLogAspect {
    private static final Logger logger = LoggerFactory.getLogger(ServiceLogAspect.class);

	//表示会扫描service下所有的方法
    @Pointcut("execution(* com.nowcoder.community.service.*.*(..))")
    public void pointcut(){

    }

    @Before("pointcut()")
    public void before(JoinPoint joinPoint){
        //用户【IP】，在【时间】，访问了【com.nowcoder.community.service.xxxx()】.
        ServletRequestAttributes attributes =(ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        String ip = request.getRemoteHost();
        String now = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
        /*获取目标类型名和方法名*/
        String target = joinPoint.getSignature().getDeclaringTypeName() + "."+joinPoint.getSignature().getName();
        logger.info(String.format("用户[%s],在[%s],访问了[%s].",ip,now,target));
    }
}

```



#### **一些坑和注意点**

- ```Aspect```需要和项目的```Application```在同一级。
- 注意切入点的匹配，【```@Pointcut("execution(* com.nowcoder.community.service.*.*(..))")```】

****

## 点赞功能

> 点赞

- 支持帖子、评论点赞
- 第一次点赞，第二次取消点赞

> 首页点赞数量

- 统计帖子的点赞数量

> 详情页点赞数量

- 统计点赞数量
- 显示点赞状态



### 编写工具类

> ```RedisKeyUtil```用来处理存入```redis```的键。

```java
    private static final String SPLIT = ":";

    private static final String PREFIX_ENTITY_LIKE="like:entity";

    /**
     * 某个实体的赞
     * @return String
     */
    public static String getEntityLikeKey(int entityType,int entityId){
        return  PREFIX_ENTITY_LIKE + entityType+SPLIT+entityId;
    }
```

> 因为点赞的对象必然是某个实体，如帖子或者帖子的回复，所以需要将其作为```key```存入```redist```。

****

### 编写Service

> 编写```RedisService```处理点赞相关的功能业务。

- > 判断是否已赞过

```java
   /**
     * 点赞功能
     * @param userId 用户id
     * @param entityType 实体类型
     * @param entityId 实体id
     */
    public void like(int userId,int entityType,int entityId){
        /*拼key*/
        String entityLikeKey = RedisKeyUtil.getEntityLikeKey(entityType, entityId);
        /*判断是否已点过赞*/
        Boolean isMumber = redisTemplate.opsForSet().isMember(entityLikeKey, userId);
        if(isMumber){
            redisTemplate.opsForSet().remove(entityLikeKey, userId);
        }else{
            redisTemplate.opsForSet().add(entityLikeKey,userId);
        }
    }
```

- > 查询某实体的点赞数量

```java
/**
     * 查询某实体的点赞数量
     * @param entityType 实体类型
     * @param entityId 实体编号
     * @return long
     */
    public long findEntityLikeCount(int entityType,int entityId){
        String entityLikeKey = RedisKeyUtil.getEntityLikeKey(entityType, entityId);
        return redisTemplate.opsForSet().size(entityLikeKey);
    }
```

- > ```
  > 查询对某实体的点赞状态
  > ```

```java
   /**
     * 查询对某实体的点赞状态
     * @param userId 用户id
     * @param entityType 实体类型
     * @param entityId 实体编号
     * @return int
     */
    public int findEntityLikeStatus(int userId,int entityType,int entityId){
        String entityLikeKey = RedisKeyUtil.getEntityLikeKey(entityType,entityId);
        return redisTemplate.opsForSet().isMember(entityLikeKey,userId) ? 1 : 0;
    }
```

****

### 编写Controller

> 异步处理点赞功能。

```java
 @RequestMapping(path = "/like",method = RequestMethod.POST)
    @ResponseBody
    public String like(int entityType,int entityId){
        User user = hostHolder.getUser();
        /*点赞*/
        likeService.like(user.getId() ,entityType,entityId);
        /*数量*/
        long likeCount = likeService.findEntityLikeCount(entityType, entityId);
        /*状态*/
        int likeStatus = likeService.findEntityLikeStatus(user.getId(),entityType,entityId);
        Map<String,Object> map = new HashMap<>();
        map.put("likeCount",likeCount);
        map.put("likeStatus",likeStatus);
        return CommunityUtil.getJSONString(0,null,map);
    }
```

****

### 修改之前的Controller

> 由于在首页显示的帖子中，会显示被点赞的情况，因此需要修改之前的部分controller，对于帖子详情也是类似的处理。

- ```HomeController```

> 修改```getIndexPage()```方法

```java
   long  likeCount = likeService.findEntityLikeCount(ENTITY_TYPE_POST, post.getId());
                map.put("likeCount",likeCount);
```

- ```DiscussPostController```

> 修改其中的两个方法

```java
//处理帖子---------------------------------------------------------------------------------
	/*点赞数*/
        long likeCount = likeService.findEntityLikeCount(ENTITY_TYPE_POST,
                discussPostId);
        model.addAttribute("likeCount",likeCount);
        /*点赞状态*/
        int likeStatus =hostHolder.getUser()==null ? 0 :  likeService.findEntityLikeStatus(hostHolder.getUser().getId(),ENTITY_TYPE_POST,discussPostId);
        model.addAttribute("likeStatus",likeStatus);

//处理评论---------------------------------------------------------------------------------
 /*点赞状态*/
                 likeStatus =hostHolder.getUser()==null ? 0 :
                         likeService.findEntityLikeStatus(hostHolder.getUser().getId(),ENTITY_TYPE_COMMENT,comment.getId());
               // model.addAttribute("likeStatus",likeStatus);
                commentVo.put("likeStatus",likeStatus);
//处理回复---------------------------------------------------------------------------------
 /*点赞数*/
                        likeCount = likeService.findEntityLikeCount(ENTITY_TYPE_COMMENT,
                                reply.getId());
                        replyVo.put("likeCount",likeCount);
                        /*点赞状态*/
                        likeStatus =hostHolder.getUser()==null ? 0 :
                                likeService.findEntityLikeStatus(hostHolder.getUser().getId(),ENTITY_TYPE_COMMENT,
                                        reply.getId());
                        replyVo.put("likeStatus",likeStatus);
```

****

### 前端页面处理

> 点赞涉及到的页面相对比较多，不再全部展示。

- ``discuss-detail.html``

```html
	<li class="d-inline ml-2">
									<a href="javascript:;" th:onclick="|like(this,1,${post.id});|"
									   class="text-primary"> <b th:text="${likeStatus==1?'已赞':'赞'}">赞</b><i
											th:text="${likeCount}">11</i>
									</a>
								</li>
```

- ```index.html```

```html
<li class="d-inline ml-2">赞 <span th:text="${map.likeCount}">11</span></li>
```

****

## 收到的赞

> 重构点赞功能

- 以用户为key，记录点赞数量
- increment(key),decrement(key)

> 开发个人主页

- 以用户为key，查询点赞数量

### 编写Utils

> 修改```RedisKeyUtil```,新增用户key

```java
  private static final String PREFIX_USER_LIKE = "like:user";

  /**
     * 某个用户的赞
     * @param userId 用户id
     * @return String
     */
    public static String getUserLikeKey(int userId){
        return PREFIX_USER_LIKE+SPLIT + userId;
    }
```

****

### 编写Service

> 修改```LikeService```的```like```方法：

```java
 redisTemplate.execute(new SessionCallback() {
            @Override
            public Object execute(RedisOperations operations) throws DataAccessException {
                String entityLikeKey = RedisKeyUtil.getEntityLikeKey(entityType, entityId);
                String userLikeKey = RedisKeyUtil.getUserLikeKey(entityUserId);
                boolean isMember = operations.opsForSet().isMember(entityLikeKey,userId);
                /*开启事务*/
                operations.multi();
                /*已点赞*/
                if(isMember){
                    operations.opsForSet().remove(entityLikeKey,userId);
                    operations.opsForValue().decrement(userLikeKey);
                }else{
                    /*没点赞*/
                    operations.opsForSet().add(entityLikeKey,userId);
                    operations.opsForValue().increment(userLikeKey);
                }
                return operations.exec();
            }
        });
```

> 新增```findUserLikeCount```方法

```java
  /**
     * 查询某个用户获得的赞
     * @param userId 用户id
     * @return int
     */
    public int findUserLikeCount(int userId){
        String userLikeKey = RedisKeyUtil.getUserLikeKey(userId);
        Integer count = (Integer) redisTemplate.opsForValue().get(userLikeKey);
        return count== null  ?0 : count.intValue();
    }
```





****



### 编写Controller

> 编辑之前的```UserController```,新增如下方法

```java
   /**
     * 个人主页
     * @param userId 用户id
     * @param model model
     * @return String
     */
    @RequestMapping(path = "/profile/{userId}",method = RequestMethod.GET)
    public String getProfilePage(@PathVariable("userId"),int userId,Model model){
        User user = userService.findUserById(userId);
        if(Objects.equals(user,null)){
            throw new RuntimeException("该用户不存在!");
        }
        /*用户*/
        model.addAttribute("user",user);
        /*点赞数量*/
        int likeCount = likeService.findUserLikeCount(userId);
        model.addAttribute("likeCount",likeCount);
        
        return "/site/profile";
    }
```



> 编写之前的```LikeController```

```java
   @RequestMapping(path = "/like",method = RequestMethod.POST)
    @ResponseBody
    public String like(int entityType,int entityId,int entityUserId){
        User user = hostHolder.getUser();
        /*点赞*/
        likeService.like(user.getId() ,entityType,entityId,entityUserId);
        /*数量*/
        long likeCount = likeService.findEntityLikeCount(entityType, entityId);
        /*状态*/
        int likeStatus = likeService.findEntityLikeStatus(user.getId(),entityType,entityId);
        Map<String,Object> map = new HashMap<>();
        map.put("likeCount",likeCount);
        map.put("likeStatus",likeStatus);

        return CommunityUtil.getJSONString(0,null,map);
```

****

### 处理前端页面

> ```discuss-detail.html```

```html
<li
													class="d-inline ml-2"><a href="javascript:;"
																			 th:onclick="|like(this,2,${rvo.reply.id},${rvo.reply.userId});|"
																			 class="text-primary"> <b
													th:text="${rvo.likeStatus==1?'已赞':'赞'}">赞
											</b><i
													th:text="${rvo.likeCount}">(1)
											</i>
											</a>
											</li>
```

> 其他地方类似的修改，不再贴了。主要就是新增一个参数：该实体本身的拥有者即```userId```作为第三个参数传入。

> 处理```discuss.js```

```javascript
function like(btn,entityType,entityId,entityUserId){
    $.post(
        CONTEXT_PATH + "/like",
        {"entityType":entityType,"entityId":entityId,"entityUserId":entityUserId},
        function (data){
            data = $.parseJSON(data);
            if(data.code===0){
                $(btn).children("i").text(data.likeCount);
                $(btn).children("b").text(data.likeStatus==1 ? '已赞': '赞');
            }else{
                alert(data.msg);
            }
        }
    )
}
```

> ```profile.html```

```html
<div class="media mt-5">
					<img th:src="${user.headerUrl}"
						 class="align-self-start mr-4 rounded-circle"
						 alt="用户头像" style="width:50px;">
					<div class="media-body">
						<h5 class="mt-0 text-warning">
							<span th:utext="${user.username}">nowcoder</span>
							<button type="button" class="btn btn-info btn-sm float-right mr-5 follow-btn">关注TA</button>
						</h5>
						<div class="text-muted mt-3">
							<span>注册于
								<i class="text-muted"
								   th:text="${#dates.format(user.createTime,'yyyy-MM-dd HH:mm:ss')}">2015-06-12
									15:20:12</i></span>
						</div>
						<div class="text-muted mt-3 mb-5">
							<span>关注了 <a class="text-primary" href="followee.html">5</a> 人</span>
							<span class="ml-4">关注者 <a class="text-primary" href="follower.html">123</a> 人</span>
							<span class="ml-4">获得了 <i class="text-danger" th:text="{likeCount}">87</i> 个赞</span>
						</div>
					</div>
				</div>
```

> 另外，还需要处理的页面有index.html

****

## 关注、取关

> 需求

- 开发关注、取消关注功能。
- 统计用户的关注数、粉丝数。

> 要点

- 若A关注了B，则A是B的(**Follower**)粉丝，B是A的(**Followee**)目标
- 关注的目标可以是用户、帖子、题目等，在实现时将这些目标抽象为实体。

### 编写Util

> 在```RedisKeyUtil```中添加以下内容。

```java
 /*目标：被关注者*/
    private static final String PREFIX_FOLLOWEE = "followee";
    /*粉丝：关注者*/
    private static final String PREFIX_FOLLOWER = "follower";
//-------------------------------------------------
   /**
     * 某个用户关注的实体
     * @param userId 用户id
     * @param entityType 实体类型
     * @return String
     */
    //followee:userId:entityType->zset(entityId,now)
    public static String getFolloweeKey(int userId,int entityType){
        return PREFIX_FOLLOWEE + SPLIT + userId + SPLIT + entityType;
    }

    /**
     * 某个实体拥有的粉丝
     * @param entityType 实体类型
     * @param entityId 实体id
     * @return String
     */
    //folower:entityTyoe:entityId->zset(userId,now)
    public static String getFollowerKey(int entityType,int entityId){
        return PREFIX_FOLLOWER + SPLIT + entityType + SPLIT + entityId;
    }
```

****

### 编写Service

> 新增```FollowService```,编写关注和取关的方法

```java
 /**
     * 关注
     * @param userId 用户id
     * @param entityType 实体类型
     * @param entityId 实体id
     */
    public void follow(int userId,int entityType,int entityId){
        redisTemplate.execute(new SessionCallback() {
            @Override
            public Object execute(RedisOperations operations) throws DataAccessException {
                String followeeKey = RedisKeyUtil.getFolloweeKey(userId, entityType);
                String followerKey = RedisKeyUtil.getFollowerKey(entityType, entityId);
                operations.multi();
                operations.opsForZSet().add(followeeKey,entityId,System.currentTimeMillis());
                operations.opsForZSet().add(followerKey,userId,System.currentTimeMillis());
                return operations.exec();
            }
        });
    }

    /**
     * 取关
     * @param userId 用户id
     * @param entityType 实体类型
     * @param entityId 实体id
     */
    public void unfollow(int userId,int entityType,int entityId){
        redisTemplate.execute(new SessionCallback() {
            @Override
            public Object execute(RedisOperations operations) throws DataAccessException {
                String followeeKey = RedisKeyUtil.getFolloweeKey(userId, entityType);
                String followerKey = RedisKeyUtil.getFollowerKey(entityType, entityId);
                operations.multi();
                operations.opsForZSet().remove(followeeKey,entityId);
                operations.opsForZSet().remove(followerKey,userId);
                return operations.exec();
            }
        });
    }
 /**
     * 查询关注的实体的数量
     * @param userId 用户id
     * @param entityType 用户类型
     * @return long
     */
    public long findFolloweeCount(int userId,int entityType){
        String followeeKey = RedisKeyUtil.getFolloweeKey(userId, entityType);
        return redisTemplate.opsForZSet().zCard(followeeKey);
    }

    /**
     * 查询实体的粉丝的数量
     * @param entityType 实体类型
     * @param entityId 实体id
     * @return long
     */
    public long findFollowerCount(int entityType,int entityId){
        String followerKey = RedisKeyUtil.getFollowerKey(entityType,entityId);
        return redisTemplate.opsForZSet().zCard(followerKey);
    }

    /**
     * 查询当前用户是否已关注该实体
     * @param userId
     * @param entityType
     * @param entityId
     * @return
     */
    public boolean hasFollowed(int userId,int entityType,int entityId){
        String followeeKey = RedisKeyUtil.getFolloweeKey(userId, entityType);
        return redisTemplate.opsForZSet().score(followeeKey,entityId)!=null;
    }
```

****

### 编写Controller

> 新增```FollowController```

```java
    /**
     * 关注
     * @param entityType 实体类型
     * @param entityId 实体id
     * @return JSON
     */
    @RequestMapping(path = "/follow",method = RequestMethod.POST)
    @ResponseBody
    public String follow(int entityType,int entityId){
        User user = hostHolder.getUser();
        followService.follow(user.getId(),entityType,entityId);
        
        return CommunityUtil.getJSONString(0,"已关注"); 
    }

    /**
     * 取关
     * @param entityType 实体类型
     * @param entityId 实体id
     * @return JSON
     */
    @RequestMapping(path = "/follow",method = RequestMethod.POST)
    @ResponseBody
    public String unfollow(int entityType,int entityId){
        User user = hostHolder.getUser();
        followService.unfollow(user.getId(),entityType,entityId);
        return CommunityUtil.getJSONString(0,"已取消关注");
}


```

> 修改```UserController```

```java
  /*查询关注数量*/
        long followeeCount = flowService.findFolloweeCount(userId, ENTY_TYPE_USER);
        model.addAttribute("followeeCount",followeeCount);
        /*粉丝数量*/
        long followerCount = flowService.findFollowerCount(ENTY_TYPE_USER, userId);
        model.addAttribute("followerCount",followerCount);

        /*是否已关注*/
        boolean hasFollowed = false;
        if(hostHolder.getUser()!=null){
            hasFollowed = flowService.hasFollowed(hostHolder.getUser().getId(),ENTY_TYPE_USER,userId);
        }
        model.addAttribute("hasFollowed",hasFollowed);
```



****

### 前端页面处理

> ```profile.html```

```html
	<button type="button"
									th:class="|btn ${hasFollowed?'btn-secondary':'btn-info'} btn-sm float-right mr-5 follow-btn|"
									th:text="${hasFollowed?'已关注':'关注TA'}"
									th:if="${loginUser!=null && loginUser.id!=user.id}">关注TA
							</button>

//-------------------------------------------------
<span>关注了 <a class="text-primary" href="followee.html" th:text="${followeeCount}">5</a> 人</span>
							<span class="ml-4">关注者 <a class="text-primary" href="follower.html" th:text="${followerCount}">123</a> 人
							</span>
							<span class="ml-4">获得了 <i class="text-danger" th:text="${likeCount}">87</i> 个赞</span>
```

### 效果演示

![](https://images.waer.ltd/img/20220129213908.png)

****

## 关注、粉丝列表

> 业务层

- 查询某个用户关注的人，支持分页。
- 查询某个用户的粉丝，支持分页。

> 表现层

- 处理【查询关注的人】、【查询粉丝】请求。
- 编写【查询关注的人】、【查询粉丝】模板。

****

### 编写Service

> 在```FollowService```中新增如下方法。

```java
    /**
     * 查询某用户关注的人
     * @return List
     */
    public List<Map<String,Object>> findFollowees(int userId,int offset,int limit){
        String followeeKey = RedisKeyUtil.getFolloweeKey(userId,ENTY_TYPE_USER );
        Set <Integer>targetIds = redisTemplate.opsForZSet().reverseRange(followeeKey, offset, offset + limit - 1);
        if(targetIds==null){
            return null;
        }
        List<Map<String,Object>> list = new ArrayList<>();
        for(Integer targetId:targetIds){
           Map<String,Object> map = new HashMap<>();
           User user = userService.findUserById(targetId);
           map.put("user",user);
            Double score = redisTemplate.opsForZSet().score(followeeKey, targetId);
            map.put("followTime",new Date(score.longValue()));
            list.add(map);
        }
        return list;
    }

    /**
     * 查询某用户的粉丝
     * @param userId
     * @param offset
     * @param limit
     * @return List
     */
    public List<Map<String,Object>> findFollowers(int userId,int offset,int limit){
        String followerKey = RedisKeyUtil.getFollowerKey(ENTY_TYPE_USER,userId);
        Set<Integer>  targetIds = redisTemplate.opsForZSet().reverseRange(followerKey,offset,offset+limit-1);
        if(targetIds==null){
            return null;
        }
        List<Map<String,Object>> list = new ArrayList<>();
        for(Integer targetId:targetIds){
            Map<String,Object> map = new HashMap<>();
            User user = userService.findUserById(targetId);
            map.put("user",user);
            Double score = redisTemplate.opsForZSet().score(followerKey, targetId);
            map.put("followTime",new Date(score.longValue()));
            list.add(map);
        }
        return list;
    }
```

****

### 编写Controller

> 在```FolloweController```中添加如下方法。

```java
 /**
     * 获取关注列表
     * @param userId 用户id
     * @param page 分页信息
     * @param model model
     * @return String
     */
    @RequestMapping(path = "/followees/{userId}",method = RequestMethod.GET)
    public String getFollowees(@PathVariable("userId") int userId, Page page, Model model){
        User user = userService.findUserById(userId);
        if(user == null){
            throw new RuntimeException("该用户不存在！");
        }
        model.addAttribute("user",user);
        page.setLimit(5);
        page.setPath("/followees/"+userId);
        page.setRows((int)followService.findFolloweeCount(userId,ENTY_TYPE_USER));
        List<Map<String,Object>> userList = followService.findFollowees(userId,page.getOffset(),page.getLimit());
        if(userList!=null){
            for (Map<String,Object> map : userList){
                User u = (User)map.get("user");
                map.put("hasFollowed",hasFollowed(u.getId()));
            }
        }
        model.addAttribute("users",userList);
        return "/site/followee";
    }

    /**
     * 获取粉丝列表
     * @param userId 用户id
     * @param page 分页信息
     * @param model model
     * @return String
     */
    @RequestMapping(path = "/followers/{userId}",method = RequestMethod.GET)
    public String getFollowers(@PathVariable("userId") int userId, Page page, Model model){
        User user = userService.findUserById(userId);
        if(user == null){
            throw new RuntimeException("该用户不存在！");
        }
        model.addAttribute("user",user);
        page.setLimit(5);
        page.setPath("/followers/"+userId);
        page.setRows((int)followService.findFollowerCount(ENTY_TYPE_USER,userId));
        List<Map<String,Object>> userList = followService.findFollowers(userId,page.getOffset(),page.getLimit());
        if(userList!=null){
            for (Map<String,Object> map : userList){
                User u = (User)map.get("user");
                map.put("hasFollowed",hasFollowed(u.getId()));
            }
        }
        model.addAttribute("users",userList);
        return "/site/follower";
    }



    /**
     * 判断是否关注了某用户
     * @param userId 用户id
     * @return bool
     */
    private boolean hasFollowed(int userId){
        if(hostHolder.getUser()==null){
            return false;
        }
        return followService.hasFollowed(hostHolder.getUser().getId(),ENTY_TYPE_USER,userId);
    }
```

****

### 处理前端页面

- profile.html

```html
<span>关注了 <a class="text-primary" th:href="@{|/followees/${user.id}|}" 
```

```html
<span class="ml-4">关注者 <a class="text-primary" th:href="@{|/followers/${user.id}|}" 
```

- followee.html

> 处理资源路径。



> 处理关注链接

```html
	<div class="main">
			<div class="container">
				<div class="position-relative">
					<!-- 选项 -->
					<ul class="nav nav-tabs mb-3">
						<li class="nav-item">
							<a class="nav-link position-relative active" th:href="@{|/followees/${user.id}|}"><i 
									class="text-info" th:text="${user.username}">
								Nowcoder</i> 关注的人</a>
						</li>
						<li class="nav-item">
							<a class="nav-link position-relative" th:href="@{|/followers/${user.id}|}">关注 <i 
									class="text-info" th:text="${user.username}">Nowcoder</i> 的人</a>
						</li>
					</ul>
					<a th:href="@{|/user/profile/${user.id}|}" class="text-muted position-absolute rt-0">返回个人主页&gt;</a>
				</div>
```

> 处理关注列表

```html
<li class="media pb-3 pt-3 mb-3 border-bottom position-relative" th:each="map:${users}">
						<a th:href="@{|/user/profile/${map.user.id}|}">
							<img th:src="${map.user.headerUrl}"
								 class="mr-4 rounded-circle user-header" alt="用户头像" >
						</a>
						<div class="media-body">
							<h6 class="mt-0 mb-3">
								<span class="text-success" th:utext="${map.user.username}">落基山脉下的闲人</span>
								<span class="float-right text-muted font-size-12">
									关注于 <i th:text="${#dates.format(map.followTime,'yyyy-MM-dd HH:mm:ss')}">2019-04-28
									14:13:25</i>
								</span>
							</h6>
							<div>
								<input type="hidden" id="entityId" th:value="${map.user.id}">
								<button type="button"
										th:class="|btn ${map.hasFollowed?'btn-secondary':'btn-info'} btn-sm float-right mr-5 follow-btn|"
										th:text="${map.hasFollowed?'已关注':'关注TA'}"
										th:if="${loginUser!=null && loginUser.id!=user.id!=map.user.id}">
								>关注TA
								</button>
							</div>
						</div>
					</li>
```

> 复用index写好的分页模板。

- follower.html

> 和上一个页面类似，不再贴代码。

### 效果演示

![](https://images.waer.ltd/img/flist.gif)

****

## 登录模块优化

### 本节目录

> 使用redis存储验证码

- 验证码需要频繁访问与刷新，有性能要求。
- 验证码不需要永久保存，
- 分布式部署时有存在session共享的问题。

> 使用redis存储登录凭证

- 处理每次请求时，都要查询用户的登录凭证，访问的频率非常高。

> 使用redis缓存用户信息

- 处理每次请求时，都要根据凭证查询用户信息，访问频率非常高。

****

### 修改```RedisKeyUtil```

> 新增存储用户凭证的key和对应的方法

```java
  /*用户登录凭证*/
    private static final String PREFIX_KAPTCHA = "kaptcha";
    
    /**
     * 登录验证码
     * @return String
     */
    public static String getKaptchaKey(String owner){
        return PREFIX_KAPTCHA + SPLIT+ owner;
    }
```

****

### 修改```LoginController```

> 将登录的验证码存储到```redis```中，所以将之前的```session```信息替换掉。并且作一部分的修改。

```java
 //验证码归属
        String kaptchaOwner = CommunityUtil.generateUUID();
        Cookie cookie = new Cookie("kaptchaOwner",kaptchaOwner);
        cookie.setMaxAge(60);
        cookie.setPath(contextPath);
        response.addCookie(cookie);
        //将验证码存储在redis中
        String redisKey = RedisKeyUtil.getKaptchaKey(kaptchaOwner);
        redisTemplate.opsForValue().set(redisKey,text,60, TimeUnit.SECONDS);
```

> 再```login()```方法中也需要修改对应的代码逻辑。

```java
//删除参数session，添加参数@CookieValue("kaptchaOwner")String kaptchaOwner
//修改获取验证码的方式：从redis中获取。
 String kaptcha = null;
        if(StringUtils.isNoneBlank(kaptchaOwner)){
            String redisKey = RedisKeyUtil.getKaptchaKey(kaptchaOwner);
            kaptcha = (String) redisTemplate.opsForValue().get(redisKey);
        }
```

> 至此，使用redis存储验证码功能完成。

****

- **使用```redis```存储登录凭证**

### 修改```RedisKeyUtil```

> 新增对应的key和方法

```java
   /*用户凭证存储*/
    private static final String PREFIX_TICKET = "ticket";
   /**
     * 登录凭证获取
     * @return string
     */
    public static String getTicketKey(String ticket){
        return PREFIX_TICKET + SPLIT + ticket;
    }
```

****



### 弃用之前的```LoginTicketMapper```

> 由于用户凭证```ticket```将存储再redis中，原有的数据库查询信息可以加上```@Deprecated```表示弃用。

****

### 修改```UserService```中的部分方法。

> 随着上面ticket的获取方式的修改，对应的一些地方也需要进行调整。

- ```login```方法

```java
 String redisKey = RedisKeyUtil.getTicketKey(loginTicket.getTicket());
        /*将loginTicket存入redsi会自动将其序列化为json字符串*/
        redisTemplate.opsForValue().set(redisKey,loginTicket);
```

- ```logout```方法

```java
 public void logout(String ticket){
//        loginTicketMapper.updateStatus(ticket,1);
        String redisKey = RedisKeyUtil.getTicketKey(ticket);
        LoginTicket loginTicket = (LoginTicket)redisTemplate.opsForValue().get(redisKey);
        loginTicket.setStatus(1);
        redisTemplate.opsForValue().set(redisKey,loginTicket);
    }
```

- ```findLoginTicket```方法

```java
public LoginTicket findLoginTicket(String ticket){
        //return loginTicketMapper.selectByTicket(ticket);
        String redisKey = RedisKeyUtil.getTicketKey(ticket);
        return (LoginTicket) redisTemplate.opsForValue().get(redisKey);
    }
```

> 至此。利用redsi存储用户凭证的调整结束。

****

- **使用redis缓存用户信息**

> 添加key和对应的方法

```java
  /*缓存用户信息*/
    private static final String PREFIX_USER = "user";
 /**
     * 获取用户信息
     * @param userId 用户id
     * @return String
     */
    public static String getUserKey(int userId){
        return PREFIX_USER + SPLIT + userId;
    }
```

1. 添加获取缓存、初始化缓存、清除缓存的方法。

```java
/**
     * .优先从缓存中取值
     * @param userId 用户id
     * @return User
     */
    private User getCache(int userId){
        String redisKey = RedisKeyUtil.getUserKey(userId);
        return (User)redisTemplate.opsForValue().get(redisKey);
    }

    /**
     * 取不到时初始化缓存
     * @param userId 用户id
     * @return User
     */
    private User initCache(int userId){
        User user = userMapper.selectById(userId);
        String redisKey = RedisKeyUtil.getUserKey(userId);
        redisTemplate.opsForValue().set(redisKey, user,3600, TimeUnit.SECONDS);
        return user;
    }

    /**
     * 数据变更时清楚缓存
     * @param userId 用户id
     */
    private void clearCache(int userId){
        String redisKey = RedisKeyUtil.getUserKey(userId);;
        redisTemplate.delete(redisKey);
    }
```

2. 在需要的方法中调用

> 修改```Userservice```中的```findUserById```方法。

```java
  /**
     * 根据id查找用户对象
     * @param id id
     * @return User
     */
    public User findUserById (int id){
//        return userMapper.selectById(id);
        User user = getCache(id);
        if(user==null){
            user = initCache(id);
        }
        return user;      
    }
```

> 修改activation方法

```java
   /**
     * 激活注册过的账号
     * @param userId 注册用户id
     * @param code 携带的激活码
     * @return 激活状态
     */
    public int activation(int userId,String code){
        User user = userMapper.selectById(userId);
        if(Objects.equals(user.getStatus(),1)){
            return ACTIVATION_REPEAT;
        }else if(Objects.equals(user.getActivationCode(),code)){
            userMapper.updateStatus(userId,1);
            //改动点
            clearCache(userId);
            return ACTIVATION_SUCCESS;
        }else{
            return ACTIVATION_FAILURE;
        }
    }
```

> 修改UpdateHeader方法

```java
   /**
     * 更新用户头像路径
     * @param userId 用户id
     * @param headerUrl 头像路径
     * @return int
     */
    public int updateHeader(int userId,String headerUrl){
        int rows = userMapper.updateHeader(userId, headerUrl);
        clearCache(userId);
        return rows;

    }
```

### 最终效果演示

![](https://images.waer.ltd/img/20220202214657.png)

****

## 发送系统通知

### 本节目录

> 触发事件

- 评论后，发布通知
- 点赞后，发布通知
- 关注后，发布通知

> 处理事件

- 封装事件对象
- 开发事件的生产者
- 开发事件的消费者

****

### 编写entity代码

```java
package com.nowcoder.community.entity;

import java.util.HashMap;
import java.util.Map;

/**
 * @author: Tisox
 * @date: 2022/2/12 21:29
 * @description:
 * @blog:www.waer.ltd
 */
public class Event {
    /**
     * 主题
     */
    private String topic;
    /**
     * 用户id
     */
    private int userId;
    /**
     * 实体类型
     */
    private int entityType;
    /**
     * 实体id
     */
    private int entityId;
    /**
     * 实体作者
     */
    private int entityUserId;
    /**
     * 其他数据
     */
    private Map<String,Object> data  = new HashMap<>();

    @Override
    public String toString() {
        return "Event{" +
                "topic='" + topic + '\'' +
                ", userId=" + userId +
                ", entityType=" + entityType +
                ", entityId=" + entityId +
                ", entityUserId=" + entityUserId +
                ", data=" + data +
                '}';
    }

    public Event() {
    }

    public String getTopic() {
        return topic;
    }

    public Event setTopic(String topic) {
        this.topic = topic;
        return this;
    }

    public int getUserId() {
        return userId;
    }

    public Event setUserId(int userId) {
        this.userId = userId;
        return this;
    }

    public int getEntityType() {
        return entityType;
    }

    public Event setEntityType(int entityType) {
        this.entityType = entityType;
        return this;
    }

    public int getEntityId() {
        return entityId;
    }

    public Event setEntityId(int entityId) {
        this.entityId = entityId;
        return this;
    }

    public int getEntityUserId() {
        return entityUserId;
    }

    public Event setEntityUserId(int entityUserId) {
        this.entityUserId = entityUserId;
        return this;
    }

    public Map<String, Object> getData() {
        return data;
    }

    public Event setData(String key, Object value) {
        this.data.put(key,value);
        return this;
    }

    public Event(String topic, int userId, int entityType, int entityId, int entityUserId, Map<String, Object> data) {
        this.topic = topic;
        this.userId = userId;
        this.entityType = entityType;
        this.entityId = entityId;
        this.entityUserId = entityUserId;
        this.data = data;
    }
}
```

### 封装事件

> 新建一个Event包，用来封装处理生产者和消费者的事件信息。

- 新建类```EventProducer```，封装处理生产者。

```java
package com.nowcoder.community.Event;

import com.alibaba.fastjson.JSONObject;
import com.nowcoder.community.entity.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

/**
 * @author: Tisox
 * @date: 2022/2/12 21:42
 * @description:
 * @blog:www.waer.ltd
 */
@Component
public class EventProducer {
    @Autowired
    private KafkaTemplate kafkaTemplate;
    //处理事件
    public void fireEvent(Event event){
        /*将事件发布到指定的主题*/
        kafkaTemplate.send(event.getTopic(), JSONObject.toJSONString(event));
    }

}
```

- 新建类```EventConsumer```，封装处理生产者。

```java
package com.nowcoder.community.Event;

import com.alibaba.fastjson.JSONObject;
import com.nowcoder.community.entity.Event;
import com.nowcoder.community.entity.Message;
import com.nowcoder.community.service.MessageService;
import com.nowcoder.community.utils.CommunityConstant;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * @author: Tisox
 * @date: 2022/2/12 21:59
 * @description:
 * @blog:www.waer.ltd
 */
@Component
public class EventConsumer implements CommunityConstant {
    private static final Logger logger = LoggerFactory.getLogger(EventConsumer.class);
    @Autowired
    private MessageService messageService;

    @KafkaListener(topics = {TOPIC_COMMENT,TOPIC_LIKE,TOPIC_FOLLOW})
    public void handleCommentMessage(ConsumerRecord record){
        if(Objects.equals(record,null) || Objects.equals(record.value(),null)){
            logger.error("消息的内容为空！");
            return;
        }
        Event event = JSONObject.parseObject(record.value().toString(),Event.class);
        if(event==null){
            logger.error("消息格式错误！");
            return;
        }
        /*发送站内通知*/
        Message message = new Message();
        message.setFromId(SYSTEM_ID);
        message.setToId(event.getEntityUserId());
        message.setConversationId(event.getTopic());
        message.setCreateTime(new Date());

        Map<String,Object> content = new HashMap<>();
        content.put("userId",event.getUserId());
        content.put("entityType",event.getEntityType());
        content.put("entityId",event.getEntityId());

        if(!event.getData().isEmpty()){
            for(Map.Entry<String,Object> entry:event.getData().entrySet()){
                content.put(entry.getKey(),entry.getValue());
            }
        }
        message.setContent(JSONObject.toJSONString(content));
        messageService.addMessage(message);
    }
}
```

- ```CommunityConstant```

```java
    /*主题：评论*/
    String TOPIC_COMMENT = "comment";
    /*主题:点赞*/
    String TOPIC_LIKE = "like";
    /*主题：关注*/
    String TOPIC_FOLLOW = "follow";
    /*系统用户ID*/
    Integer  SYSTEM_ID=1;
```

> 处理业务时，只需要调用生产者即可，消费者会自动触发调用。

****

### 事件触发

> 处理在用户进行关注、点赞、评论时进行事件的触发，需要修改：
>
> ```CommentController```、```LikeController```、```FollowController```的部分方法。

- ```CommentController```中的```addComment```方法。

```java
 //触发评论事件
        Event event = new  Event()
                .setTopic(TOPIC_COMMENT)
                .setUserId(hostHolder.getUser().getId())
                .setEntityType(comment.getEntityType())
                .setEntityId(comment.getEntityId())
                .setData("postId",discussPostId);
        if(comment.getEntityType()==ENTITY_TYPE_POST){
            DiscussPost target = discussPostService.findDiscussPostById(comment.getEntityId());
            event.setEntityUserId(target.getUserId());
        }else if(comment.getEntityType()==ENTITY_TYPE_COMMENT){
            Comment target = commentService.findCommentById(comment.getEntityId());
            event.setEntityUserId(target.getUserId());
        }
        eventProducer.fireEvent(event);
```

- ```LikeController```的```like```方法。

```java
  public String like(int entityType,int entityId,int entityUserId,int postId){
        User user = hostHolder.getUser();
        /*点赞*/
        likeService.like(user.getId() ,entityType,entityId,entityUserId);
        /*数量*/
        long likeCount = likeService.findEntityLikeCount(entityType, entityId);
        /*状态*/
        int likeStatus = likeService.findEntityLikeStatus(user.getId(),entityType,entityId);
        Map<String,Object> map = new HashMap<>();
        map.put("likeCount",likeCount);
        map.put("likeStatus",likeStatus);
        //触发点赞事件
        if(likeStatus==1){
            //点赞触发
            Event event = new Event()
                    .setTopic(TOPIC_LIKE)
                    .setUserId(hostHolder.getUser().getId())
                    .setEntityType(entityType)
                    .setEntityId(entityId)
                    .setEntityUserId(entityUserId)
                    .setData("postId",postId);
            eventProducer.fireEvent(event);
        }
        return CommunityUtil.getJSONString(0,null,map);

    }
```

> 注意该方法重新添加了一个新的参数：```postId```,需要在页面、```JS```进行对应的修改。

- ```FollowController```的```follow```方法。

```java
 //触发关注事件
        Event event = new Event()
                .setTopic(TOPIC_FOLLOW)
                .setUserId(hostHolder.getUser().getId())
                .setEntityType(entityType)
                .setEntityId(entityId)
                .setEntityUserId(entityId);
        eventProducer.fireEvent(event);
```

****

![](https://images.waer.ltd/img/2.jpg)

****

## 通知详情

### 本节目录

> 通知列表

- 显示评论、点赞、关注三类型的通知

> 通知详情

- 分页显示某一类主题所包含的通知

> 未读消息

- 在页面头部显示所有未读消息数量

****

### 编写dao

> ```MessageMapper```中

```java
 /**
     * 查询某个主题下最新的通知
     * @param userId 用户id
     * @param topic 主题
     * @return message
     */
    Message selectLatestNotice(int userId,String topic);

    /**
     * 查询某个主题包含的通知数量
     * @param userId 用户id
     * @param topic 主题哦
     * @return int
     */
    int selectNoticeCount(int userId,String topic);

    /**
     *未读的通知数量
     * @param userId 用户id
     * @param topic 主题
     * @return int
     */
    int selectNoticeUnreadCount(int userId,String topic);
```

> ```message-mapper.xml```

```xml
 <select id="selectLatestNotice" resultType="com.nowcoder.community.entity.Message">
        select <include refid="selectFields"/>
        from message
        where id in(
            select max(id) from message
            where status!=2
            and from_id=1
            and to_id = #{userId}
            and conversation_id=#{topic}
        )
    </select>
    <select id="selectNoticeCount" resultType="java.lang.Integer">
        select count(id) from message
        where status!=2
          and from_id=1
          and to_id = #{userId}
          and conversation_id=#{topic}
    </select>
    <select id="selectNoticeUnreadCount" resultType="java.lang.Integer">
        select count(id) from message
        where status=0
          and from_id=1
          and to_id = #{userId}
          <if test="topic!=null">
              and conversation_id=#{topic}
          </if>

    </select>
```

****

### 编写Service

> MessageService

```java
   /**
     * 查询某个主题下最新的通知
     * @param userId 用户id
     * @param topic 主题
     * @return message
     */
    public Message findLatestNotice(int userId,String topic){
        return messageMapper.selectLatestNotice(userId, topic);
    }

    /**
     * 查询某个主题包含的通知数量
     * @param userId 用户id
     * @param topic 主题哦
     * @return int
     */
    public int findNoticeCount(int userId,String topic){
        return messageMapper.selectNoticeCount(userId, topic);
    }

    /**
     * 查询某个主题未读通知的数
     * @param userId 用户id
     * @param topic 主题
     * @return int
     */
    public int findNoticeUnreadCount(int userId,String topic){
        return messageMapper.selectNoticeUnreadCount(userId, topic);
    }
```

****

### 编写Controller

> ```MessageController```

```java
  /**
     * 查询通知列表
     * @param model model
     * @return String
     */
    @RequestMapping(path = "notice/list",method = RequestMethod.GET)
    public String getNoticeList(Model model){
        User user = hostHolder.getUser();
        //查询评论类的通知
        Message message = messageService.findLatestNotice(user.getId(),TOPIC_COMMENT);
        Map<String,Object> messageVO = new HashMap<>();
        if(!Objects.equals(message,null)){
            messageVO.put("message",message);
            //出去转义字符
            String content = HtmlUtils.htmlUnescape(message.getContent());
            //转对象
            HashMap<String,Object> data = JSONObject.parseObject(content, HashMap.class);
            messageVO.put("user",userService.findUserById((Integer) data.get("userId")));
            messageVO.put("entityType",data.get("entityType"));
            messageVO.put("entityId",data.get("entityId"));
            messageVO.put("postId",data.get("postId"));

            int count = messageService.findNoticeCount(user.getId(),TOPIC_COMMENT);
            messageVO.put("count",count);

            /*未读数*/
            int unread = messageService.findNoticeUnreadCount(user.getId(),TOPIC_COMMENT);
            messageVO.put("unread",unread);

        }
        model.addAttribute("commentNotice",messageVO);
        //查询点赞通知
        message = messageService.findLatestNotice(user.getId(),TOPIC_LIKE);
        messageVO = new HashMap<>();
        if(!Objects.equals(message,null)){
            messageVO.put("message",message);
            //出去转义字符
            String content = HtmlUtils.htmlUnescape(message.getContent());
            //转对象
            HashMap<String,Object> data = JSONObject.parseObject(content, HashMap.class);
            messageVO.put("user",userService.findUserById((Integer) data.get("userId")));
            messageVO.put("entityType",data.get("entityType"));
            messageVO.put("entityId",data.get("entityId"));
            messageVO.put("postId",data.get("postId"));

            int count = messageService.findNoticeCount(user.getId(),TOPIC_LIKE);
            messageVO.put("count",count);

            /*未读数*/
            int unread = messageService.findNoticeUnreadCount(user.getId(),TOPIC_LIKE);
            messageVO.put("unread",unread);

        }
        model.addAttribute("likeNotice",messageVO);
        //查询关注通知
        message = messageService.findLatestNotice(user.getId(),TOPIC_FOLLOW);
        messageVO = new HashMap<>();
        if(!Objects.equals(message,null)){
            messageVO.put("message",message);
            //出去转义字符
            String content = HtmlUtils.htmlUnescape(message.getContent());
            //转对象
            HashMap<String,Object> data = JSONObject.parseObject(content, HashMap.class);
            messageVO.put("user",userService.findUserById((Integer) data.get("userId")));
            messageVO.put("entityType",data.get("entityType"));
            messageVO.put("entityId",data.get("entityId"));
           // messageVO.put("postId",data.get("postId"));

            int count = messageService.findNoticeCount(user.getId(),TOPIC_FOLLOW);
            messageVO.put("count",count);

            /*未读数*/
            int unread = messageService.findNoticeUnreadCount(user.getId(),TOPIC_FOLLOW);
            messageVO.put("unread",unread);

        }
        model.addAttribute("followNotice",messageVO);

        //查询未读消息数量
        int letterUnreadCount = messageService.findLetterUnreadCount(user.getId(),null);
        model.addAttribute("letterUnreadCount",letterUnreadCount);
        int noticeUnreadCount = messageService.findNoticeUnreadCount(user.getId(),null);
        model.addAttribute("noticeUnreadCount",noticeUnreadCount);
        return "/site/notice";
    }
```

> 在显示消息数量通知的同时也需要显示未读通知的数量，所以在之前的方法【getLetterList】中添加如下代码

```java
 int noticeUnreadCount = messageService.findNoticeUnreadCount(user.getId(),null);
        model.addAttribute("noticeUnreadCount",noticeUnreadCount);
```

****

### 处理前端页面

- letter.html

```html
<li class="nav-item">
							<a class="nav-link position-relative" th:href="@{/notice/list}">
								系统通知<span class="badge badge-danger"  th:text="${noticeUnreadCount}"
										  th:if="${noticeUnreadCount!=0}">27</span>
							</a>
						</li>
```

- notice.html

> 模板导入、路径处理略。

```html
	<ul class="nav nav-tabs mb-3">
						<li class="nav-item">
							<a class="nav-link position-relative active" th:href="@{/letter/list}">朋友私信<span
									class="badge badge-danger" th:text="${letterUnreadCount}"
									th:if="${letterUnreadCount!=0}">3
							</span></a>
						</li>
						<li class="nav-item">
							<a class="nav-link position-relative active" th:href="@{/notice/list}">
								系统通知<span class="badge badge-danger"  th:text="${noticeUnreadCount}"
										  th:if="${noticeUnreadCount!=0}">27</span>
							</a>
						</li>
					</ul>
```

> 通知列表

```html
		<!-- 通知列表 -->
				<ul class="list-unstyled">
					<!--评论类i-->
					<li class="media pb-3 pt-3 mb-3 border-bottom position-relative" 
						th:if="${commentNotice.message!=null}">
						<span class="badge badge-danger" th:text="${commentNotice.unread!=0?commentNotice.unread:''}">3
						</span>
						<img src="http://static.nowcoder.com/images/head/reply.png" class="mr-4 user-header" alt="通知图标">
						<div class="media-body">
							<h6 class="mt-0 mb-3">
								<span>评论</span>
								<span class="float-right text-muted font-size-12" 
									  th:text="${#dates.format(commentNotice.message.crearteTime,'yyyy-MM-dd HH:mm:ss')}">2019-04-28 
									14:13:25</span>
							</h6>
							<div>
								<a href="#">
									用户 
									<i th:utext="${commentNotice.user.username}">nowcoder</i>
									评论了你的<b th:text="${commentNotice.entityType==1?'帖子':'回复'}">帖子</b> ...</a>
								<ul class="d-inline font-size-12 float-right">
									<li 
											class="d-inline ml-2"><span class="text-primary">共 <i 
											th:text="${commentNotice.count}">3</i> 条会话
									</span></li>
								</ul>
							</div>
						</div>
					</li>
					<!--点赞类通知-->
					<li class="media pb-3 pt-3 mb-3 border-bottom position-relative" 
						th:if="${likeNotice.message!=null}">
						<span class="badge badge-danger" th:text="${likeNptice.unread!=0?likeNptice.unread:''}">3</span>
						<img src="http://static.nowcoder.com/images/head/like.png" class="mr-4 user-header" alt="通知图标">
						<div class="media-body">
							<h6 class="mt-0 mb-3">
								<span>赞</span>
								<span class="float-right text-muted font-size-12" 
									  th:text="${#dates.format(likeNotice.message.crearteTime,'yyyy-MM-dd HH:mm:ss')}">2019-04-28 14:13:25</span>
							</h6>
							<div>
								<a href="#">
									用户 <i th:utext="${likeNotice.user.username}">nowcoder</i> 
									点赞了你的<b th:text="${likeNotice.entityType==1?'帖子':'回复'}">帖子</b> ...</a>
								<ul class="d-inline font-size-12 float-right">
									<li 
											class="d-inline ml-2"><span class="text-primary">共 <i 
											th:text="${likeNotice.count}">3</i> 条会话
									</span></li>
								</ul>
							</div>
						</div>
					</li>
					<!--关注类通知-->
					<li class="media pb-3 pt-3 mb-3 border-bottom position-relative" 
						th:if="${followNotice.message!=null}">
						<span class="badge badge-danger" th:text="${followNotice.unread!=0?followNotice.unread:''}">3
						</span>
						<img src="http://static.nowcoder.com/images/head/follow.png" class="mr-4 user-header" alt="通知图标">
						<div class="media-body">
							<h6 class="mt-0 mb-3">
								<span>关注</span>
								<span class="float-right text-muted font-size-12" 
									  th:text="${#dates.format(followNotice.message.crearteTime,'yyyy-MM-dd HH:mm:ss')}">2019-04-28 14:13:25</span>
							</h6>
							<div>
								<a href="#">
									用户 <i th:utext="${likeNotice.user.username}">nowcoder</i> 关注了你 ...</a>
								<ul class="d-inline font-size-12 float-right">
									<li 
											class="d-inline ml-2"><span class="text-primary">共 <i 
											th:text="${followNotice.count}">3
									</i> 条会话
									</span></li>
								</ul>
							</div>
						</div>
					</li>					
				</ul>
			</div>
		</div>
```

### 处理通知详情页面

### 编写dao代码

> MessageMapper

```java
 /**
     * c查询某个主题所包含的通知列表
     * @param userId 用户id
     * @param topic 主题
     * @param offset 分页支持
     * @param limit 分页支持
     * @return List
     */
    List<Message> selectNotices(int userId,String topic,int offset,int limit);
```

> message-mapper.xml

```xml
    <select id="selectNotices" resultType="com.nowcoder.community.entity.Message">
        select <include refid="selectFields"/>
        from message
        where status!=2
        and from_id=1
        and to_id = #{userId}
        and conversation_id = #{topic}
        order by create_time desc
        limit #{offset},#{limit}
    </select>
```

****

### 编写Service

> MessageService

```java
    /**
     * 处理通知详情
     * @param userId 用户id
     * @param topic 主题
     * @param offset 分页支持
     * @param limit 分页支持
     * @return list
     */
    public List<Message> findNotices(int userId,String topic,int offset,int limit){
        return messageMapper.selectNotices(userId, topic, offset, limit);
    }
```

****

### 编写Controller

> MessageController

```java
    /**
     * 处理通知详情
     * @param topic 主题
     * @param page 分页
     * @param model 视图
     * @return String
     */
    @RequestMapping(path = "/notice/detail/{topic}",method = RequestMethod.GET)
    public String getNoticeDetail(@PathVariable("topic")String topic,Page page,Model model){
        User user = hostHolder.getUser();
        page.setLimit(5);
        page.setPath("/notice/detail/"+topic);
        page.setRows(messageService.findNoticeCount(user.getId(),topic));
        List<Message> noticeList = messageService.findNotices(user.getId(),topic, page.getOffset(), page.getLimit());
        List<Map<String,Object>> noticeVoList = new ArrayList<>();
        if(!Objects.equals(noticeList,null)){
            for(Message notice : noticeList){
                Map<String,Object> map  = new HashMap<>();
                //通知
                map.put("notice",notice);
                //内容
                String content = HtmlUtils.htmlUnescape(notice.getContent());
                Map<String,Object>data = JSONObject.parseObject(content, Map.class);
                map.put("user",userService.findUserById((Integer) data.get("userId")));
                map.put("entityType",data.get("entityType"));
                map.put("entityId",data.get("entityId"));
                map.put("postId",data.get("postId"));
                //通知的作者
                map.put("fromUser",userService.findUserById(notice.getFromId()));
                noticeVoList.add(map);
            }
        }
        model.addAttribute("notices",noticeVoList);
        //设置已读
        List<Integer> ids = getLetterIds(noticeList);
        if(!ids.isEmpty()){
            messageService.readMessage(ids);
        }
        return "/site/notice-detail";
    }
```

****

### 处理前端页面

> notice.html,修改用户超链接

```html
<a th:href="@{/notice/detail/commment}">
<a th:href="@{/notice/detail/like}">
<a th:href="@{/notice/detail/follow}">
```

****

### 处理导航栏【消息】

> 拦截器

```java
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

        User user  = hostHolder.getUser();
        if(user!=null && modelAndView != null){
            int letterUnreadCount = messageService.findLetterUnreadCount(user.getId(),null);
            int noticeUnreadCount = messageService.findNoticeUnreadCount(user.getId(),null);
            modelAndView.addObject("allUnreadCount",letterUnreadCount+noticeUnreadCount);

        }
    }
```

```java
registry.addInterceptor(messageInterceptor)
        .excludePathPatterns("/**/*.css", "/**/*.js", "/**/*.png", "/**/*.jpg", "/**/*.jpeg");
```

****

### 效果

![](https://images.waer.ltd/img/20220219161938.png)

****

## 搜索功能实现

### 本节目标

> 使用`Elasticsearch`框架完成社区帖子搜索功能。



###  `ElasticSearch`与`SpringBoot`的整合

### 统一版本

> 在进行后续开发之前，需要先解决`SpringBoot`和`ealsticsearch`的版本问题。下面是我的项目中使用的版本信息。

```properties
SpringBoot:2.1.5.RELEASE
ElasticSearch:v6.4.3    
```

关于如何查看自己的`SpringBoot`版本号，可以使用下面的两种方法。

1. 通过项目的`pom.xml`文件查看

> 找到该文件，在文件的开头有下面这样一段配置内容。`<version>`标签里面的就是你的版本号了。

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.1.5.RELEASE</version>
    <relativePath/> 
</parent>
```

2. 通过代码查看

> 你也可以通过运行下面的代码查看版本信息。

```java
String SpVersion = SpringVersion.getVersion();
String SpBootVersion = SpringBootVersion.getVersion();
System.out.println("_______________________________");
System.out.println("spring版本："+SpVersion);
System.out.println("SpringBoot版本："+SpBootVersion);
System.out.println("___________________________________");
```

### 整合配置

> 在项目`application.properties`配置文件中添加如下配置。

```properties
# 配置项目客户端:这里的name就是上面elasticeasrch配置文件中配置的cluster-name
spring.data.elasticsearch.cluster.name=nowcoder
# 配置端口号:
spring.data.elasticsearch.cluster-nodes=127.0.0.1:9300
```

### 开始使用

> 这里直接进行项目的功能开发，关于`elasticseasrch`的具体教程，独立在了另一篇博客里面了。

在开始之前，还需要作一点修改，由于`elasticsearch`底层和`Java`底层都依赖了到了`Netty`框架，在启动`elasticsearch`的时候可能会抛出一个检查异常，该异常是有`Netty`的一个名为`Netty4Utils`的工具类引起的。

解决方式也简单，找到如下的代码块：将箭头所指的处的`true`改为`false`即可，即关闭下面这个检查。

![](https://images.waer.ltd/img/20220323214258.png)

话虽如此，但我们不应该直接在人家的源码里面进行修改。一个可行的方法是在我们项目的启动类中作文章。

```java
@PostConstruct
public void init(){
    //解决Netty启动冲突问题
    // by Netty4Utils.setAvailableProcessors()
    System.getProperty("es.set.netty.runtime.available.processors", "false");
}
```

这里用到了一个`@PostConstruct`注解。这是一个由`Java`自己提供的注解，**用来修饰一个非静态的void方法**。可以用来管理`spring`的生命周期，它会在项目启动时执行，并且在执行`init`初始化方法之前执行，因此可以利用这个注解实现上述的需求。

###  配置映射

我们做帖子的搜索功能，需要将帖子的信息存入到`elasticsearch`中，有两个方法，一个是使用`ElasticsearchTemplate`,要么使用`ElasticsearchRepository`,后者相对比较简单，所以这里优先选择。

另外，还需要做一些配置，告诉`Elasticsearch`，我们的帖子表和它的索引之间的一个什么样的关系，这个表存入`Elasticsearch`中的时候，每个字段对应的什么类型，搜索方式等。

要完成上述这些操作，只需要在对应的帖子实体上加上相关的注解即可。`spring`会将实体数据与`Elasticsearch`中的索引信息进行一个映射。

具体的，首先需要在实体类上加上一个`@Document`注解。如下

```java
@Document(indexName = "discusspost",type = "_doc",shards = 6 ,replicas = 3)
```

> 注解的内容分别对应索引的名称、类型（已逐步废弃）、分片、副本。

完了还需要将实体的每一个属性和`es`中的字段做一个对应关系进行绑定。如下代码

```java
@Id
private int id;

@Field(type = FieldType.Integer)
private int userId;

//analyzer会将搜索的关键词进行一个分词，并且这里设置为最大分词量，尽可能的扩大搜索范围。
//searchAnalyzer = "ik_smart":在搜索时智能的对搜索结果中的关键词进行合理尽可能少的拆分。
@Field(type = FieldType.Text,analyzer = "ik_max_word",searchAnalyzer = "ik_smart")
private String title;

@Field(type = FieldType.Text,analyzer = "ik_max_word",searchAnalyzer = "ik_smart")
private String content;

@Field(type = FieldType.Integer)
private int type;

@Field(type = FieldType.Integer)
private int status;

@Field(type = FieldType.Date)
private Date createTime;

@Field(type = FieldType.Integer)
private int commentCount;

@Field(type = FieldType.Double)
private double score;
```

> 这里主要理解`title`和`content`属性的配置。由于我们在搜索帖子的时候，主要是根据帖子的标题和内容作为搜索关键词进行搜索，因此我们在创建搜索时，应该将该字段对应的搜索关键词尽可能多词条的拆分，便于扩大搜索的范围，所以这里就用到了`analyzer = "ik_max_word"`配置，要求`ik`分词器将文本做最细粒度的拆分。比如
>
> > 将“如何学好编程”拆分为“如何学编程、学好编程、如何学好、学编程、编程、如何等词语。
>
> 而另一个配置`searchAnalyzer = "ik_smart"`的作用则与`ik_max_word`相反，它是会按照最粗粒度的拆分，原理和上面的类似，就不举例了。

### 数据管理

配置完数据映射之后，需要将一个工具类来管理和操作`es`，我们在`dao`下新建一个`elasticsearch`包并在其中新建一个名为`DiscussPostRepository`的接口。

我们可以把`es`也看作是一种特殊的数据库，因此可以用`@Repository`注解去管理，不能用`@Mapper`他是针对`Mybatis`的一个注解。该接口必须继承`SpringBoot`集成的`ElasticsearchRepository<DiscussPost,Integer>`接口，后期只需要直接去调用`es`相关的`API`即可。

### 测试服务

正式使用之前，写了个测试，主要测一下`API`能不能正常使用，是否可以将数据库的数据写入到`es`中,测试类如下：

```java
package com.nowcoder.community;

import com.nowcoder.community.dao.DiscussPostMapper;
import com.nowcoder.community.dao.elasticsearch.DiscussPostRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * @author: Tisox
 * @date: 2022/3/24 14:10
 * @description:
 * @blog:www.waer.ltd
 */
@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
@ContextConfiguration(classes = CommunityApplication.class)
public class ElasticsearchTest {
    @Autowired
    private DiscussPostMapper discussPostMapper;
    @Autowired
    private DiscussPostRepository discussPostRepository;
    @Autowired
    private ElasticsearchTemplate elasticsearchTemplate;

    @Test
    public void testInsert(){
        discussPostRepository.save(discussPostMapper.selectDiscussPostById(241));
        discussPostRepository.save(discussPostMapper.selectDiscussPostById(242));
        discussPostRepository.save(discussPostMapper.selectDiscussPostById(243));
    }
}
```

测试写完，启动测试，结果直接给我抛一堆异常，直接好家伙！！！大概的信息是需要启动`kafka`，因为项目依赖它，好，我启动了`kafka`之后还是报错，不过这回是一个新的错误，说什么我`kafka`远程已被强制关机、连接超时等等，最后改了一下`server.properties`中的如下配置：

![](https://images.waer.ltd/img/20220324153630.png)

嗨，重启之后测试成功跑起来了，问题解决，具体的原因目前尚未可知，先记录一下。

跑完测试之后，在`es`中确实看到有创建了一个指定的索引，效果如下：

![](https://images.waer.ltd/img/20220324153817.png)

数据插入测试结束！下面贴一下其他的CRUD测试代码，主要讲一下搜索。

```java
@Test
public void testInsertList(){
    discussPostRepository.saveAll(discussPostMapper.selectDiscussPosts(103,0,100));
    discussPostRepository.saveAll(discussPostMapper.selectDiscussPosts(138,0,100));
    discussPostRepository.saveAll(discussPostMapper.selectDiscussPosts(132,0,100));
    discussPostRepository.saveAll(discussPostMapper.selectDiscussPosts(133,0,100));
    discussPostRepository.saveAll(discussPostMapper.selectDiscussPosts(134,0,100));
}

@Test
public void testUpdate(){
    DiscussPost post  = discussPostMapper.selectDiscussPostById(231);
    post.setContent("使劲灌水哈哈哈哈哈");
    discussPostRepository.save(post);
}

@Test
public void testDelete(){
    discussPostRepository.deleteById(231);
}

@Test
public void testDeleteAll(){
    discussPostRepository.deleteAll();
}
```

作为一款搜索框架，搜索自然也成了它的核心，下面是搜索的测试代码：

```java
  /**
     * 构建：
     * NativeSearchQueryBuilder是ES提供的一个searchQuery的工具类，可以构建一个NativeSearchQuery的实现类。
     * withQuery：构造搜索条件，这里使用QueryBuilders进行具体的条件构建，multiMatchQuery表示多字段进行搜索，表示从title和content字段进行搜索。
     * withSort：构造排序规则，相应的，使用SortBuilders进行具体排序条件的构建fieldSort("type")表示排序的字段，order(SortOrder.DESC)表示该字段进行一个
     * 倒序排序。
     * withPageable：由于匹配的数据量可能比较大，实际开发中一般不会全部查询，所以这里可以使用该属性进行分页查询
     * PageRequest.of(0,10)，PageRequest用来构建分页条件，这里表示从第几页开始，每页显示多少条数据。
     * withHighlightFields：指定哪些字段/词条作高亮显示。使用HighlightBuilder.Field指定需要高亮显示的字段，对与这些高亮的字段
     * 需要指定一个html标签，比如<em></em>标签，preTags表示前置标签，postTags表示后置标签
     * 在构建完所有的条件之后，使用build()方法直接完成构建即可。
     * ——————————————————————————————————————————————————————————————————————————————————————————————————————————
     * 查询;
     * 在构建完毕之后，直接调用elasticsearchTemplate的queryForPage方法进行查询，查询返回一个page分页对象，封装了查询的数据
     * queryForPage方法需要三个参数。分别是：
     * 1.searchQuery：构建的一个搜索条件对象。
     * 2.DiscussPost.class：查询实体的class。
     * 3.SearchResultMapper:这是一个接口，需要自己实现它，这里作了一个匿名实现，主要的操作也在这个接口方法的实现上体现。
     * SearchHits：得到查询来的多条数据
     *
     */

    @Test
    public void testSearchByTemplate(){
        SearchQuery searchQuery = new NativeSearchQueryBuilder()
                .withQuery(QueryBuilders.multiMatchQuery("互联网寒冬","title","content"))
                .withSort(SortBuilders.fieldSort("type").order(SortOrder.DESC))
                .withSort(SortBuilders.fieldSort("score").order(SortOrder.DESC))
                .withSort(SortBuilders.fieldSort("createTime").order(SortOrder.DESC))
                .withPageable(PageRequest.of(0,10))
                .withHighlightFields(
                        new HighlightBuilder.Field("title").preTags("<em>").postTags("</em>"),
                        new HighlightBuilder.Field("content").preTags("<em>").postTags("</em>")
                ).build();
        Page<DiscussPost> page = elasticsearchTemplate.queryForPage(searchQuery, DiscussPost.class, new SearchResultMapper() {
            @Override
            public <T> AggregatedPage<T> mapResults(SearchResponse searchResponse, Class<T> aClass, Pageable pageable) {
                //得到查询来的多条数据
                SearchHits hits = searchResponse.getHits();
                //判断是否有值，<=0表示没有查到数据，直接return;
                if(hits.getTotalHits()<=0){
                    return null;
                }
                //将查询到的数据封装到一个集合中进行处理返回
                List<DiscussPost> list  = new ArrayList<>();
                //遍历查询命中的数据
                for (SearchHit hit : hits) {
                    DiscussPost post = new DiscussPost();
                    //每得到一个命中数据(它将json->map)，将其包装到实体类中返回
                    String id = hit.getSourceAsMap().get("id").toString();
                    post.setId(Integer.parseInt(id));

                    String userId = hit.getSourceAsMap().get("userId").toString();
                    post.setUserId(Integer.parseInt(userId));

                    String title = hit.getSourceAsMap().get("title").toString();
                    post.setTitle(title);

                    String content = hit.getSourceAsMap().get("content").toString();
                    post.setContent(content);

                    String status = hit.getSourceAsMap().get("status").toString();
                    post.setStatus(Integer.parseInt(status));

                    //ES再处理日期的时候是转为一个long类型的数据进行存储的
                    String createTime = hit.getSourceAsMap().get("createTime").toString();
                    post.setCreateTime(new Date(Long.parseLong(createTime)));

                    String commentCount = hit.getSourceAsMap().get("commentCount").toString();
                    post.setCommentCount(Integer.parseInt(commentCount));
                    /*处理高亮显示的结果*/
                    //如果结果不为空，就将其转为字符串存入实体，注意这个结果集Fragments是一个数组
                    //就是说，我们上面先将查询到的所有数据放到实体中，先面再单独处理其中高亮显示的数据，如果有这些数据，那么就将这些数据对之前的数据
                    //进行一个覆盖即可。
                    HighlightField titleField = hit.getHighlightFields().get("title");
                    if(titleField!=null){
                        post.setTitle(titleField.getFragments()[0].toString());
                    }
                    HighlightField contentField = hit.getHighlightFields().get("content");
                    if(contentField!=null){
                        post.setTitle(contentField.getFragments()[0].toString());
                    }
                    //将处理好的实体放入集合
                    list.add(post);
                }
                //AggregatedPageImpl：传入集合，传入结果，总数据，searchResponse.getScrollId(),对象，
                return new AggregatedPageImpl(list,pageable,hits.getTotalHits(),searchResponse.getScrollId(), hits.getMaxScore());
            }
```

对于搜索功能，`ElasticsearchTemplate`和`DiscussPostRepository`都是可以的，但他们的实现又有一些区别，主要在对搜索结果关键词高亮的处理上。

如果使用的是`DiscussPostRepository`的`search`方法进行搜索实现的化，它底层默认对于高亮的数据是不作返回处理的，也就是会自动去掉`html`标签。如果要实现这个功能，只有重写它的某些方法进行实现，所以这里为了方便，直接使用`ElasticsearchTemplate`提供的`queryForPage`方法来处理。具体的一些使用方法已经写在了注释中，这里就不写了。这样处理之后查询出来返回的数据中，如果有高亮的数据，就会带上标签进行返回，数据返回到浏览器页面之后，就会被当作`html`进行处理，从而实现高亮的效果。

需要注意的是，搜索返回的并不是全部内容进行显示，而是返回其中有关内容的一部分，这是`ES`底层作的处理。

### 实现社区搜索功能

> 基本思路

- 将帖子保存到ES服务器
- 从ES服务器删除帖子
- 从ES服务器搜索帖子
- 发布帖子时，将其异步方式提交到ES服务器
- 增加评论时，执行同上操作
- 在消费组中新增一个方法，消费帖子发布事件
- 在控制器中处理搜索请求，在`HTML`中显示搜索结果。

****

### 编写ElasticsearchService

> 帖子的添加

```java
/**
     * 添加帖子
     * @param post 帖子实体
     */
public void saveDiscussPost(DiscussPost post) {
    discussPostRepository.save(post);
}
```

> 帖子的删除

```java
/**
     * 删除帖子
     * @param id 帖子ID
     */
public void deleteDiscussPost(int id) {
    discussPostRepository.deleteById(id);
}
```

> 搜索帖子，这里直接复用上面测试中的方法，稍作修改即可，所以不再赘述。

```java
/**
     * 实现帖子搜索
     * @param keyworld 搜索关键词
     * @param current  当前时第几页
     * @param limit    每页多少条数据
     * @return 搜索结果
     */
public Page<DiscussPost> searchDiscussPost(String keyworld, int current, int limit) {
    SearchQuery searchQuery = new NativeSearchQueryBuilder()
        .withQuery(QueryBuilders.multiMatchQuery(keyworld, "title", "content"))
        .withSort(SortBuilders.fieldSort("type").order(SortOrder.DESC))
        .withSort(SortBuilders.fieldSort("score").order(SortOrder.DESC))
        .withSort(SortBuilders.fieldSort("createTime").order(SortOrder.DESC))
        .withPageable(PageRequest.of(current, limit))
        .withHighlightFields(
        new HighlightBuilder.Field("title").preTags("<em>").postTags("</em>"),
        new HighlightBuilder.Field("content").preTags("<em>").postTags("</em>")
    ).build();
    return elasticsearchTemplate.queryForPage(searchQuery, DiscussPost.class, new SearchResultMapper() {
        @Override
        public <T> AggregatedPage<T> mapResults(SearchResponse searchResponse, Class<T> aClass, Pageable pageable) {
            //得到查询来的多条数据
            SearchHits hits = searchResponse.getHits();
            //判断是否有值，<=0表示没有查到数据，直接return;
            if (hits.getTotalHits() <= 0) {
                return null;
            }
            //将查询到的数据封装到一个集合中进行处理返回
            List<DiscussPost> list = new ArrayList<>();
            //遍历查询命中的数据
            for (SearchHit hit : hits) {
                DiscussPost post = new DiscussPost();
                //每得到一个命中数据(它将json->map)，将其包装到实体类中返回
                String id = hit.getSourceAsMap().get("id").toString();
                post.setId(Integer.parseInt(id));

                String userId = hit.getSourceAsMap().get("userId").toString();
                post.setUserId(Integer.parseInt(userId));

                String title = hit.getSourceAsMap().get("title").toString();
                post.setTitle(title);

                String content = hit.getSourceAsMap().get("content").toString();
                post.setContent(content);

                String status = hit.getSourceAsMap().get("status").toString();
                post.setStatus(Integer.parseInt(status));

                //ES再处理日期的时候是转为一个long类型的数据进行存储的
                String createTime = hit.getSourceAsMap().get("createTime").toString();
                post.setCreateTime(new Date(Long.parseLong(createTime)));

                String commentCount = hit.getSourceAsMap().get("commentCount").toString();
                post.setCommentCount(Integer.parseInt(commentCount));
                /*处理高亮显示的结果*/
                //如果结果不为空，就将其转为字符串存入实体，注意这个结果集Fragments是一个数组
                //就是说，我们上面先将查询到的所有数据放到实体中，先面再单独处理其中高亮显示的数据，如果有这些数据，那么就将这些数据对之前的数据
                //进行一个覆盖即可。
                HighlightField titleField = hit.getHighlightFields().get("title");
                if (titleField != null) {
                    post.setTitle(titleField.getFragments()[0].toString());
                }
                HighlightField contentField = hit.getHighlightFields().get("content");
                if (contentField != null) {
                    post.setTitle(contentField.getFragments()[0].toString());
                }
                //将处理好的实体放入集合
                list.add(post);
            }
            //AggregatedPageImpl：传入集合，传入结果，总数据，searchResponse.getScrollId(),对象，
            return new AggregatedPageImpl(list, pageable, hits.getTotalHits(), searchResponse.getScrollId(), hits.getMaxScore());
        }
    });
}
```

### 修改DiscussPostController

> 修改其中的`addDiscussPost`方法，添加如下代码：

```java
//触发发帖事件
Event event  = new Event().setTopic(TOP_PUBLISH)
    .setUserId(user.getId())
    .setEntityType(ENTITY_TYPE_POST)
    .setEntityId(post.getId());
eventProducer.fireEvent(event);
```

> 注意引入`eventProducer`对象和在`CommunityConstant`中添加主题`TOP_PUBLISH`。



> 当我们评论帖子的时候，就会修改帖子的评论数量，此时就还有触发一次上诉事件，从而覆盖`ES`中的数据。所以接下来处理发布评论的功能，在其中添加如下代码，实现帖子发布之后触发`ES`中的发帖事件。
>
> 注意在触发之前先进行一个判断，只有当发布的是帖子类型才触发。

```java
if(comment.getEntityType() ==ENTITY_TYPE_POST){
    event  = new Event().setTopic(TOP_PUBLISH)
        .setUserId(comment.getEntityId())
        .setEntityType(ENTITY_TYPE_POST)
        .setEntityId(discussPostId);
    eventProducer.fireEvent(event);
}
```



> 接下来对消费者进行处理。添加如下方法

```java
/**
     * 消费发帖事件
     * @param record
     */
@KafkaListener(topics = {TOP_PUBLISH})
public void handlePublishMessage(ConsumerRecord record){
    if(Objects.equals(record,null) || Objects.equals(record.value(),null)){
        logger.error("消息的内容为空！");
        return;
    }
    Event event = JSONObject.parseObject(record.value().toString(),Event.class);
    DiscussPost post = discussPostService.findDiscussPostById(event.getEntityId());
    elasticsearchService.saveDiscussPost(post);
}
```



> 添加一个`Controller`，处理搜索页面数据，纤细注释

```java
package com.nowcoder.community.controller;
import com.nowcoder.community.entity.DiscussPost;
import com.nowcoder.community.entity.Page;
import com.nowcoder.community.service.DiscussPostService;
import com.nowcoder.community.service.ElasticsearchService;
import com.nowcoder.community.service.LikeService;
import com.nowcoder.community.service.UserService;
import com.nowcoder.community.utils.CommunityConstant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author: Tisox
 * @date: 2022/3/26 20:15
 * @description: 搜索帖子实现
 * @blog:www.waer.ltd
 */
@Controller
public class SearchController implements CommunityConstant {
    @Autowired
    private DiscussPostService discussPostService;
    @Autowired
    private ElasticsearchService elasticsearchService;
    @Autowired
    private UserService userService;
    @Autowired
    LikeService likeService;

    /**
     * 搜索帖子
     * @param keyworld 搜索关键词，路径：search?keyworld=xxxx
     * @param page
     * @param model
     * @return
     */
    @RequestMapping(path = "/search",method = RequestMethod.GET)
    public String search(String keyword, Page page, Model model){
        //搜索帖子
        org.springframework.data.domain.Page<DiscussPost> searchResult= elasticsearchService.searchDiscussPost(keyword,page.getCurrent()-1, page.getLimit());
        //注意搜索出来的只是帖子的实体，我们还需要查询用户以及点赞的信息
        List<Map<String,Object>> discussPosts  = new ArrayList<>();
        if(searchResult!=null){
            for(DiscussPost post:searchResult){
                Map<String,Object> map = new HashMap<>();
                //帖子
                map.put("post",post);
                //作者
                map.put("user",userService.findUserById(post.getId()));
                //点赞数
                map.put("likeCount",likeService.findEntityLikeCount(ENTITY_TYPE_POST, post.getId()));

                discussPosts.add(map);
            }
        }
        model.addAttribute("discusspPosts",discussPosts);
        //传回页面显示时，带上搜索的关键词
        model.addAttribute("keyworld",keyworld);
        //分页信息
        page.setPath("/search?keyword=" + keyworld);
        page.setRows(searchResult==null?0:(int)searchResult.getTotalElements());

        return "/site/search";
    }
}
```



> 静态页面处理：`index.html`中，搜索框部分作如下修改。

```html
<!-- 搜索 -->
<form class="form-inline my-2 my-lg-0" method="get" th:action="@{/search}">
    <input class="form-control mr-sm-2" type="search" aria-label="Search" name="keyword" 
           value="${keyword}"/>
    <button class="btn btn-outline-light my-2 my-sm-0" type="submit">搜索</button>
</form>
```

> 当然，搜索页面`search.html`也需要处理，全文如下：

```html
<!doctype html>
<html lang="en"  xmlns:th="http://www.thymeleaf.org">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="icon" href="https://static.nowcoder.com/images/logo_87_87.png"/>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
        <link rel="stylesheet" th:href="@{/css/global.css}" />
        <title>牛客网-搜索结果</title>
    </head>
    <body>
        <div class="nk-container">
            <!-- 头部 -->
            <header class="bg-dark sticky-top" th:replace="index::header">
                <div class="container">
                    <!-- 导航 -->
                    <nav class="navbar navbar-expand-lg navbar-dark">
                        <!-- logo -->
                        <a class="navbar-brand" href="#"></a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <!-- 功能 -->
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav mr-auto">
                                <li class="nav-item ml-3 btn-group-vertical">
                                    <a class="nav-link" href="../index.html">首页</a>
                                </li>
                                <li class="nav-item ml-3 btn-group-vertical">
                                    <a class="nav-link position-relative" href="letter.html">消息<span class="badge badge-danger">12</span></a>
                                </li>
                                <li class="nav-item ml-3 btn-group-vertical">
                                    <a class="nav-link" href="register.html">注册</a>
                                </li>
                                <li class="nav-item ml-3 btn-group-vertical">
                                    <a class="nav-link" href="login.html">登录</a>
                                </li>
                                <li class="nav-item ml-3 btn-group-vertical dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img src="http://images.nowcoder.com/head/1t.png" class="rounded-circle" style="width:30px;"/>
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a class="dropdown-item text-center" href="profile.html">个人主页</a>
                                        <a class="dropdown-item text-center" href="setting.html">账号设置</a>
                                        <a class="dropdown-item text-center" href="login.html">退出登录</a>
                                        <div class="dropdown-divider"></div>
                                        <span class="dropdown-item text-center text-secondary">nowcoder</span>
                                    </div>
                                </li>
                            </ul>
                            <!-- 搜索 -->
                            <form class="form-inline my-2 my-lg-0" method="get" th:action="@{/search}">
                                <input class="form-control mr-sm-2" type="search" aria-label="Search" name="keyword"
                                       th:value="${keyword}"/>
                                <button class="btn btn-outline-light my-2 my-sm-0" type="submit">搜索</button>
                            </form>
                        </div>
                    </nav>
                </div>
            </header>

            <!-- 内容 -->
            <div class="main">
                <div class="container">
                    <h6><b class="square"></b> 相关帖子</h6>
                    <!-- 帖子列表 -->
                    <ul class="list-unstyled mt-4" >
                        <li class="media pb-3 pt-3 mb-3 border-bottom" th:each="map:${discussPosts}">
                            <img th:src="${map.user.headerUrl}" class="mr-4 rounded-circle" alt="用户头像"
                                 style="width: 50px;height: 50px">
                            <div class="media-body">
                                <h6 class="mt-0 mb-3">
                                    <a th:href="@{|/discuss/detail/${map.post.id}|}" th:utext="${map.post.title}">备战<em>春招
                                        </em>
                                        ，面试刷题跟他复习，一个月全搞定！</a>
                                </h6>
                                <div class="mb-3" th:utext="${map.post.content}">
                                    金三银四的金三已经到了，你还沉浸在过年的喜悦中吗？ 如果是，那我要让你清醒一下了：目前大部分公司已经开启了内推，正式网申也将在3月份陆续开始，金三银四，<em>春招</em>的求职黄金时期已经来啦！！！ 再不准备，作为19应届生的你可能就找不到工作了。。。作为20届实习生的你可能就找不到实习了。。。 现阶段时间紧，任务重，能做到短时间内快速提升的也就只有算法了， 那么算法要怎么复习？重点在哪里？常见笔试面试算法题型和解题思路以及最优代码是怎样的？ 跟左程云老师学算法，不仅能解决以上所有问题，还能在短时间内得到最大程度的提升！！！
                                </div>
                                <div class="text-muted font-size-12">
                                    <u class="mr-3" th:utext="${map.user.username}">寒江雪</u>
                                    发布于 <b th:text="${#dates.format(map.post.createTime,'yyyy-MM-dd:HH:mm:ss')}">2019-04-15
                                    15:32:18</b>
                                    <ul class="d-inline float-right">
                                        <li class="d-inline ml-2">赞 <i th:text="${map.likeCount}"></i></li>
                                        <li class="d-inline ml-2">|</li>
                                        <li class="d-inline ml-2">回复 <i th:text="${map.post.commentCount}"></i></li>
                                    </ul>
                                </div>
                            </div>
                        </li>

                    </ul>
                    <!-- 分页 -->
                    <nav class="mt-5" th:replace="index::pagination">
                        <ul class="pagination justify-content-center">
                            <li class="page-item"><a class="page-link" href="#">首页</a></li>
                            <li class="page-item disabled"><a class="page-link" href="#">上一页</a></li>
                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item"><a class="page-link" href="#">4</a></li>
                            <li class="page-item"><a class="page-link" href="#">5</a></li>
                            <li class="page-item"><a class="page-link" href="#">下一页</a></li>
                            <li class="page-item"><a class="page-link" href="#">末页</a></li>
                        </ul>
                    </nav>
                </div>
            </div>

            <!-- 尾部 -->
            <footer class="bg-dark">
                <div class="container">
                    <div class="row">
                        <!-- 二维码 -->
                        <div class="col-4 qrcode">
                            <img src="https://uploadfiles.nowcoder.com/app/app_download.png" class="img-thumbnail" style="width:136px;" />
                        </div>
                        <!-- 公司信息 -->
                        <div class="col-8 detail-info">
                            <div class="row">
                                <div class="col">
                                    <ul class="nav">
                                        <li class="nav-item">
                                            <a class="nav-link text-light" href="#">关于我们</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link text-light" href="#">加入我们</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link text-light" href="#">意见反馈</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link text-light" href="#">企业服务</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link text-light" href="#">联系我们</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link text-light" href="#">免责声明</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link text-light" href="#">友情链接</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <ul class="nav btn-group-vertical company-info">
                                        <li class="nav-item text-white-50">
                                            公司地址：北京市朝阳区大屯路东金泉时代3-2708北京牛客科技有限公司
                                        </li>
                                        <li class="nav-item text-white-50">
                                            联系方式：010-60728802(电话)&nbsp;&nbsp;&nbsp;&nbsp;admin@nowcoder.com
                                        </li>
                                        <li class="nav-item text-white-50">
                                            牛客科技©2018 All rights reserved
                                        </li>
                                        <li class="nav-item text-white-50">
                                            京ICP备14055008号-4 &nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="http://static.nowcoder.com/company/images/res/ghs.png" style="width:18px;" />
                                            京公网安备 11010502036488号
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>

        <script src="https://code.jquery.com/jquery-3.3.1.min.js" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" crossorigin="anonymous"></script>
        <script th:src="@{/js/global.js}"></script>
    </body>
</html>
```



### 功能展示

![](https://images.waer.ltd/img/20220326223526.png)

****

## 权限控制

###  本节目录

- 登录检查
  - 废弃之前采用的拦截器实现的登录检查。
- 授权配置
  - 对当前系统内包含的所有的请求，分配访问权限(普通用户、版主、管理员)
- 认证方案
  - 绕过`Security`认证流程，采用系统原来的认证方案。
- `CSRF`配置
  - 防止`CSRF`攻击的基本原理，以及表单、`AJAX`相关的配置。

### 准备

- 导入依赖

```xml
<!--Spring Security-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

- 弃用之前的拦截器配置

> 在`WebMvcConfig`中将与登录拦截相关的配置注释掉。

```java
package com.nowcoder.community.config;

import com.nowcoder.community.controller.interceptor.AlphaInterceptor;
import com.nowcoder.community.controller.interceptor.LoginRequiredInterceptor;
import com.nowcoder.community.controller.interceptor.LoginTicketInterceptor;
import com.nowcoder.community.controller.interceptor.MessageInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author: Tisox
 * @date: 2022/1/10 20:51
 * @description:
 * @blog:www.waer.ltd
 */


@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Autowired
    private AlphaInterceptor alphaInterceptor;
    @Autowired
    private LoginTicketInterceptor loginTicketInterceptor;
    //    @Autowired
    //    private LoginRequiredInterceptor loginRequiredInterceptor;
    @Autowired
    private MessageInterceptor messageInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(alphaInterceptor).excludePathPatterns("/**/*.css","/**/*.js","/**/*.png","/**/*.jpg",
                                                                      "/**/*.jpeg")
            .addPathPatterns("/register","/login");

        registry.addInterceptor(loginTicketInterceptor)
            .excludePathPatterns("/**/*.css", "/**/*.js", "/**/*.png", "/**/*.jpg", "/**/*.jpeg");
        //        registry.addInterceptor(loginRequiredInterceptor)
        //                .excludePathPatterns("/**/*.css", "/**/*.js", "/**/*.png", "/**/*.jpg", "/**/*.jpeg");
        registry.addInterceptor(messageInterceptor)
            .excludePathPatterns("/**/*.css", "/**/*.js", "/**/*.png", "/**/*.jpg", "/**/*.jpeg");
    }
}
```

### 授权配置

由于系统需要，先在常量接口中声明所需的角色名称常量，方便后面使用。找到`CommunityConstant`接口，添加如下代码；

```java
/**
     * 权限：普通用户
     */
String AUTHORITY_USER = "user";  

/**
     * 权限：管理员
     */
String AUTHORITY_ADMIN = "admin"; 

/**
     * 权限：普通用户
     */
String AUTHORITY_MODERATOR = "moderator";
```

在`Config`中创建一个`SecurityConfig`类，配置权限拦截信息:附带注释

```java
package com.nowcoder.community.config;

import com.nowcoder.community.utils.CommunityConstant;
import com.nowcoder.community.utils.CommunityUtil;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * @author: Tisox
 * @date: 2022/3/28 20:49
 * @description: Security配置类
 * @blog:www.waer.ltd
 */

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter implements CommunityConstant {
    /**
     *.ignoring() .antMatchers("/resources/**")：忽略指定资源路径
     *该路径下的资源访问将不受权限限制
     * @param web web
     * @throws Exception ex
     */
    @Override
    public void configure(WebSecurity web) throws Exception {
        web
            .ignoring()
            .antMatchers("/resources/**");
    }

    /**
     * 执行授权
     * @param http http
     * @throws Exception ex
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
            .antMatchers("/user/setting","/user/upload","/discuss/add","/comment/add/**","/letter/**","notice/**"
                         ,"like","/follow","unfollow")
            .hasAnyAuthority(AUTHORITY_USER,AUTHORITY_ADMIN,AUTHORITY_MODERATOR)
            .anyRequest().permitAll();
        //权限不够时的处理
        http
            .exceptionHandling()
            .authenticationEntryPoint(new AuthenticationEntryPoint() {
                /**
                     * 没有登录时候的处理,由于需要考虑异步请求返回的数据类型，我们不能直接使用html页面跳转的方式进行统一处理
                     * @param httpServletRequest hsr
                     * @param httpServletResponse hsrp
                     * @param e e
                     * @throws IOException ie
                     * @throws ServletException se
                     */
                @Override
                public void commence(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
                    //判断请求类型:
                    //通过查看请求头[x-requested-with]返回的字段类型进行检查判断
                    //如果返回是[XMLHttpRequest]，说明该请求返回的内容是非html，通过[httpServletResponse]作一个回写操作提示
                    //一般返回状态码为403标识权限不足。
                    //否则直接进行重定向到登录页强制引导登录
                    String xRequestedWith = httpServletRequest.getHeader("x-requested-with");
                    if("XMLHttpRequest".equals(xRequestedWith)){
                        httpServletResponse.setContentType("application/plain;charset=utf-8");
                        PrintWriter writer = httpServletResponse.getWriter();
                        writer.write(CommunityUtil.getJSONString(403,"请登录后操作！"));
                    }else {
                        httpServletResponse.sendRedirect(httpServletRequest.getContextPath() + "/login");
                    }
                }
            })
            .accessDeniedHandler(new AccessDeniedHandler() {
                /**
                     * 权限不足的处理
                     * @param httpServletRequest httpServletRequest
                     * @param httpServletResponse httpServletResponse
                     * @param e E
                     * @throws IOException ie
                     * @throws ServletException se
                     */
                @Override
                public void handle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AccessDeniedException e) throws IOException, ServletException {

                    String xRequestedWith = httpServletRequest.getHeader("x-requested-with");
                    if("XMLHttpRequest".equals(xRequestedWith)){
                        httpServletResponse.setContentType("application/plain;charset=utf-8");
                        PrintWriter writer = httpServletResponse.getWriter();
                        writer.write(CommunityUtil.getJSONString(403,"权限不足！"));
                    }else {
                        //重定向到权限不足到404页面
                        httpServletResponse.sendRedirect(httpServletRequest.getContextPath() + "/denied");
                    }
                }
            });
        /**
         * Security底层默认会拦截/logout请求进行处理
         * 覆盖它默认的逻辑，才能执行我们自己的退出代码
         * 这里通过覆盖一个不存在的退出的拦截路径，从而绕开它的默认拦截，走我们自己的退出逻辑
         */
        http
            .logout()
            .logoutUrl("/securitylogout");
    }
}
```

### 绕开Security的登录认证

在`UserService`中添加一个方法，用来获取用户的权限。

```java
/**
     * 获取用户对应的权限
     * @param userId 用户id
     * @return Collection
     */
public Collection<? extends GrantedAuthority> getAuthorities(int userId){
    User user =this.findUserById(userId);
    List<GrantedAuthority> list = new ArrayList<>();
    list.add(new GrantedAuthority() {
        @Override
        public String getAuthority() {
            switch (user.getType()){
                case 1:
                    return AUTHORITY_ADMIN;
                case 2 :
                    return AUTHORITY_MODERATOR;
                default :
                    return AUTHORITY_USER;
            }
        }
    });
    return list;
}
```

由于我们不需要通过`Security`来作用户认证，所以直接将我们自己的认证结果存入`SecurityContext`中进行授权即可。因此，在`LoginTicketInterceptor`中的`preHandle`方法中作如下处理。

```java
/*构建用户认证的结果并存入SecurityContext,便于Security进行授权*/
Authentication authentication = new UsernamePasswordAuthenticationToken(
    user,user.getPassword(),userService.getAuthorities(user.getId()));
SecurityContextHolder.setContext(new SecurityContextImpl(authentication));
```

在`afterCompletion`中也需要将`Context`的内容清理掉。

```java
SecurityContextHolder.clearContext();
```

同时，退出时也应该将认证信息进行清理,找到`logout`方法添加上面的代码即可。

###  `CSRF`配置

> `CSRF`[百度百科](https://baike.baidu.com/item/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0/13777878?fromtitle=CSRF&fromid=2735433&fr=aladdin)

在`Security`中，我们提交表单时，它会在其中嵌入一个隐藏的`input`域，包含了一个随机的加密凭证`TOKEN`。该凭证每次都是不一样的，在服务器端，它会对用户的凭证进行一个双向的检查，如果缺少其中一项，表示认证不通过，不给予提交，从而在一定程度上可以避免`CSRF`的攻击。

但正在方式也有它的局限性，它依赖于我们的提交表单，所以如果时异步提交的请求，并且没有表单时，这种方式就没什么作用了。但既然没有表单，我们可以通过其他的方式将该token传入，然后进行获取即可，具体的，项目中的发帖就是一个异步的请求操作，我们可以在html中的<meta>标签中携带`TOKEN`:

```html
<!--访问该页面时，在此处生成CSRF令牌-->
<meta name="_csrf" th:content="${_csrf.token}">
<meta name="_csrf_header" th:content="${_scrf.headerName}">
```

同时，还需要在对应的`js`中作如下处理:

```javascript
//发生请求之前，将CSRF令牌这设置到请求的消息头中
var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");
$(document).ajaxSend(function( e,xhr,options) {
    xhr.setRequestHeader(header,token);
})
```

> 注意，上面的这两步操作，需要在所有的异步请求中进行处理。

当然，你也可以禁用掉`CSRF`检查，具体在授权配置中的`protected void configure(HttpSecurity http) `中追加如下内容即可。

```java
.and().csrf().disable();
```

![](https://images.waer.ltd/img/20220329163139.png)

****

## 帖子加精、置顶权限

###  本节目录

- 功能实现
  - 点击置顶、修改帖子类型
  - 点击加精、删除、修改贴子状态
- 权限管理
  - 版主可以执行置顶、加精操作
  - 管理员可以执行删除操作

****

由于需要根据不同的角色对操作按钮进行不同的显示，这需要用到`thymeleaf`的一个工具包，地址如下：

[thymeleaf-extras-springsecurity](https://github.com/thymeleaf/thymeleaf-extras-springsecurity)

```xml
<!-- https://mvnrepository.com/artifact/org.thymeleaf.extras/thymeleaf-extras-springsecurity5 -->
<dependency>
    <groupId>org.thymeleaf.extras</groupId>
    <artifactId>thymeleaf-extras-springsecurity5</artifactId>
    <version>3.0.4.RELEASE</version>
</dependency>
```

### 对帖子的操作

> 完成帖子的置顶、加精、删除。

### 处理`DiscussPostMapper`

帖子的置顶、加精和删除，本质上就是修改帖子的状态和类型，具体含义如下：

**对于帖子的类型**：

| 标识 | 含义   |
| ---- | ------ |
| 0    | 普通帖 |
| 1    | 置顶帖 |

**对于帖子的状态**：

| 标识 | 含义         |
| ---- | ------------ |
| 0    | 正常帖       |
| 1    | 精华帖       |
| 2    | 拉黑(删除帖) |

明确了含义之后，在`DiscussPostMapper`中添加两个方法，分别修改帖子的类型和状态；

```java
int updateType(int id,int type);
int updateStatus(int id,int status);
```

对应的`SQL`：

```java
<!--帖子加精置顶相关-->
    <update id="updateType">
    update discuss_post set type=#{type} where id = #{id}
</update>

    <update id="updateStatus">
    update discuss_post set status=#{status} where id = #{id}
</update>
```

### 处理`DiscussPostService`

在`Service`中添加以下两个业务方法：

```java
/**
     * 修改帖子类型
     * @param id 帖子id
     * @param type 帖子类型
     * @return int
     */
public int updateType(int id,int type){
    return discussPostMapper.updateType(id, type);
}

/**
     * 修改贴子状态
     * @param id id
     * @param status status
     * @return int
     */
public int updateStatus(int id,int status){
    return discussPostMapper.updateStatus(id, status);
}
```

### 处理`DiscussPostController`

处理不同业务方法请求

```java
/**
     * 置顶操作
     * @param id 帖子id
     * @return String
     */
@RequestMapping(path = "/top",method = RequestMethod.POST)
@ResponseBody
public String setTop(int id){
    discussPostService.updateType(id,1);
    //同步数据到elasticsearch服务器
    //触发发帖事件
    Event event  = new Event().setTopic(TOP_PUBLISH)
        .setUserId(hostHolder.getUser().getId())
        .setEntityType(ENTITY_TYPE_POST)
        .setEntityId(id);
    eventProducer.fireEvent(event);
    return CommunityUtil.getJSONString(0);
}
/**
     * 帖子加精
     * @param id
     * @return
     */
@RequestMapping(path = "/wonderful",method = RequestMethod.POST)
@ResponseBody
public String setWonderful(int id){
    discussPostService.updateStatus(id,1);
    //同步数据到elasticsearch服务器
    //触发发帖事件
    Event event  = new Event().setTopic(TOP_PUBLISH)
        .setUserId(hostHolder.getUser().getId())
        .setEntityType(ENTITY_TYPE_POST)
        .setEntityId(id);
    eventProducer.fireEvent(event);
    return CommunityUtil.getJSONString(0);
}

/**
     * 删除帖子
     * @param id
     * @return
     */
@RequestMapping(path = "/delete",method = RequestMethod.POST)
@ResponseBody
public String setDelete(int id){
    discussPostService.updateStatus(id,2);
    //同步数据状态到elasticsearch服务器
    //触发删帖事件
    Event event  = new Event().setTopic(TOP_DELETE)
        .setUserId(hostHolder.getUser().getId())
        .setEntityType(ENTITY_TYPE_POST)
        .setEntityId(id);
    eventProducer.fireEvent(event);
    return CommunityUtil.getJSONString(0);
}
```

需要注意的是，我们在修改了帖子的状态或者类型之后，需要将该数据更新到`Elasticsearch`服务器中，以便于查询功能的需要。还有，这里需要对帖子进行删除，但是之前并没有添加帖子的删除主题和消费行为，所以需要在

`CommunityConstant`中新增一个主题：

```java
/**
     * 主题：删帖
     */
String TOP_DELETE = "delete";
```

在`EventConsumer`中添加帖子对应的消费事件：

```java
/**
     * 消费删帖事件
     * @param record
     */
@KafkaListener(topics = {TOP_DELETE})
public void handleDeleteMessage(ConsumerRecord record){
    if(Objects.equals(record,null) || Objects.equals(record.value(),null)){
        logger.error("消息的内容为空！");
        return;
    }
    Event event = JSONObject.parseObject(record.value().toString(),Event.class);
    if(event==null){
        logger.error("消息格式错误！");
        return;
    }
    elasticsearchService.deleteDiscussPost(event.getEntityId());
}
```

### 处理前端页面`discuss-detail.html`

异步请求触发上述功能并做出不同的显示逻辑：

```html
<!-- 标题 -->
<h6 class="mb-4">
    <img src="http://static.nowcoder.com/images/img/icons/ico-discuss.png"/>
    <span th:utext="${post.title}">备战春招，面试刷题跟他复习，一个月全搞定！</span>
    <div class="float-right">
        <input type="hidden" id="postId" th:value="${post.id}">
        <button type="button" class="btn btn-danger btn-sm" id="topBtn" th:disabled="${post.type==1}">置顶
        </button>
        <button type="button" class="btn btn-danger btn-sm" id="wonderfulBtn"
                th:disabled="${post.status==1}">加精
        </button>
        <button type="button" class="btn btn-danger btn-sm" id="deleteBtn"
                th:disabled="${post.status==2}">删除</button>
    </div>
</h6>
```

> 处理帖子的时候，我们需要传入一个帖子的`ID`作为参数，所以可以在该页面中通过一个`input`隐藏域携带一个帖子`id`,在异步`JS`中进行处理。同时做好不同功能按钮的不同状态的显示判断；

### 处理`discuss.js`

```javascript
//在页面加载结束之后，调用对应的方法触发不同的功能请求
$(function (){
    $("#topBtn").click(setTop);
    $("#wonderfulBtn").click(setWonderful);
    $("#deleteBtn").click(setDelete);
})
//帖子的加精、置顶、删除方法
/*置顶*/
function setTop(){
    $.post(
        CONTEXT_PATH + "/discuss/top",
        {"id":$("#postId").val()},
        function (data){
            data = $.parseJSON(data);
            if(data.code === 0){
                $("#topBtn").attr("disabled","disabled");
            }else{
                alert(data.msg);
            }
        }
    )
}
/*加精*/
function setWonderful(){
    $.post(
        CONTEXT_PATH + "/discuss/wonderful",
        {"id":$("#postId").val()},
        function (data){
            data = $.parseJSON(data);
            if(data.code === 0){
                $("#wonderfulBtn").attr("disabled","disabled");
            }else{
                alert(data.msg);
            }
        }
    )
}

/*删贴*/
function setDelete(){
    $.post(
        CONTEXT_PATH + "/discuss/delete",
        {"id":$("#postId").val()},
        function (data){
            data = $.parseJSON(data);
            if(data.code === 0){
               location.href = CONTEXT_PATH+"/index";
            }else{
                alert(data.msg);
            }
        }
    )
}
```

> JS中具体的逻辑就不解释了，都是基础的用法。

接下来进行测试，通过之后可以继续下一个业务，权限管理；

### 角色分权

这部分的实现相对比较简单了，因为前面以及配置好了`SecurityCongig`的大部分内容，这里实现不同角色用户分配不同的权限，只需要在配置中添加对应的资源路径和匹配的权限即可，具体的，在配置文件中找到如下方法：

![](https://images.waer.ltd/img/20220330102804.png)

**红色区域为需要添加的配置，摘录如下**

```java
 .antMatchers("/discuss/top","/discuss/wonderful")
                .hasAnyAuthority(AUTHORITY_MODERATOR)
                .antMatchers("/discuss/delete")
                .hasAnyAuthority(AUTHORITY_ADMIN)
```

既然不同的角色所拥有的权限不同，从而他们能操作的功能也不一样，那么可以在页面上将每一种角色对应的功能按钮进行显示即可，否则作隐藏处理，优化用户体验。

具体的，我们需要用到上面提到的`thymeleaf-extras-springsecurity`模板，在页面相应的位置通过权限进行判断做出显示与隐藏功能。在模板的文档中有这样的说明：

![image-20220330103238129](https://images.waer.ltd/img/image-20220330103238129.png)

我们只需要在有需要的页面中通过以上方式引入它的命名空间，再以`sec:`前缀开头进行使用即可。在`discuss-detail.html`中

![](https://images.waer.ltd/img/20220330103539.png)

### 效果展示

- 普通用户不作任何显示

![](https://images.waer.ltd/img/20220330103932.png)



- 版主显示**加精**和**置顶**按钮

![](https://images.waer.ltd/img/20220330103818.png)



- 管理员显示**删除**按钮

![](https://images.waer.ltd/img/20220330104534.png)

****

## 网站UV与DAV

### 本节目录

> 实现网站数据的统计，主要有`UV`、`DAU`的统计。

- `UV`(Unique Visitor)

独立访客，需要通过用户`IP`排重统计数据，每次访问都进行一次统计，使用`Redis`中的`HyperLogLog`进行实现。

- `DAU`(Daily Active User)

日活跃用户，通过用户`ID`进行排重统计数据，这里的日活跃的定义没有一个固定不变的标准，这里定义只要访问过网站一次就算为活跃，使用`Redis`中的`BitMap`实现。

###  配置`Redis`

添加两个key，分别用来统计`UV`和`DAU`.

```java
/*统计UV*/
private static final String PREFIX_UV ="uv";
/*统计DAU*/
private static final String PREFIX_DAU = "dau";
```

编写对应key的获取方法，包括日数据和区间数据的统计。

```java
/**
     * 获取单日UV信息
     * @param date 日期
     * @return 字符串
     */
public static String getUVKey(String date){
    return PREFIX_UV + SPLIT + date;
}

/**
     * 获取区间UV信息
     * @param startdate 开始日期
     * @param endDate 结束日期
     * @return 字符串
     */
public static String getUVKey(String startdate,String endDate){
    return PREFIX_UV + SPLIT + startdate + SPLIT + endDate;
}

/**
     * 获取日DAU信息
     * @param date 日期
     * @return 字符串
     */
public static String getDAUKey(String date){
    return PREFIX_DAU+ SPLIT + date;
}

/**
     * 获取区间DAU信息
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @return 字符串
     */
public static String getDAUKey(String startDate,String endDate){
    return PREFIX_DAU+ SPLIT + startDate + SPLIT + endDate;
}
```

### 编写Service

> 实现具体的统计功能。

```java
/**
     * 统计指定范围UV
     * @param start 开始日期
     * @param end 结束日期
     * @return LONG
     */
public long calculateUV(Date start,Date end){
    //日期参数判断
    if(start == null || end==null){
        throw new IllegalArgumentException("日期参数不能为空！");
    }
    //整理日期范围内的key
    ArrayList<String> keyList = new ArrayList<>();
    Calendar calendar = Calendar.getInstance();
    calendar.setTime(start);
    //对结束日期的处理：时间小于等于end
    while (!calendar.getTime().after(end)){
        String key = RedisKeyUtil.getUVKey(df.format(calendar.getTime()));
        keyList.add(key);
        //往后加一天
        calendar.add(Calendar.DATE,1);
    }
    //合并这些数据
    String redisKey = RedisKeyUtil.getUVKey(df.format(start), df.format(end));
    redisTemplate.opsForHyperLogLog().union(redisKey,keyList.toArray());
    //返回统计结果
    return redisTemplate.opsForHyperLogLog().size(redisKey);
}

/**
     * 统计单日DUAU数据
     * @param userId 用户ID
     */
public void recordDAU(int userId){
    String redisKey = RedisKeyUtil.getDAUKey(df.format(new Date()));
    redisTemplate.opsForValue().setBit(redisKey,userId,true);
}

/**
     * 统计区间DAU数据
     * @param start 开始日期
     * @param end 结束日期
     * @return 字符串
     */
public long calculateDAU(Date start,Date end){
    //日期参数判断
    if(start == null || end==null){
        throw new IllegalArgumentException("日期参数不能为空！");
    }
    //整理日期范围内的key
    List<byte[]> keyList = new ArrayList<>();
    Calendar calendar = Calendar.getInstance();
    calendar.setTime(start);
    //对结束日期的处理：时间小于等于end
    while (!calendar.getTime().after(end)){
        String key = RedisKeyUtil.getDAUKey(df.format(calendar.getTime()));
        keyList.add(key.getBytes());
        //往后加一天
        calendar.add(Calendar.DATE,1);
    }
    //进行OR运算
    return (long) redisTemplate.execute(new RedisCallback() {
        @Override
        public Object doInRedis(RedisConnection connection) throws DataAccessException {
            String redisKey = RedisKeyUtil.getDAUKey(df.format(start), df.format(end));
            connection.bitOp(RedisStringCommands.BitOperation.OR,redisKey.getBytes(),
                             keyList.toArray(new byte[0][0]));
            return connection.bitCount(redisKey.getBytes());
        }
    });
}
```

### 编写`DataInterceptor`

> 只要用户访问了网站，必然会先经过请求路径，所以可以再拦截器中处理，进行访问数据的统计。

```java
package com.nowcoder.community.controller.interceptor;

import com.nowcoder.community.entity.User;
import com.nowcoder.community.service.DataService;
import com.nowcoder.community.utils.HostHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author: Tisox
 * @date: 2022/3/30 20:52
 * @description:
 * @blog:www.waer.ltd
 */
@Component
public class DataInterceptor implements HandlerInterceptor {
    @Autowired
    private DataService dataService;
    @Autowired
    private HostHolder hostHolder;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        /*统计UV*/
        //获取IP
        String  ip = request.getRemoteHost();
        dataService.recordUV(ip);
        //统计DAU
        User user = hostHolder.getUser();
        if(user != null){
            dataService.recordDAU(user.getId());
        }
        return true;
    }
}
```

将上述的拦截器添加到`WebMvcConfig`中，路径与之前的相同。

### 编写`Controller`

> 处理统计数据的页面，请求等。

打开统计页面：

```java
package com.nowcoder.community.controller;

import com.nowcoder.community.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Date;

/**
 * @author: Tisox
 * @date: 2022/3/30 21:05
 * @description:
 * @blog:www.waer.ltd
 */
@Controller
public class DataController {
    @Autowired
    private DataService dataService;

    /**
     * 统计页面
     * @return String
     */
    @RequestMapping(path = "/data",method = {RequestMethod.GET,RequestMethod.POST})
    public String getDataPage(){
        return "/site/admin/data";
    }

    /**
     * 统计UV
     * @param start 开始日期
     * @param end 结束日期
     * @param model model
     * @return String
     *
     */
    @RequestMapping(path = "/data/uv",method = RequestMethod.POST)
    public String getUV(@DateTimeFormat(pattern = "yyyy-MM-dd") Date start,
                        @DateTimeFormat(pattern = "yyyy-MM-dd") Date end, Model model){
        long uv = dataService.calculateUV(start, end);
        model.addAttribute("uvResult",uv);
        model.addAttribute("uvStartDate",start);
        model.addAttribute("uvEndDate",end);
        //这里也可以用return "/site/admin/data";，效果是一样的，
        //如果使用下面这种方式，表示将该请求转发到另一个请求中继续处理，这里也就是将它转发给上面的页面请求中
        //页面请求再通过return "/site/admin/data";便可以返回到页面模板。
        //这也就是为什么我们再上面这个方法中需要添加两种请求方式，就是为了兼容该方法的POST请求。
        return "forward:/data";
    }


    /**
     * 统计DAU
     * @param start 开始日期
     * @param end 结束日期
     * @param model model
     * @return String
     *
     */
    @RequestMapping(path = "/data/dau",method = RequestMethod.POST)
    public String getDAU(@DateTimeFormat(pattern = "yyyy-MM-dd") Date start,
                         @DateTimeFormat(pattern = "yyyy-MM-dd") Date end, Model model){
        long dau = dataService.calculateDAU(start, end);
        model.addAttribute("dauResult",dau);
        model.addAttribute("dauStartDate",start);
        model.addAttribute("dauEndDate",end);
        //这里也可以用return "/site/admin/data";，效果是一样的，
        //如果使用下面这种方式，表示将该请求转发到另一个请求中继续处理，这里也就是将它转发给上面的页面请求中
        //页面请求再通过return "/site/admin/data";便可以返回到页面模板。
        //这也就是为什么我们再上面这个方法中需要添加两种请求方式，就是为了兼容该方法的POST请求。
        return "forward:/data";
    }
}
```

### 处理页面模板

> 在`data.html`中

```html
<div class="main">
    <!-- 网站UV -->
    <div class="container pl-5 pr-5 pt-3 pb-3 mt-3">
        <h6 class="mt-3"><b class="square"></b> 网站 UV</h6>
        <form class="form-inline mt-3"  method="post" th:action="@{/data/uv}">
            <input type="date" class="form-control"  name="start"
                   th:value="${#dates.foramt(uvStartDate,'yyyy-MM-dd')}"
                   required/>
            <input type="date" class="form-control ml-3" name="end"
                   th:value="${#dates.foramt(uvEndDate,'yyyy-MM-dd')}" required/>
            <button type="submit" class="btn btn-primary ml-3">开始统计</button>
        </form>
        <ul class="list-group mt-3 mb-3">
            <li class="list-group-item d-flex justify-content-between align-items-center">
                统计结果
                <span class="badge badge-primary badge-danger font-size-14" th:text="${uvResult}">0</span>
            </li>
        </ul>
    </div>
```

当然，对于`DAU`的统计处理也是类似的操作，这里不贴代码了，注意了，网站的数据统计功能不应该是所有人都可以访问的，这里规定它只有管理员才能访问，所以在权限配置中属于管理员的权限路径中添加下面的路径：

```jaav
"/data/**"
```

### 测试

![image-20220330220210008](https://s2.loli.net/2022/03/30/YXSwkgnxcOTPjoL.png)

****

## 热帖排行榜

### 本节目录

> 实现社区热门帖子排行榜。

> 在实现正式的功能之前，需要先了解一些基本的前备知识。

### 任务执行与调度

- `JDK`线程池
  - `ExecutorService`
  - `ScheduledExecutorService`
- `Spring线程迟池`
  - `ThreadPoolTaskExecutor`
  - `ThreadPoolTaskScheduler`
- 分布式定时任务(今日主角)
  - `Spring Quartz`

[Spring Quartz](http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html)

![](https://images.waer.ltd/img/20220331100325.png)

### Quartz简单演示

> 通过测试的方式，演示上述线程池的一个简单使用。

- **`JDK`普通线程池**

```java
@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
@ContextConfiguration(classes = CommunityApplication.class)
public class ThreadPoolTests {
       private static Logger logger = LoggerFactory.getLogger(ThreadPoolTests.class);

    //演示JDK普通线程池
    //初始化5个线程池
    private ExecutorService executorService = Executors.newFixedThreadPool(5);

    //JDK可执行定时任务的线程池
    private ScheduledExecutorService scheduledExecutorService = Executors.newScheduledThreadPool(5);
	
    /**
     * 将当前线程休眠
     * @param m 休眠时间单位：秒
     */
    private void sleep(long m){
        try {
            Thread.sleep(m);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    
    /**
     * 测试JDK普通线程池
     */
    @Test
    public void testExecutorService(){
        //通过【Runnable】创建一个线程体
        Runnable task = new Runnable() {
            @Override
            public void run() {
                logger.debug("hello ExecutorService!");
            }
        };
        for(int i=0;i<10;i++){
            executorService.submit(task);
        }
        sleep(10000);
    }
}
```

- **`JDK`可执行定时任务的线程池**

```java
    /**
     * JDK定时任务线程池
     */
    @Test
    public void testScheduledExecutorService(){
        Runnable task = new Runnable(){
            @Override
            public void run() {
                logger.debug("hello ScheduledExecutorService!");
            }
        };
        //参数分别是任务、任务延迟时间10秒、时间间隔1000、单位毫秒
        scheduledExecutorService.scheduleAtFixedRate(task,10000,1000, TimeUnit.MILLISECONDS);
        //阻塞30s
        sleep(30000);
    }
```

- **Spring线程池配置**

```properties
# TaskExecutionProperties(基本线程池)
# 配置核心线程池数量
spring.task.execution.pool.core-size=5
# 配置最大扩容线程池数量
spring.task.execution.pool.max-size=15
# 配置线程任务缓存队列大小:当线程池使用达到max之后，如果还有任务，就将该任务放到大小为100的队列中
spring.task.execution.pool.queue-capacity=100
# TaskSchedulingProperties(定时任务线程池)
spring.task.scheduling.pool.size=5
```

- **Spring基本线程池**

```java
//注入Spring普通线程池
@Autowired
private ThreadPoolTaskExecutor threadPoolTaskExecutor;

//注入定时任务线程池
@Autowired
private ThreadPoolTaskScheduler threadPoolTaskScheduler;


/**
     * Spring基本线程池测试
     */
@Test
public void testThreadPoolTaskExecutor(){
    Runnable task = new Runnable() {
        @Override
        public void run() {
            System.out.println("hello Spring基本线程池！");
        }
    };
    for(int i = 0;i<10;i++){
        threadPoolTaskExecutor.submit(task);
    }
}
```

> 注意，在执行`Spring`的定时任务线程池之前，需要新建一个配置类，内容如下：
>
> ```java
> /**
>  * @author: Tisox
>  * @date: 2022/3/31 11:35
>  * @description: Spring定时任务线程池配置类
>  * @blog:www.waer.ltd
>  */
> @Configuration
> @EnableScheduling
> @EnableAsync
> public class ThreadPoolConfig {
> 
> }
> ```

- **Spring定时任务线程池**

```java
/**
     * Spring定时任务线程池测试
     */
@Test
public void testThreadPoolTaskScheduler(){
    Runnable task = new Runnable() {
        @Override
        public void run() {
            logger.debug("hello Spring定时任务线程池！");
        }
    };
    Date startTime = new Date(System.currentTimeMillis()+10000);
    threadPoolTaskScheduler.scheduleAtFixedRate(task,startTime,1000);
    sleep(30000);
}
```

对对应的配置类：

```java
package com.nowcoder.community.config;

import com.nowcoder.community.quartz.AlphaJob;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.quartz.JobDetailFactoryBean;
import org.springframework.scheduling.quartz.SimpleTriggerFactoryBean;


/**
 * @author: Tisox
 * @date: 2022/3/31 14:56
 * @description:
 * @blog:www.waer.ltd
 */
/**配置->数据库-> 调用
 * 该配置仅作首次读取，写入数据库之后直接读取数据库而不再读取该配置类
 */
@Configuration
public class QuartzConfig {
    /**
     * FactoryBean可简化Bean的实例化过程
     * 1.通过FactoryBean封装Bean的实例化过程
     * 2.将FactoryBean装配到Spring容器中
     * 3.将FactoryBean注入给其他的Bean
     * 4.该Bean得到的是一个FactoryBean所管理的对象实例
     * @return factoryBean
     */
    @Bean
    public JobDetailFactoryBean alphaJobDetail() {
        JobDetailFactoryBean factoryBean = new JobDetailFactoryBean();
        factoryBean.setJobClass(AlphaJob.class);
        factoryBean.setName("alphaJob");
        factoryBean.setGroup("alphaJobGroup");
        factoryBean.setDurability(true);
        factoryBean.setRequestsRecovery(true);
        return factoryBean;
    }

    @Bean
    public SimpleTriggerFactoryBean alphaTrigger(JobDetail alphaJobDetail){
        SimpleTriggerFactoryBean factoryBean = new SimpleTriggerFactoryBean();
        factoryBean.setJobDetail(alphaJobDetail);
        factoryBean.setName("alphaTrigger");
        factoryBean.setGroup("alphaTriggerGroup");
        factoryBean.setRepeatInterval(3000);
        factoryBean.setJobDataMap(new JobDataMap());
        return factoryBean;
    }
}
```

- **删除对应的Job**

```java
@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
@ContextConfiguration(classes = CommunityApplication.class)
public class QuartzTests {
    @Autowired
    private Scheduler scheduler;

    @Test
    public void testDeleteJob() throws SchedulerException {
        boolean res = scheduler.deleteJob(new JobKey("alphaJob", "alphaJobGroup"));
    }
}
```

- **属性配置**

```java
# QuartzProperties
spring.quartz.job-store-type=jdbc
spring.quartz.scheduler-name=communityScheduler
spring.quartz.properties.org.quartz.scheduler.instanceId = AUTO
spring.quartz.properties.org.quartz.jobStore.class= org.guartz.impl.jdbcjobstore.JobStoreTX
spring.quartz.properties.org.quartz.jobStore.driverDeleqateClass= org.guartz.impl.jdbcjobstore.StdJDBCDelegate
spring.quartz.properties.org.quartz.jobStore.isClustered= true
spring.quartz.properties.org.quartz.threadPool.class= org.guartz.impl.simpleThreadPool
spring.quartz.properties.org.quartz.threadPool.threadCount=5
```

### 热帖排行

![](https://images.waer.ltd/img/20220331180513.png)

> 关于排行，总是有一定的排序规则和算法。上图是一些网站使用的热门排行的一些算法，当然，这不是一成不变的东西，也不是一个统一的规定，而是需要工具实际的运营情况和网站的业务来决定的，在牛客网中，他们对于热帖的计算方式采用了加精、评论数、点赞数、收藏数等不同的属性作为一个衡量的依据，再根据这些数据通过一个既定的算法来计算出每一个帖子的权重，从而得出帖子的热度进行排名。

### 计算权值

虽然帖子的属性(点赞数、评论数、精华分等)随时在变化，但是我们不应该针对每次的改变都区做一次计算，这样的效率太低，而且如点赞等操作本身就是高频操作，如果一个点赞之后计算一次权值，这显然是不符合实际应用的。一个可行的方法是我们在一段时间之后计算一次排行所需的权值，在计算之前，可以使用`redis`记录并存储发生变化的帖子数据，方便在计算时取用。



**建立加分的Rediskey**

在`RedisKeyUtils`中新增key和对应的get方法：

```java
private static final String PREFIX_POST = "post";
/**
     * 获取POST分数的key
     * @return String
     */
public static String getPostScoreKey(){
    return PREFIX_POST+ SPLIT+"score";
}
```

- > 在`DiscussPostController`中的发帖和加精操作之后添加分数计。

  ```java
  //发帖
  /*计算帖子分数*/
  String redisKey = RedisKeyUtil.getPostScoreKey();
  //计算贴子分数的时候，我们希望对同一个帖子的计算不是重复的
  //因此这里不能使用队列来存放这些帖子，要求无重复且无序，考虑set结构。
  redisTemplate.opsForSet().add(redisKey,post.getId());
  //加精
  /*计算帖子分数*/
  String redisKey = RedisKeyUtil.getPostScoreKey();
  //计算贴子分数的时候，我们希望对同一个帖子的计算不是重复的
  //因此这里不能使用队列来存放这些帖子，要求无重复且无序，考虑set结构。
  redisTemplate.opsForSet().add(redisKey,id);
  ```

- > `CommentController`中的帖子评论时计算分数。

  ```java
  /*计算帖子分数*/
  String redisKey = RedisKeyUtil.getPostScoreKey();
  //计算贴子分数的时候，我们希望对同一个帖子的计算不是重复的
  //因此这里不能使用队列来存放这些帖子，要求无重复且无序，考虑set结构。
  redisTemplate.opsForSet().add(redisKey,discussPostId);
  ```

- > `LikeController`中的点赞之后计算分数。

  ```java
  if(entityType==ENTITY_TYPE_POST){
      /*计算帖子分数*/
      String redisKey = RedisKeyUtil.getPostScoreKey();
      //计算贴子分数的时候，我们希望对同一个帖子的计算不是重复的
      //因此这里不能使用队列来存放这些帖子，要求无重复且无序，考虑set结构。
      redisTemplate.opsForSet().add(redisKey,postId);
  }
  ```

### 添加定时`Job`

使用`Quartz`添加定时任务来执行帖子分数的刷新和计算：

```java
package com.nowcoder.community.quartz;

import com.mysql.cj.log.Log;
import com.nowcoder.community.entity.DiscussPost;
import com.nowcoder.community.service.DiscussPostService;
import com.nowcoder.community.service.ElasticsearchService;
import com.nowcoder.community.service.LikeService;
import com.nowcoder.community.utils.CommunityConstant;
import com.nowcoder.community.utils.RedisKeyUtil;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.BoundSetOperations;
import org.springframework.data.redis.core.RedisTemplate;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author: Tisox
 * @date: 2022/3/31 21:08
 * @description:
 * @blog:www.waer.ltd
 */
@SuppressWarnings({"all"})
public class PostScoreRefreshJob implements Job, CommunityConstant {
    private static final Logger logger = LoggerFactory.getLogger(PostScoreRefreshJob.class);
    @Autowired
    private RedisTemplate redisTemplate;

    @Autowired
    private ElasticsearchService elasticsearchService;

    @Autowired
    private DiscussPostService discussPostService;

    @Autowired
    private LikeService likeService;

    /**
     * 牛客纪元
     */
    private static final Date epoch;

    static{
        try {
            epoch = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse("2014-08-01:00:00:00");
        } catch (ParseException e) {
            throw new RuntimeException("初始化牛客纪元失败！",e);
        }
    }

    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        String redisKey = RedisKeyUtil.getPostScoreKey();
        BoundSetOperations operations = redisTemplate.boundSetOps(redisKey);
        if(operations.size()==0){
            logger.info("[任务取消],当前没有需要刷新的帖子!");
            return;
        }
        logger.info("[任务开始],正在刷新帖子分数:"+operations.size());
        while(operations.size()>0){
            this.refresh((Integer) operations.pop());
        }
        logger.info("[任务结束] 帖子分数刷新完毕!");
    }

    private void refresh(int postId){
        DiscussPost post = discussPostService.findDiscussPostById(postId);
        if(post==null){
            logger.error("帖子不存在:id="+postId);
            return;
        }
        //是否加精
        boolean wonderful = post.getStatus()==1;
        //评论数量
        int commentCount = post.getCommentCount();
        //点赞数量
        long likeCount = likeService.findEntityLikeCount(ENTITY_TYPE_POST,postId);
        //计算权重
        double w = (wonderful ? 75 : 0) + commentCount * 10 + likeCount * 2;
        //分数 = 帖子权重 + 距离天数
        //分数不能为负数:所以取w和1的最大值，最小情况下，分数也是0而不是负数。
        double score = Math.log10(Math.max(w,1))+(post.getCreateTime().getTime()-epoch.getTime())/(1000 * 3600 * 24);
        //更新帖子的分数
        discussPostService.updateScore(postId,score);
        //同步到ealsticsearch服务器
        post.setScore(score);
        elasticsearchService.saveDiscussPost(post);
        
    }
}
```

**实现其中的`updateScore`方法**

`DiscussPostMapper`中：

```java
int updateScore(int id,double score);
//对应的SQL
<!--更新帖子分数-->
    <update id="updateScore">
    update discuss_post set score = #{score} where id = #{id}
</update>
//service
    /**
     * 更新帖子分数
     * @param id 帖子id
     * @param score 帖子分数
     * @return int
     */
    public int updateScore(int id,double score){
    return discussPostMapper.updateScore(id, score);
}
```

- **配置Quartz**

```JAVA
/**
     * 刷新帖子分数的任务
     * @return JobDetailFactoryBean
     */
@Bean
public JobDetailFactoryBean postScoreRefreshJobDetail() {
    JobDetailFactoryBean factoryBean = new JobDetailFactoryBean();
    factoryBean.setJobClass(PostScoreRefreshJob.class);
    factoryBean.setName("postScoreRefreshJob");
    factoryBean.setGroup("communityJobGroup");
    factoryBean.setDurability(true);
    factoryBean.setRequestsRecovery(true);
    return factoryBean;
}

/**
     * 配置对应的trigger
     * @param postScoreRefreshJobDetail por
     * @return factoryBean
     */
@Bean
public SimpleTriggerFactoryBean postScoreRefreshTrigger(JobDetail postScoreRefreshJobDetail){
    SimpleTriggerFactoryBean factoryBean = new SimpleTriggerFactoryBean();
    factoryBean.setJobDetail(postScoreRefreshJobDetail);
    factoryBean.setName("postScoreRefreshTrigger");
    factoryBean.setGroup("communityTriggerGroup");
    //5分钟
    factoryBean.setRepeatInterval(1000 * 60 * 5);
    factoryBean.setJobDataMap(new JobDataMap());
    return factoryBean;
}
```

**properties**

```properties
# QuartzProperties
spring.quartz.job-store-type=jdbc
spring.quartz.scheduler-name=communityScheduler
spring.quartz.properties.org.quartz.scheduler.instanced=AUTO
#spring.quartz.properties.org.quartz.jobStore.class=org.quartz.impl.jdbcjobstore.JobStoreTX
spring.quartz.properties.org.quartz.jobStore.class=org.springframework.scheduling.quartz.LocalDataSourceJobStore
spring.quartz.properties.org.quartz.jobStore.driverDelegateClass=org.quartz.impl.jdbcjobstore.StdJDBCDelegate
spring.quartz.properties.org.quartz.jobStore.isClustered=true
spring.quartz.properties.org.quartz.threadPool.class=org.quartz.simpl.SimpleThreadPool
spring.quartz.properties.org.quartz.threadPool.threadCount=5
```

**这里踩了个坑，`quartz`默认是使用`JDBC`驱动的，所以不要网络在`pom.xml`加入依赖，就是忽略了这个点，搞了挺长时间。。。**

### 重写帖子排序规则

> 上述的功能测试通过之后，我们可以在数据库中查看到帖子确实是有不同的权重分数去作排序了，那么接下来就是将这个排序应用到页面的显示上。

- **重构一下mapper**

在`DiscussPostMapper`中的`selectDiscusPosts`方法中新增一个排序参数`int orderModel`,在排序时检查是否携带了该参数，如果是，动态拼接一下`SQL`，按照热度排序，否则就按照之前的规则排序。修改后的`SQL`如下：

```xml
<select id="selectDiscussPosts" resultType="com.nowcoder.community.entity.DiscussPost">
    select  <include refid="selectFields"/>
    from discuss_post
    where status !=2
    <if test="userId!=0">
        and user_id=#{userId}
    </if>
    <if test="orderMode==0">
        order by type desc,create_time desc
    </if>
    <if test="orderMode==1">
        order by type desc,score desc,create_time desc
    </if>
    limit #{offset},#{limit}
</select>
```

由于改动了相关的接口和方法，需要逐一检查涉及到的调用，然后作统一的修改，不然会编译不过。主要讲一下`HomeController`中作的修改。

```java
/**
     * 或取帖子数据
     * @param model model
     * @param page 分页信息
     * @return String
     */
@RequestMapping(path = "/index",method = RequestMethod.GET)
public String getIndexPage(Model model, Page page,
                           @RequestParam(name = "orderMode",defaultValue = "0") int orderMode){
    //方法调用之前，MVC会自动实例化MODEL和PAGE,并将page注入MODEL
    page.setRows(discussPostService.findDiscussPostRows(0));
    page.setPath("/index?orderMode="+orderMode);

    List<DiscussPost> list = discussPostService.findDiscussPosts(0, page.getOffset(), page.getLimit(),orderMode);
    List<Map<String,Object>> discussPosts = new ArrayList<>();
    if(!Objects.equals(list,null)){
        for (DiscussPost post : list) {
            Map<String,Object> map = new HashMap<>();
            map.put("post",post);
            User user = userService.findUserById(post.getUserId());
            map.put("user",user);
            long  likeCount = likeService.findEntityLikeCount(ENTITY_TYPE_POST, post.getId());
            map.put("likeCount",likeCount);
            discussPosts.add(map);
        }
    }
    model.addAttribute("discussPosts",discussPosts);
    model.addAttribute("orderMode",orderMode);
    return "/index";
}
```

- 注意新增的`orderMode`参数，必须使用` @RequestParam(name = "orderMode",defaultValue = "0")`声明并赋默认值，不然在初次进入帖子列表或者直接输入路径的情况下，是没有这个参数的，会报错。
- 注意拼接`orderMode`在`index`之后，我们在分页情况下也需要携带这个参数，不然分页之后就不再是按照热度排序。

### 处理页面

在帖子列表，也就是`index.html`中对帖子排序规则的切换进行处理。

```html
<!-- 筛选条件 -->
<ul class="nav nav-tabs mb-3">
    <li class="nav-item">
        <a th:class="|nav-link${orderMode==0 ? 'active' : ''|}" th:href="@{/index(orderMode=0)}">最新
        </a>
    </li>
    <li class="nav-item">
        <a th:class="|nav-link${orderMode==1 ? 'active' : ''|} " th:href="@{/index(orderMode=1)}">最热
        </a>
    </li>
```

![image-20220401152432056](https://s2.loli.net/2022/04/01/5D1R2O3BzE4mlnK.png)

end--------------------------------------------------------

****

## 网站长图生成

### 本节目录

> 了解并使用一些将网页生成图片等格式的方法。

- `wkhtmltopdf`
  - `wkhtmltopdf` `url` `file`
  - `wkhtmltoimage` `url` `file`
- Java
  - `Runtime.getRuntime().exec();`

[https://wkhtmltopdf.org/](https://wkhtmltopdf.org/)

`wkhtmltopdf`工具可以在上面的网站下载，安装和环境变量的配置就不说了。

### 生成长图

```java
wkhtmltoimage  https://www.nowcoder.com  E:/nowcoder/woekspace/datas/toimage/2.png
```

如果需要对图片进行压缩，参考下面命令：

```java
wkhtmltoimage --quality 75 https://www.nowcoder.com  E:/nowcoder/woekspace/datas/toimage/2.png
```

> 这里的75表示按原图75%对图片进行压缩，这个值是一个很妙的魔法值，是前人总结的经验值，就像`HashMap`底层扩容原理中用的也是0.75,了解一下。

### 生成`pdf`

```java
wkhtmltopdf  https://www.nowcoder.com  E:/nowcoder/woekspace/datas/topdf/2.png
```

用法都十分简单，注意提前创建用来存放生成文件的路径就好了，命令不会帮你自动创建。

**换成Java代码也很简单**

```java
String cmd = "E:/wkhtmltopdf/bin/wkhtmltoimage  https://www.nowcoder.com  " + "E:/nowcoder/woekspace/datas/toimage/WithJava.png";
Runtime.getRuntime().exec(cmd);
```

> 注意需要写可执行程序的绝对路径,上面的程序执行后，它会将命令提交给本地系统执行，所以这其实和上面自己在命令行敲命令没什么本质区别。

### 图片分享功能

系统上线后一般部署在`Linux`系统中，所以要求我们执行图片生成的命令和路径其实都需要修改，这就需要将上面写死的东西放在配置中，并且通过程序对路径进行一个判断和生成。

**`application.properties`中**

```properties
# wk
#命令路径
wk.image.command=E:/wkhtmltopdf/bin/wkhtmltoimage  
# 存放路径
wk.image.storage=E:/nowcoder/woekspace/datas/toimage
```

**`WkConfig`**

创建一个配置类，用来生成相应的文件夹。

```java
/**
 * @author: Tisox
 * @date: 2022/4/1 18:04
 * @description: 生成长图的工具配置类
 * @blog:www.waer.ltd
 */
@Configuration
public class WkConfig {
    private static final Logger logger = LoggerFactory.getLogger(WkConfig.class);

    @Value("${wk.image.storage}")
    private String wkImageStorage;

    @PostConstruct
    public void init(){
        File file = new File(wkImageStorage);
        if(!file.exists()){
            file.mkdirs();
            logger.info("创建WK目录:"+wkImageStorage);
        }
    }
}
```

**shareController**

```java
/**
 * @author: Tisox
 * @date: 2022/4/1 21:41
 * @description: 管理分享功能请求
 * @blog:www.waer.ltd
 */
@Controller
public class ShareController implements CommunityConstant {
    /**
     * 引入日志
     */
    private static final Logger logger = LoggerFactory.getLogger(ShareController.class);
    /**
     * 生产者
     */
    @Autowired
    private EventProducer eventProducer;
    /**
     * 项目域名
     */
    @Value("community.path.domain")
    private String domain;

    /**
     * 项目访问路径
     */
    @Value("server.servlet.context-path")
    private String contextPath;

    /**
     * 图片路径
     */
    @Value("${wk.image.storage}")
    private String wkImageStorage;

    @RequestMapping(path = "/share",method = RequestMethod.GET)
    @ResponseBody
    public String share(String htmlUrl){
        //随机文件名
        String fileName = CommunityUtil.generateUUID();
        //异步生成长图
        Event event = new Event()
            .setTopic(TOPIC_SHARE)
            .setData("htmlUrl",htmlUrl)
			.setData("fileName",fileName)
            .setData("suffix",".png");
        eventProducer.fireEvent(event);
        //返回图片的访问路径
        Map<String,Object> map = new HashMap<>();
        map.put("shareUrl",domain + contextPath + "/share/image/" + fileName);
        return CommunityUtil.getJSONString(0,null,map);
    }
}
```

> 上面涉及到一个新的主题，需要自行添加。

创建分享的消费事件，在`EventConsumer`中

```java
/**
     * 消费分享事件
     * @param record
     */
@KafkaListener(topics = {TOPIC_SHARE})
public void handleShareMessage(ConsumerRecord record){
    if(Objects.equals(record,null) || Objects.equals(record.value(),null)){
        logger.error("消息的内容为空！");
        return;
    }
    Event event = JSONObject.parseObject(record.value().toString(),Event.class);
    if(event==null){
        logger.error("消息格式错误！");
        return;
    }
    String htmlUrl = (String) event.getData().get("htmlUrl");
    String fileName = (String) event.getData().get("fileName");
    String suffix = (String) event.getData().get("suffix");

    //拼接命令
    String cmd = wkImageCommand + " --quality 75 "
        + htmlUrl + " " + wkImageStorage + "/" + fileName + suffix;
    try {
        Runtime.getRuntime().exec(cmd);
        logger.info("生成长图成功:" + cmd);
    } catch (IOException e) {
        logger.error("生成长图失败:" + e);
    }
}
```

完成之后，在`ShareController`中追加一个方法，用来获取长图。

```java
/**
     * 获取长图
     * @param fileName 文件吗
     * @param response resp
     */
@RequestMapping(path = "/share/image/{fileName}",method = RequestMethod.GET)
public void getShareImage(@PathVariable("fileName") String fileName, HttpServletResponse response){
    if(StringUtils.isBlank(fileName)){
        throw new IllegalArgumentException("文件名不能为空!");
    }
    //指定输出的文件类型和格式
    response.setContentType("image/png");
    File file = new File(wkImageStorage + "/" + fileName + ".png");
    try {
        OutputStream os = response.getOutputStream();
        FileInputStream fis  = new FileInputStream(file);
        byte[] buffer = new byte[1024];
        int b=0;
        while((b=fis.read(buffer))!=-1){
            os.write(buffer,0,b);
        }
    } catch (IOException e) {
        logger.error("获取长图失败:" + e.getMessage());
    }
}
```

**测试**

无需登录，在项目地址栏中输入

```java
http://localhost:8080/community/share?htmlUrl=你想生成长图的网站地址
```

如果成功，会在网页上返回如下一个提示信息并返回生成图片的链接，通过链接即可访问图片。

```json
{"code":0,"shareUrl":"http://localhost:8080/community/share/image/254a250df4714e00b2538c9d4b48b41f"}
```

![](https://images.waer.ltd/img/null.png)

****

## 七牛云图片存储

### 本节目录

> 使用七牛云云服务存网站图片数据。

- 将用户头像上传的部分代码重构，将头像上传到七牛云。
- 将生成分享长图的图片存放到七牛云。

### 存储用户头像

### 空间配置

使用人家的服务，自然得遵循人家得规则才能使用，所以首先得注册七牛云账户并进行实名认证。在认证通过之后，我们需要在服务中选择**对象存储**，来创建两个空间，用来存放用户头像和分享得长图。具体得操作我在之前得一篇博客《[PicGo+七牛云配置属于自己的图片云存储仓库](https://www.waer.ltd/blog/8)》中有记录，可以参考一下。

附上[七牛云官网](https://portal.qiniu.com/)

### 项目配置

> 注意，上传用户头像使用的客户端直传的方式。

为例更好得便捷性，这里将七牛云服务中几个必要得密钥以及图片空间得信息以`properties`配置文件得形式配置在项目中，方便后期使用。

### **`pom.xml`**

添加七牛云`SDK`的依赖。

```xml
<dependency>
    <groupId>com.qiniu</groupId>
    <artifactId>qiniu-java-sdk</artifactId>
    <version>7.9.5</version>
</dependency>
```

### **`application.properties`**

```properties
# 配置七牛云图片存储信息
qiniu.key.access=4IQVHYjvcgo****jIs01hWHBmqSNM5epdvMkwSD9
qiniu.key.secret=Xg_vVbWlzco6qeO*****VwKz****xJwyWHBQ5xfBELzqovj42
qiniu.bucket.header.name=community-header-user
qiniu.bucket.header.url=http://r9pr******pfclw.bkt.clouddn.com
qiniu.bucket.share.name=community-share-user
qiniu.bucket.share.url=http://r9prtq0zb.b****kt.clouddn.com
```

> 配置项的具体含义就不赘述了，字如其意。

**代码重构**

既然更换了图片的存储源，对于之前上传头像的代码逻辑也需要进行适当的重写删除。

### **`UserController`**

> 将前面的配置文件信息注入到类中。

```java
//注入属性配置
@Value("${qiniu.key.access}")
private String accessKey;

@Value("${qiniu.key.secret}")
private String secreKey;

@Value("${qiniu.backet.header.name}")
private String headerBucketName;

@Value("${qiniu.backet.header.url}")
private String headerBucketUrl;
```

> 弃用部分代码，为了方便后期对项目的复盘工作，这里对之前的代码不作删除，而是选择弃用。

```java
/**
     * 该方法已废弃
     * 上传头像
     * @param headerImage 头像
     * @param model model
     * @return Strng
     */
@Deprecated
@LoginRequired
@RequestMapping(path = "upload",method = RequestMethod.POST)
public String uploadHeader(MultipartFile headerImage, Model model){
    if(Objects.equals(headerImage,null)){
        model.addAttribute("error","请选择图片!");
        return "/site/setting";
    }
    String filename = headerImage.getOriginalFilename();
    String suffix = filename.substring(filename.lastIndexOf(".")+1);
    if(StringUtils.isEmpty(suffix)){
        model.addAttribute("error","文件格式不正确！");
    }
    /*生成随机的文件名*/
    filename = CommunityUtil.generateUUID()+suffix;
    /*确定文件存放的路径*/
    File dest = new File(uploadPath+"/"+filename);
    try {
        headerImage.transferTo(dest);
    } catch (IOException e) {
        logger.error("上传文件失败！"+e.getMessage());
        throw new RuntimeException("上传文件失败,服务器发生异常!",e);
    }
    /*更新当前用户的头像路径*/
    //http://locahost:8080/community/user/header/xxxx.png
    User user = hostHolder.getUser();
    String headerUrl = domain+contextPath+"/user/header/"+filename;
    userService.updateHeader(user.getId(),headerUrl);

    return "redirect:/index";
}


/**
     * 该方法已废弃
     * 回写图片信息
     * @param fileName 文件名
     * @param response rseponse
     */
@Deprecated
@RequestMapping(path = "/header/{fileName}",method = RequestMethod.GET)
public void getHeader(@PathVariable("fileName")String fileName, HttpServletResponse response){
    /*服务器存放路径*/
    fileName = uploadPath+"/"+fileName;
    /*文件后缀*/
    String suffix = fileName.substring(fileName.lastIndexOf(".") + 1);
    /*响应图片*/
    response.setContentType("image/"+suffix);
    try(   FileInputStream fis = new FileInputStream(fileName);
        OutputStream os = response.getOutputStream();) {
        byte[] buffer = new byte[1024];
        int b  = 0;
        while ((b=fis.read(buffer))!=-1){
            os.write(buffer,0,b);
        }
    } catch (IOException e) {
        logger.error("读取头像失败:"+e.getMessage());
    }
}
```

对之前的`getSettingPage`方法进行重构。

```java
/**
     * 返回页面并携带七牛云的服务token信息到页面处理
     * @param model model
     * @return String
     */
@LoginRequired
@RequestMapping(path = "/setting",method = RequestMethod.GET)
public String getSettingPage(Model model)
{
    //上传文件名称
    String fileName =CommunityUtil.generateUUID();
    //设置响应信息
    StringMap policy = new StringMap();
    policy.put("returnBody",CommunityUtil.getJSONString(0));
    //生成上传凭证
    Auth auth = Auth.create(accessKey, secreKey);
    String uploadToken = auth.uploadToken(headerBucketName, fileName, 3600, policy);
    model.addAttribute("uploadToken",uploadToken);
    model.addAttribute("fileName",fileName);
    return "/site/setting";
}
```

添加一个方法，用来获取返回七牛云中用户的头像信息。

```java
/**
     * 返回用户头像的URL
     * @param fileName 头像文件名
     * @return JSON
     */
@RequestMapping(path = "/header/url",method = RequestMethod.POST)
@ResponseBody
public String uploadHeaderUrl(String fileName){
    if(StringUtils.isBlank(fileName)){
        return CommunityUtil.getJSONString(1,"文件名不能为空!");
    }
    String url = headerBucketUrl + "/" + fileName;
    userService.updateHeader(hostHolder.getUser().getId(),url);
    return CommunityUtil.getJSONString(0);
}
```

### **`setting.html`**

由于改用了存储方向，我们需要使用异步的方式对表单进行提交，所以之前提交头像上传的表单也需要作改动，具体的如下：

```html
<form class="mt-5" id="uploadForm">
    <div class="form-group row mt-4">
        <label class="col-sm-2 col-form-label text-right">选择头像:</label>
        <div class="col-sm-10">
            <div class="custom-file">
                <!--通过hidden隐藏域传递七牛云需要的参数-->
                <input type="hidden" name="token" th:value="${uploadToken}">
                <input type="hidden" name="key" th:value="${fileName}">
                <input type="file" class="custom-file-input" id="head-image" name="file" lang="es" required="">
                <label class="custom-file-label" for="head-image" data-browse="文件">选择一张图片</label>
                <div class="invalid-feedback">
                    该账号不存在!
                </div>
            </div>
        </div>
    </div>
    <div class="form-group row mt-4">
        <div class="col-sm-2"></div>
        <div class="col-sm-10 text-center">
            <button type="submit" class="btn btn-info text-white form-control">立即上传</button>
        </div>
    </div>
</form>
```

**发送异步请求**

在`js`包下新建一个名为`setting.js`的文件，用来处理异步表单的提交。

```javascript
$(function(){
    $("#uploadForm").submit(upload);
});
function upload(){
    $.ajax({
        url:"",
        method:"POST",
        processData:false,
        contentType:false,
        data:new FormData($("#uploadForm")[0]),
        success:function(data) {
            if(data && data.code===0){
                //更新头像访问路径
                $.post(
                    CONTEXT_PATH + "/user/header/url",
                    {"fileName":$("input[name='key']").val()},
                    function (data){
                        data = $.parseJSON(data);
                        if(data.code===0){
                            window.location.reload();
                        }else{
                            alert(data.msg);
                        }
                    }
                );
            }else {
                alert("上传失败!");
            }
        }
    })
}
```

> ` processData:false`:不转字符串处理。`contentType:false`:不指定内容类型，让浏览器处理。
>
> 这是和普通的异步请求的一些区别，如果我们请求的数据是文件类型时，需要作如上处理，否则会导致失败。

关于其中的请求的`url`的地址，在七牛云开发者中心中可以找到。

![](https://images.waer.ltd/img/20220403164731.png)

> 以上就是将用户头像上传到七牛云存储的全部内容。下面部分处理分享的长图。

### 存储分享长图

> 使用服务端直传的方式实现。也就是直接将网站服务器中的图片直接上传到七牛云中。

### 空间配置

这一步骤在上面的操作中已经做好了，不需要再动。

### 重构代码

打开`ShareController.java`，将下面的信息注入。

```java
@Value("${qiniu.bucket.share.name}")
private String shareBucketName;

@Value("${qiniu.bucket.share.url}")
private String sharerBucketUrl;
```

我们再生成图片之后，需要返回一个图片的连接给用户，这时就不再是项目地址的连接，需要改为七牛云存储空间图片地址的连接，所以再`share`方法中，修改如下：被注释的为原来的代码。

```java
// map.put("shareUrl",domain + contextPath + "/share/image/" + fileName);
map.put("shareUrl" , sharerBucketUrl + "/" + fileName);
```

其次，对于之前的方法`getShareImage`我们也可以废弃。

由于我们是再消费事件中对图片进行的处理，所以先把上传用到的两个`key`和对应的空间名称注入到`EventConsumer.java`中。

```java
@Value("${qiniu.key.access}")
private String accessKey;
@Value("${qiniu.key.secret}")
private String secreKey;
@Value("${qiniu.bucket.share.name}")
private String shareBucketName;
```

除此之外，我们还需要注入一个定时任务线程池，因为这里生成长图的逻辑我们是通过下面这段代码实现的，

![image-20220408170213856](https://s2.loli.net/2022/04/08/MtSNwzTogIuxycR.png)

这种方式，再生成图片时，由于图片大小不一样，那么try中的语句执行的时间是比较慢的，但是这并不会影响这之后的逻辑，如果说我图片还没生成成功，而后续的逻辑中又涉及到图片，就会出现一些问题，因此这里需要启用一个定时器，用来监听图片的生成过程，只要图片生成未完成，定时任务就处于开启状态，直到图片生成完毕之后，再调用后续的逻辑将图片上传到七牛云。

再者，这里自然需要实现一个线程体，但鉴于别处用不到，所以可以做一个内部实现即可，如下：下列代码直接跟在

![image-20220408181019832](https://s2.loli.net/2022/04/08/C6TdFMituY12mqJ.png)

之后即可。

```java
//启用定时器，监视该图片，一旦生成完毕将其上传到七牛云
UploadTask task = new UploadTask(fileName, suffix);
//5000ms
//获取返回值future，可以用来停止该定时器
Future future = taskScheduler.scheduleAtFixedRate(task, 500);
task.setFuture(future);
}
class UploadTask implements Runnable {
    //文件名称
    private String fileName;
    //文件后缀
    private String suffix;
    //启动任务的返回值
    private Future future;
    //开始时间
    private long startTime;
    //上传次数
    private int uploadTimes;

    public UploadTask(String fileName, String suffix) {
        this.fileName = fileName;
        this.suffix = suffix;
        //初始化为系统当前时间
        this.startTime = System.currentTimeMillis();
    }

    public void setFuture(Future future) {
        this.future = future;
    }

    @Override
    public void run() {
        //超时上传失败处理
        if(System.currentTimeMillis() - startTime >30000){
            logger.error("执行时间过长，终止任务:" + fileName);
            future.cancel(true);
            return;
        }
        //超频上传失败处理
        if(uploadTimes>=3){
            logger.error("上传次数过多，终止任务:" + fileName);
            future.cancel(true);
            return;
        }
        //记录图片本地路径
        String path = wkImageStorage + "/" + fileName + suffix;
        //判断是否存在该路径文件
        File file = new File(path);
        if(file.exists()){
            logger.info(String.format("开始第%d次上传[%s].",++uploadTimes,fileName));
            //设置响应信息
            StringMap policy = new StringMap();
            policy.put("returnBody", CommunityUtil.getJSONString(0));
            //生成上传凭证
            Auth auth = Auth.create(accessKey,secreKey);
            String uploadToken = auth.uploadToken(shareBucketName,fileName,3600,policy);
            //构建上传区域
            Configuration cfg = new Configuration(Region.huadongZheJiang2());
            //指定上传的机房
            UploadManager manager = new UploadManager(cfg);
            try {
                //开始上传图片
                Response response = manager.put(path,fileName,uploadToken,null,"image/" + suffix,false);
                //处理响应结果
                JSONObject json = JSONObject.parseObject(response.bodyString());
                if(json==null || json.get("code")==null || !json.get("code").toString().equals("0")){
                    logger.info(String.format("第%d次上传失败[%s].",uploadTimes,fileName));
                }else{
                    logger.info(String.format("第%d次上传成功[%s].",uploadTimes,fileName));
                }
            }catch(QiniuException e) {
                logger.info(String.format("第%d次上传失败[%s].",uploadTimes,fileName));
            }
        }else {
            logger.info("等待图片生成["+ fileName +"].");
        }
    }
}
```

看得出来，服务端上传的逻辑相较于之前的客户端上传复杂一些。

注意到，我们还声明了两个变量，记录`上传时间`和`上传次数`,为什么要这样做，考虑一些极端的情况，假设程序在生成图片的过程中，出现了网络错误，或者在上传图片到七牛云服务器时不巧他们的服务器崩了或者遇到网络环境很不友好的情况，这可能会直接导致我们上传的这部份逻辑一直处于运行中的状态，因为定时任务一直在执行，如果长时间如此，可能会导致程序崩溃或者服务器被无意义的任务撑爆。

当然不会出现这种情况是最好的，但可能性低不代表不可能，所以需要考虑这种情况下的兜底方案，也就是上面两个变量的作用。处理的逻辑是我们对图片上传时做一个上传次数和时间限制的处理，如果超过某一个额定的阈值，我们可以人为本次上传任务失败，直接结束任务，而不是让它一直运行下去。具体的，如果上传过程中时间超过`30m`，或者在此期间，上传次数达到`3`次，结束上传任务。

至于其他部分的上传逻辑，交由七牛云提供的`SDK`处理即可，不过还是提一下上传机房这个地方，这里的机房，一般选择你之前选的对象空间的区域即可，我选的是`华东-浙江2`，所以在代码中的处理如下：

```java
//构建上传区域
Configuration cfg = new Configuration(Region.huadongZheJiang2());
//指定上传的机房
UploadManager manager = new UploadManager(cfg);
```

注意，如果你使用的是下面这种方式，它可能会提示该方法已经被弃用，这时候要么点开人家的源码看看，要么直接看文档，所以目前使用的我上面这种方式。

![image-20220408182624746](https://s2.loli.net/2022/04/08/OezhrBQ3jt6yu2G.png)

具体的文档地址如下：

[JavaSDK服务端开发文档](https://developer.qiniu.com/kodo/1239/java#upload-config)

### 测试

测试生成百度首页的长图，浏览器返回如下

![](https://images.waer.ltd/img/20220408184954.png)

控制台日志如下:

![](https://images.waer.ltd/img/20220408184900.png)

七牛云空间信息如下:

![](https://images.waer.ltd/img/20220408185131.png)

****

## 优化热贴数据

### 本节目录

- 本地缓存
  - 将数据缓存到引用应用服务器上，性能最好。
  - 常用的缓存工具：`Ehcache`,`Guava`,`Caffeine`等。
- 分布式缓存
  - 将数据缓存在`NoSQL`数据库上，跨服务器。
  - 常用缓存工具:`MemCache`，`Redis`等。
- 多级缓存
  - 一级缓存(本地缓存)>二级缓存(分布式缓存)>DB
  - 避免缓存雪崩(缓存失效、大量请求直达DB)，提高系统的可用性。

****

### 使用caffeine缓存热门帖

在上面本地缓存中提到过了，本地缓存的工具主要有`Ehcache,Guava,Caffeine`。这里采用`caffeine`来做我们网站热门帖子的缓存优化，`caffeine`是在`Guava`基础上优化来的，因此它采用了更优秀的算法，在性能上是还是可以的。

### 官网与文档

我们使用`Caffeine`被托管在了`github`，可以通过下面这个地址查看文档和基本的介绍。

[我就是上面说的那地址](https://github.com/ben-manes/caffeine)

### 配置准备

其实`Spring`对很多常用的第三方缓存工具都有作整合，我们可以通过它提供的缓存管理器来管理缓存。但问题是它的整合方式是多种缓存工具整合，通过一个管理器去统一管理，这就导致如果我们需要对不同的业务模块作不同程度和需求的缓存，那么这种方式就显得有些尴尬，所以这里就使用自定义的方式去使用这个`Caffeine`。

- 导入`maven`依赖。

> 好家伙，没啥好说的，常规操作了。

```xml
<!-- https://mvnrepository.com/artifact/com.github.ben-manes.caffeine/caffeine -->
<dependency>
    <groupId>com.github.ben-manes.caffeine</groupId>
    <artifactId>caffeine</artifactId>
    <version>3.0.6</version>
</dependency>
```

- 自定义属性配置

> 注意不是官方要求的必须步骤，只是为了使用方便，与之前配置七牛云信息类似，在`application.properties`自定义一些配置信息。

```properties
# 自定义caffeine信息配置
    # 配置缓存最大值
caffeine.posts.max-size=15
    # 配置缓存有效期180秒
caffeine.posts.expire-seconds=180
```

### 代码编写

在`DiscussPostService.java`中注入下面的配置信息。为什么是处理`service`而不是其他地方，因为我们优化的是热帖部分，不管前端如何调用，请求最终会来到服务层调用对应的方法查询数据，所以直接处理`Service`就好了。

```java
private static final Logger logger = LoggerFactory.getLogger(DiscussPostService.class);
@Value("${caffeine.posts.max-size}")
private int maxSize;
@Value("${caffeine.posts.expire-seconds}")
private int expireSeconds;
```

初始化缓存

```java
//caffeine核心接口:Cache,常用子接口：LoadingCache,AsyncLoadingCache

//帖子列表缓存
private LoadingCache<String,List<DiscussPost>> postListCache;
//帖子总数缓存
private LoadingCache<Integer,Integer> postRowsCache;

//初始化缓存
@PostConstruct
public void init() {
    //初始化帖子列表
    postListCache = Caffeine.newBuilder()
        .expireAfterWrite(expireSeconds, TimeUnit.SECONDS)
        .maximumSize(maxSize)
        .build(new CacheLoader<String, List<DiscussPost>>() {
            @Override
            public @Nullable List<DiscussPost> load(String key) throws Exception {
                if(key == null || key.length()==0){
                    throw new IllegalArgumentException("参数错误!");
                }
                String [] params = key.split(":");
                if(params==null || params.length!=2){
                    throw new IllegalArgumentException("参数错误!");
                }
                int offset = Integer.valueOf(params[0]);
                int limit = Integer.valueOf(params[1]);
                //这里可以再加一个二级缓存：redis

                //访问数据库
                logger.debug("load post list from DB.");
                return discussPostMapper.selectDiscussPosts(0,offset,limit,1);
            }
        });
    //初始化帖子总数
    postRowsCache = Caffeine.newBuilder()
        .expireAfterWrite(expireSeconds,TimeUnit.SECONDS)
        .maximumSize(maxSize)
        .build(new CacheLoader<Integer, Integer>() {
            @Override
            public @Nullable Integer load(Integer key) throws Exception {
                logger.debug("load post rows from DB.");
                return discussPostMapper.selectDiscussPostRows(key);
            }
        });
}
```

写好了缓存之后，再需要进行缓存处理的方法中调用上面的方法即可。

![](https://images.waer.ltd/img/20220409083833.png)

### 编写测试

为了凸显缓存的作用，我们先再数据库中添加30万条帖子数据作为压力测试数据。

```java
@Test
public void initDataForTest(){
    for (int i = 0; i < 300000;i++) {
        DiscussPost post = new DiscussPost();
        post.setUserId(111);
        post.setTitle("咖啡因缓存测试");
        post.setContent("压力测试-咖啡因缓存测试咖啡因缓存测试咖啡因缓存测试咖啡因缓存测试咖啡因缓存测试咖啡因缓存测试");
        post.setCreateTime(new Date());
        post.setScore(Math.random() * 2000);
        postService.addDiscussPost(post);
    }
}

@Test
public void testCache(){
    System.out.println(postService.findDiscussPosts(0, 0, 10, 1));
    System.out.println(postService.findDiscussPosts(0, 0, 10, 1));
    System.out.println(postService.findDiscussPosts(0, 0, 10, 1));
    //不走缓存
    System.out.println(postService.findDiscussPosts(0, 0, 10, 0));
}
```

> 注意了，由于我这里采用的是直接使用IDEA建立连接，一条数据循环300000次执行的插入，这是相当耗时的，建议挑个时间跑，从程序启动到结束，花费了**将近23分钟。**

### 压力测试

> 测试在使用缓存前后的性能测试数据。

这里使用阿帕奇的`jMeter`作为压力测试的工具，下载地址如下：下载之后解压后找到`/bin/jmeter.bat`双击即可启动。

![](https://images.waer.ltd/img/20220409094840.png)

[jMeter下载](https://jmeter.apache.org/download_jmeter.cgi)

**测试步骤：**

- 启动项目(先测试没有缓存的情况)

> 记得将调用缓存的方法部分先注释掉。

- 配置`jMeter`

> 右键`TestPlan`添加一个测试计划，选择添加线程组

![](https://images.waer.ltd/img/20220409095535.png)

具体的线程组配置如下：

![](https://images.waer.ltd/img/20220409095406.png)

在**线程组**上右键添加一个[**取样器**]选择[**HTTP请求**]，打开之后作如下的配置。

![](https://images.waer.ltd/img/20220409095947.png)

添加计时器：

同样在[**线程组**]右键添加[**计时器**]选择[**统一随机定时器**]打开作如下配置：

![](https://images.waer.ltd/img/20220409100320.png)

大致意思就是设定`0-1000ms`直接的随机访问服务的间隔。
添加报告：在[**线程组**]右键选择[**监听器**]打开[**聚合报告**]，这里没什么配置：

![](https://images.waer.ltd/img/20220409100710.png)

开始测试：

![](https://images.waer.ltd/img/20220409101418.png)

运行结束之后，可以在聚合报告中查看测试的情况，这里主要看吞吐量情况如何。

![](https://images.waer.ltd/img/20220409101906.png)

在我电脑上开100个线程的测试情况如上，这吞吐量明显优点低啊！！！！每秒6个请求的处理都达不到，我们再测试一遍看看：

![](https://images.waer.ltd/img/20220409102946.png)

可以看到这次的效果比上一次好了那么一点，勉强上了`6/sec`！！！

下面将之前注释掉的缓存方法去取消注释，测一下效果。

![](https://images.waer.ltd/img/20220409105652.png)

最终结果**189.9/sec**,峰值达到了**190/sec**，这差距已经很明显了，从之前的**6/sec**到使用缓存之后的**188.9/sec,整整高出了30多倍**!!!

![](https://images.waer.ltd/img/9d26cc162479f7e64d934f5aebea067.jpg)

以上就是今天的全部内容。

****

## 实现简单的项目监控。

### 本节目录

- `SpringBoot Actuator`
  - Endpoints:监控应用入口，`SpringBoot`内置了很多端点，也支持自定义端点。
  - 监控方式：`HTTP`或`JMX`
  - 访问路径:例如 “/actuator/health”。
  - 注意事项:按需要配置暴露的端点，并对开放的端点进行权限控制。

### 使用默认

`SpringBoot`默认已经给我们开放了很多端点，只需要再配置文件`.properties`中开启即可使用。

- 导包

```xml
<!-- https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-actuator -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
    <version>2.6.6</version>
</dependency>
```

- 开启配置

```properties
# actuator
management.endpoints.web.exposure.include=*
management.endpoints.web.exposure.exclude=info,caches
```



### 自定义配置

如果官方默认的监控端点不满足实际的需求，也可以通过自定义的方式开启属于自己的端点监控。

这里以自定义配置端点，来查看数据库的连接情况是否正常作为演示。

在项目目录下创建包`actuator`下创建一个名为`DataBaseEndpoint.java`的类。

```java
package com.nowcoder.community.actuator;
import com.nowcoder.community.utils.CommunityUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.endpoint.annotation.Endpoint;
import org.springframework.boot.actuate.endpoint.annotation.ReadOperation;
import org.springframework.stereotype.Component;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

/**
 * @author: Tisox
 * @date: 2022/4/9 15:47
 * @description:
 * @blog:www.waer.ltd
 */
@SuppressWarnings({"all"})
@Component
@Endpoint(id = "database")
public class DataBaseEndpoint {

    private Logger logger = LoggerFactory.getLogger(DataBaseEndpoint.class);

    @Autowired
    private DataSource dataSource;

    @ReadOperation
    public String checkConnect(){
        try
            (Connection conn = dataSource.getConnection()){
            return CommunityUtil.getJSONString(0,"获取连接成功!");
        }catch (SQLException e) {
            logger.error("获取连接失败:" + e.getMessage());
            return CommunityUtil.getJSONString(1,"获取连接失败!");
        }
    }
}
```

> @`Endpoint(id = "database")`:指定一个端点的访问名称
>
> @`ReadOperation`：该方法仅允许通过GET请求方式访问

### 使用端点监控

在使用之前，出于安全考虑，我们应该将所有端点的访问权限设为管理员可控。

具体的方法，在`SecurityConfig.java`中将我们访问的路径添加到管理员下即可。

```java
# 添加路径
/actuator/**    
```

启动项目，地址栏输入`actuator/database`回车即可访问。

![](https://images.waer.ltd/img/20220409160733.png)

以上就是本文全部内容！！更新再见。
![](https://images.waer.ltd/img/moyu.gif)

****

项目杀青！由于项目对服务器要求较高，博主没钱，所以部署这部分暂时搁置。

