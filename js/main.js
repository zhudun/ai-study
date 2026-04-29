/* ============================================
   AI学习导航 - 交互逻辑
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // 初始化各模块
    initNavbar();
    initNavToggle();
    initCardExpand();
    initScrollAnimation();
    initBackToTop();
    initSmoothScroll();
    initPlatformTabs();
});

/* ============================================
   导航栏滚动效果
   ============================================ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // 滚动时添加背景
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // 高亮当前板块
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

/* ============================================
   移动端汉堡菜单
   ============================================ */
function initNavToggle() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    // 点击链接关闭菜单
    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* ============================================
   卡片展开/收起
   ============================================ */
function initCardExpand() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const header = card.querySelector('.card-header');

        header.addEventListener('click', () => {
            // 关闭其他已展开的卡片（同板块内）
            const parent = card.closest('.cards-grid');
            parent.querySelectorAll('.card').forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('expanded')) {
                    otherCard.classList.remove('expanded');
                }
            });

            card.classList.toggle('expanded');
        });
    });
}

/* ============================================
   滚动渐入动画
   ============================================ */
function initScrollAnimation() {
    // 给需要动画的元素添加类
    const animateElements = document.querySelectorAll(
        '.section-header, .card, .hero-content, .hero-stats'
    );

    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');
        // 为卡片添加延迟
        if (el.classList.contains('card')) {
            const cardIndex = Array.from(el.parentElement.children).indexOf(el);
            el.classList.add(`fade-in-delay-${cardIndex + 1}`);
        }
    });

    // 创建观察器
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    });

    animateElements.forEach(el => observer.observe(el));
}

/* ============================================
   回到顶部按钮
   ============================================ */
function initBackToTop() {
    const btn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============================================
   平滑滚动
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   中文互联网平台标签切换
   ============================================ */
function initPlatformTabs() {
    const tabs = document.querySelectorAll('.platform-tab');
    const contents = document.querySelectorAll('.platform-content');

    if (tabs.length === 0) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const platform = tab.dataset.platform;

            // 切换标签状态
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // 切换内容显示
            contents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `platform-${platform}`) {
                    content.classList.add('active');
                }
            });
        });
    });
}
