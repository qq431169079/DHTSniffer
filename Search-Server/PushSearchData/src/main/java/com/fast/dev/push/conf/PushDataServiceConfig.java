package com.fast.dev.push.conf;

public class PushDataServiceConfig {

	// mongodb配置
	private MongodbConfig mongo;

	// 执行代码
	private String className;

	// 表达式
	private String corn;

	/**
	 * @return the mongo
	 */
	public MongodbConfig getMongo() {
		return mongo;
	}

	/**
	 * @param mongo
	 *            the mongo to set
	 */
	public void setMongo(MongodbConfig mongo) {
		this.mongo = mongo;
	}

	/**
	 * @return the className
	 */
	public String getClassName() {
		return className;
	}

	/**
	 * @param className
	 *            the className to set
	 */
	public void setClassName(String className) {
		this.className = className;
	}

	/**
	 * @return the corn
	 */
	public String getCorn() {
		return corn;
	}

	/**
	 * @param corn
	 *            the corn to set
	 */
	public void setCorn(String corn) {
		this.corn = corn;
	}

	public PushDataServiceConfig(MongodbConfig mongo, String className, String corn) {
		super();
		this.mongo = mongo;
		this.className = className;
		this.corn = corn;
	}

	public PushDataServiceConfig() {
		// TODO Auto-generated constructor stub
	}

}
