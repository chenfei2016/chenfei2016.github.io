$(function() {

    var h5 = H5();

    h5.whenAddPage = function() {
        this.addComponent({
            name: 'slide_up',
            css: {
                backgroundImage: 'url(imgs/footer.png)',
                opacity: 0,
                left: 0,
                bottom: '-3%',
                width: '100%',
                height: '0.975rem',
                zIndex: 999
            },
            animateIn: {
                opacity: 1,
                bottom: 0
            },
            animateOut: {
                opacity: 0,
                bottom: '-3%'
            },
            loadTime: 500
        });
    };

    h5
        .addPage('face')
            .addComponent({
                name: 'logo',
                type: 'base',
                center: true,
                width: '11rem',
                height: '3.25rem',
                css: {
                    top: 0,
                    opacity: 0,
                    backgroundImage: 'url(imgs/face_logo.png)'
                },
                animateIn: {
                    top: '10%',
                    opacity: 1
                },
                animateOut: {
                    top: 0,
                    opacity: 0
                },
            })
            .addComponent({
                name: 'slogan',
                type: 'base',
                center: true,
                width: '9.125rem',
                height: '2.5rem',
                css: {
                    opacity: 0,
                    top: '30%',
                    backgroundImage: 'url(imgs/face_slogan.png)',
                    zIndex: 999
                },
                animateIn: {
                    opacity: 1
                },
                animateOut: {
                    opacity: 0
                },
                loadTime: 300
            })
            .addComponent({
                name: 'face_img_left',
                type: 'base',
                width: '9.2rem',
                height: '12.3rem',
                css: {
                    opacity: 0,
                    left: '-8%',
                    bottom: '-8%',
                    backgroundImage: 'url(imgs/face_img_left.png)'
                },
                animateIn: {
                    opacity: 1,
                    left: 0,
                    bottom: '-2%'
                },
                animateOut: {
                    opacity: 0,
                    left: '-8%',
                    bottom: '-8%'
                },
                loadTime: 600
            })
            .addComponent({
                name: 'face_img_right',
                type: 'base',
                width: '6.8rem',
                height: '11.2rem',
                css: {
                    opacity: 0,
                    right: '-8%',
                    bottom: '-8%',
                    backgroundImage: 'url(imgs/face_img_right.png)'
                },
                animateIn: {
                    opacity: 1,
                    right: 0,
                    bottom: '-1%'
                },
                animateOut: {
                    opacity: 0,
                    right: '-8%',
                    bottom: '-8%'
                },
                loadTime: 500
            })
        .addPage()
            .addComponent({
                name: 'caption',
                text: '个人需求'
            })
            .addComponent({
                name: 'text',
                type: 'base',
                width: '100%',
                center: true,
                text: '我希望加入一个团队',
                css: {
                    opacity: 0,
                    textAlign: 'center',
                    color: '#FF0C53',
                    fontSize: '1rem',
                    top: '25%',
                    fontWeight: 'bold'
                },
                animateIn: {
                    opacity: 1,
                    top: '22.5%'
                },
                animateOut: {
                    opacity: 0,
                    top: '25%'
                },
            })
            .addComponent({
                name: 'description',
                width: '11.125rem',
                height: '7.525rem',
                center: true,
                css: {
                    backgroundImage: 'url(imgs/description_bg.gif)',
                    opacity: 0,
                    padding: '0.85rem 1.1rem 0 0.8rem',
                    color: '#fff',
                    fontSize: '0.575rem',
                    lineHeight: '0.95rem',
                    textAlign: 'justify',
                    top: '32%'
                },
                text: '拥有一个好的团队，不仅可以提升效率，还能学到更多的知识，正所谓三人行必有我师。我希望加入这样的一个团队，每天大家可以开心的在一起，可以拥有很多共同的话题，可以一起分享个人的经验，可以一起生活，一起欢笑...',
                animateIn: {
                    opacity: 1,
                    top: '30%'
                },
                animateOut: {
                    opacity: 0,
                    top: '32%'
                },
                loadTime: 1000
            })
            .addComponent({
                name: 'people',
                center: true,
                width: '12.875rem',
                height: '7.625rem',
                css: {
                    backgroundImage: 'url(imgs/p1_people.png)',
                    opacity: 0,
                    bottom: '10%'
                },
                animateIn: {
                    opacity: 1,
                    bottom: '3%'
                },
                animateOut: {
                    opacity: 0,
                    bottom: '10%'
                },
                loadTime: 500
            })
        .addPage()
            .addComponent({
                name: 'caption',
                text: '拥有的技能'
            })
            .addComponent({
                width: '8.8rem',
                height: '0.9rem',
                css: {
                    backgroundImage:'url(imgs/page_3_xq.png)',
                    top: '25%',
                    opacity: 0
                },
                center:true,
                animateIn: {
                    opacity: 1,
                    top: '35%'
                },
                animateOut: {
                    opacity: 0,
                    top: '25%'
                }
            })
            .addComponent({
                name: 'polyline',
                type: 'polyline',
                center: true,
                data: [
                    ['JS', .7],
                    ['jQuery', .45],
                    ['HTML', .62],
                    ['CSS', .31],
                    ['canvas', .65]
                ],
                width: '16rem',
                height: '16rem',
                css: {
                    top: '30%',
                    bottom: 0,
                    opacity: 0
                },
                center: true,
                animateIn: {
                    opacity: 1
                },
                animateOut: {
                    opacity: 0
                },
                loadTime: 500
            })
        .addPage()
            .addComponent({
                name: 'caption',
                text: '我不会设计'
            })
            .addComponent({
                text: '所以有点编不下去了...',
                center: true,
                width: '16rem',
                css: {
                    fontSize: '0.8rem',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    top: '90%',
                    opacity: 0
                },
                animateIn: {
                    opacity: 1,
                    top: '80%'
                },
                animateOut: {
                    opacity: 0,
                    top: '90%'
                },
                loadTime:1000
            })
            .addComponent({
                name: 'pie',
                type: 'pie',
                center: true,
                data: [
                    ['把妹儿', .25, '#5ddbd8'],
                    ['学习', .12, '#99c0ff'],
                    ['溜达', .12, '#ffad69'],
                    ['吃...', .51, '#ff7676']
                ],
                width: '16rem',
                height: '16rem',
                css: {
                    top: '30%',
                    opacity: 0
                },
                center: true,
                animateIn: {
                    opacity: 1,
                    top: '18%',
                },
                animateOut: {
                    top: '30%',
                    opacity: 0
                }
            })
        .addPage()
            .addComponent({
                name: 'caption',
                text: '一个标题要而已'
            })
            .addComponent({
                text: '要学的知识真的很多！',
                center: true,
                width: '16rem',
                css: {
                    fontSize: '0.8rem',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    top: '24%',
                    opacity: 0
                },
                animateIn: {
                    opacity: 1,
                    top: '30%'
                },
                animateOut: {
                    opacity: 0,
                    top: '24%'
                },
                loadTime: 500
            })
            .addComponent({
                type: 'bar',
                data: [
                    ['JavaScript', .90, '#5ddbd8'],
                    ['HTML/CSS', .235, '#99c0ff'],
                    ['CSS3', .51, '#ffad69'],
                    ['HTML5', .55, '#ff7676'],
                    ['jQuery', .50, '#E782B9'],
                    ['Node.js', .011, '#4BFAD8'],
                    ['BootStrap', .138, '#4BFAD8']
                ],
                width: '12rem',
                css: {
                    top: '52%',
                    opacity: 0
                },
                center: true,
                animateIn: {
                    opacity: 1,
                    top: '42%',
                },
                animateOut: {
                    top: '52%',
                    opacity: 0
                }
        })
        .addPage('radar')
            .addComponent({
                name: 'caption',
                text: '即将学习的知识'
            })
            .addComponent({
                type: 'radar',
                data: [
                    ['HTML5', .80],
                    ['CSS3', .83],
                    ['jQuery', .88],
                    ['React', .80],
                    ['nodejs', .50],
                    ['angularjs', .65],
                    ['bootStrap', .30]
                ],
                width: '16rem',
                height: '16rem',
                css: {
                    top: '30%',
                    opacity: 0
                },
                center: true,
                animateIn: {
                    opacity: 1,
                    top: '22%',
                },
                animateOut: {
                    top: '30%',
                    opacity: 0
                }
            })
            .addComponent({
                text: '一入前端深似海...',
                center: true,
                width: '16rem',
                css: {
                    fontSize: '0.8rem',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    top: '95%',
                    opacity: 0
                },
                animateIn: {
                    opacity: 1,
                    top: '86%'
                },
                animateOut: {
                    opacity: 0,
                    top: '95%'
                },
                loadTime: 500
            })
        .addPage()
            .addComponent({
                name: 'caption',
                text: '点一下试试'
            })
            .addComponent({
                text: '别小看这几个圈圈~',
                center: true,
                width: '16rem',
                css: {
                    fontSize: '0.8rem',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    top: '16%',
                    opacity: 0
                },
                animateIn: {
                    opacity: 1,
                    top: '26%'
                },
                animateOut: {
                    opacity: 0,
                    top: '16%'
                },
                loadTime: 500
            })
            .addComponent({
                type:'point',
                data:[
                    ['A项',.4,'#f88f88'],
                    ['B项',.3,'#F48A31','-5%','-90%'],
                    ['C项',.25,'#C1E760','77%','97%'],
                    ['D项',.3,'#38E7D6','-20%','115%'],
                    ['E项',.2,'#5661F4','-70%','40%'],
                    ['F项',.22,'#E971F4','110%','-35%']
                ],
                width:'5rem',
                height:'5rem',
                css:{
                    top:'55%'
                },
                center:true
            })
        .addPage('lastPage')
            .addComponent({
                name: 'slogan',
                type: 'base',
                width: '12.5rem',
                height: '1.9rem',
                css: {
                    backgroundImage: 'url(imgs/tail_slogan.png)',
                    top: '28%',
                    right: '-30%',
                    opacity: 0,
                    marginRight:'-6.25rem'
                },
                animateIn: {
                    opacity: 1,
                    right: '50%',
                },
                animateOut: {
                    right: '-30%',
                    opacity: 0
                }
            })
            .addComponent({
                name: 'logo',
                type: 'base',
                width: '7rem',
                height: '7rem',
                css: {
                    backgroundImage: 'url(imgs/tail_logo.png)',
                    top: '48%',
                    left: 0,
                    opacity: 0,
                    marginLeft:'-3.5rem'
                },
                center: false,
                animateIn: {
                    opacity: 1,
                    left: '50%',
                },
                animateOut: {
                    left: 0,
                    opacity: 0
                },
                loadTime: 500
            })
            .addComponent({
                name: 'share',
                type: 'base',
                width: '4.5rem',
                height: '3.25rem',
                css: {
                    backgroundImage: 'url(imgs/tail_share.png)',
                    top: '10%',
                    right: '20%',
                    opacity: 0
                },
                animateIn: {
                    opacity: 1,
                    top: '2%',
                    right: '5%',
                },
                animateOut: {
                    top: '10%',
                    right: '20%',
                    opacity: 0
                },
                onTouch: function () {
                    alert('凑合看吧\n' + 18904386821);
                },
                loadTime: 1000
            })
            .addComponent({
                name: 'back',
                type: 'base',
                width: '1.3rem',
                height: '1.25rem',
                css: {
                    backgroundImage: 'url(imgs/tail_back.png)'
                },
                center: true,
                onTouch: function() {
                    $.fn.fullpage.moveTo(1);
                }
            })
        .loaded(['imgs/face_bg.png', 'imgs/page_bg.png', 'imgs/page_caption_bg.png', 'imgs/footer.png', 'imgs/face_logo.png', 'imgs/face_slogan.png', 'imgs/face_img_left.png', 'imgs/face_img_right.png', 'imgs/description_bg.gif', 'imgs/p1_people.png', 'imgs/page_3_xq.png', 'imgs/tail_back.png', 'imgs/tail_share.png', 'imgs/tail_slogan.png']);
})
