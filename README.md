# wiliam

创建新的包：

```bash
lerna create example --registry=https://registry.npmjs.org
```

发布包：

```bash
# 不推送代码到 github，可以防止网络问题干扰发布成功
npx lerna publish --no-push

npx lerna publish from-git
```
