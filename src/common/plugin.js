let LwToast = {}
LwToast.install = function (Vue, options) {
    let opt = {
        defaultType: 'center',
        duration: '1500'
    }
    for (let property in options) {
        opt[property] = options[property]
    }
    Vue.prototype.$lwtoast = (tips, type) => {
        if (type) {
            opt.defaultType = type
        }
        if(document.getElementsByClassName('lw-toast').length){
            return
        }

        let toastTpl = Vue.extend({
            template: `<div class="lw-toast" toast-${opt.defaultType}>${tips}</div>`
        })

        let tpl = new toastTpl().$mount().$el
        document.body.appendChild(tpl)
        setTimeout(() => {
            document.body.removeChild(tpl)

        }, opt.duration);
    }
    ['bottom','center','top'].forEach(type=>{
        Vue.prototype.$lwtoast[type]=(tips)=>{
            return Vue.prototype.$lwtoast(tips,type)
        }

    })
}

export {
    LwToast
}



