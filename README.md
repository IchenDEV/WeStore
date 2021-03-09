# WeStore
a fast store lib for weapp

## Goal

- [x] Page Cache
- [x] Page Update Notify
- [x] Form Binding
- [ ] Persistence
- [ ] Easy API
- [ ] Complex Object && Dep Collect

## How to Use

In App
```javascript
import Store from 'westore'
APP({
$store:Store
})
```
In Page
```javascript
app.$store.connect(this)
app.$store.bind(this,'xxxx')
```

In Page(Use Page Cache)
```javascript
app.$store.connect(this,true)
app.$store.bind(this,'xxxx')
```