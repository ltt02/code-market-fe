<template>
    <footer class="footer-container bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div class="container mx-auto px-4 py-3">
            <el-row class="footer-social-container">
                <el-col :span="8">
                    <ul class="social pull-left d-flex">
                        <li>
                            <a href="">
                                <i class="fa-brands fa-facebook text-color-nonactive accent-color-hover"></i>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <i class="fa-brands fa-twitter text-color-nonactive accent-color-hover"></i>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <i class="fa-brands fa-youtube text-color-nonactive accent-color-hover"></i>
                            </a>
                        </li>
                    </ul>
                </el-col>
                <el-col :span="4">
                    <a href="">
                        <i class="fa-regular fa-circle-up text-color-nonactive accent-color-hover pull-right"></i>
                    </a>
                </el-col>
            </el-row>
            <el-row class="footer-links-container">
                <el-col :span="12" class="full">
                    <div class="pull-left">
                        <div class="subtitle text-color mobile-border-color">
                            <span>Về chúng tôi</span>
                        </div>
                        <ul class="footerLinks first-column">
                            <li><a href="" class="focusable text-color accent-color-hover">Giới thiệu</a></li>
                            <li><a href="" class="focusable text-color accent-color-hover">Quy định chung</a></li>
                            <li><a href="" class="focusable text-color accent-color-hover">FAQ</a></li>
                            <li><a href="" class="focusable text-color accent-color-hover">Sự kiện</a></li>
                        </ul>
                        <ul class="footerLinks first-column">
                            <li><a href="" class="focusable text-color accent-color-hover">Hỗ trợ kỹ thuật</a></li>
                            <li><a href="" class="focusable text-color accent-color-hover">Hướng dẫn thanh toán</a></li>
                            <li><a href="" class="focusable text-color accent-color-hover">Hướng dẫn đăng tải phần
                                    mềm</a>
                            </li>
                            <li><a href="" class="focusable text-color accent-color-hover">Người đóng góp</a></li>
                        </ul>
                        <ul class="footerLinks first-column">
                            <li><a href="" class="focusable text-color accent-color-hover">Liên hệ</a></li>
                            <li><a href="" class="focusable text-color accent-color-hover">Tuyển dụng</a></li>
                            <li><a href="" class="focusable text-color accent-color-hover">Công ty</a></li>
                            <li><a href="" class="focusable text-color accent-color-hover">Người ủng hộ</a></li>
                        </ul>
                    </div>
                    <div class="pull-left">
                        <div class="subtitle text-color mobile-border-color">
                            <span>Chính sách và quy định</span>
                        </div>
                        <ul class="footerLinks first-column">
                            <li><a href="" class="focusable text-color accent-color-hover">Điều khoản dịch vụ</a></li>
                            <li><a href="" class="focusable text-color accent-color-hover">Chính sách khuyến mãi</a>
                            </li>
                            <li><a href="" class="focusable text-color accent-color-hover">Chính sách bảo mật</a></li>
                            <li><a href="" class="focusable text-color accent-color-hover">Chính sách hỗ trợ</a></li>
                        </ul>
                        <ul class="footerLinks first-column">
                            <li><a href="" class="focusable text-color accent-color-hover">Tổng quan</a></li>
                            <li><a href="" class="focusable text-color accent-color-hover">Tuyển dụng</a></li>
                            <li><a href="" class="focusable text-color accent-color-hover">Công ty</a></li>
                            <li><a href="" class="focusable text-color accent-color-hover">Người đóng góp</a></li>
                        </ul>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12" class="full">
                    <hr class="mobile-border-color">
                </el-col>
            </el-row>
            <el-row class="copyright">
                <el-col :span="12" class="no-pading">
                    <div class="copyright-paragraph">
                        <div class="">
                            © 2024, App Shop. Tất cả các quyền được bảo lưu. App Shop, logo App Shop, và các
                            sản
                            phẩm khác được đề cập đều là thương hiệu hoặc thương hiệu đã đăng ký của App Shop. Tên
                            thương
                            hiệu hoặc sản phẩm khác thuộc quyền sở hữu của các bên liên quan.
                        </div>
                        <div class="">
                            Trang web của chúng tôi có thể chứa liên kết đến các trang web và tài nguyên do bên thứ ba
                            cung
                            cấp. Những liên kết này chỉ nhằm mục đích thuận tiện cho bạn. App Shop không kiểm soát
                            nội
                            dung của các trang web hoặc tài nguyên đó và không chịu trách nhiệm về bất kỳ mất mát hay
                            thiệt
                            hại nào phát sinh từ việc bạn sử dụng chúng.
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </footer>
</template>

<style scoped>
.pr-1-5 {
    padding-right: 1.5em;
}

.pull-left {
    float: left;
}

.pull-right {
    float: right;
}

.d-flex {
    display: flex;
    flex-direction: row;

}

.full {
    flex-grow: 1;
    max-width: 100%;
}

.no-pading {
    padding-right: 0;
    padding-left: 0;
}

.footer-container {
    margin-left: auto;
    margin-right: auto;
    border-top: none;
    border-color: #333 !important;
    text-size-adjust: 100%;
    font-size: 16px;
    padding: 1.25em 4.5em 2.5em;
    position: relative;
    z-index: 10;
}

.footer-social-container {
    justify-content: space-between;
    align-items: center;
}

.el-row {
    margin-left: -15px;
    margin-right: -15px;
}

.footer-container .el-row {
    margin-bottom: 0;
    margin-top: 0;
}

.footer-container ul {
    background-color: transparent;
    list-style-type: none;
}

.footer-container .social {
    padding: 0;
    user-select: none;
}

.social a {
    color: #e7e7e7;
    background-color: transparent;
}

.social li {
    margin-right: 8px;
}

.text-color-nonactive {
    color: #ccc;
    font-size: 1.75em;
    transition: color .3s ease-in-out;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-style: normal;
    font-variant: normal;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 1;
    text-transform: none;
}

.accent-color-hover:hover {
    color: #0078f2 !important;
}

button {
    -webkit-appearance: button;
    text-transform: none;
    overflow: visible;
    display: inline-block;
    vertical-align: middle;
    white-space: normal;
    background: none;
    outline: none;
}

.text-color-nonactive-border {
    border-color: #ccc !important;
}

.up-button {
    background-color: transparent;
    border: 2px solid #fff;
    border-radius: 2px;
    cursor: pointer;
    float: right;
    height: 2.1em;
    margin: 1.25em 1em 0 0;
    padding: .25em;
    -webkit-transition: border .3s ease-in-out;
    -o-transition: border .3s ease-in-out;
    transition: border .3s ease-in-out;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 2.1em;
    text-align: center;
}

.up-button i {
    display: block;
    font-size: 1.5em;
    transition: color .3s ease-in-out;
    user-select: none;
}

.mobile-border-color {
    border-color: #333 !important;
}

.text-color {
    color: #e7e7e7;
}

.footer-links-container .subtitle {
    display: block;
    font-size: .86em;
    font-weight: 700;
    margin-bottom: 4px;
    padding-top: 1.5em;
}

.subtitle span {
    color: #ccc;
    opacity: 0.4;
}

.footerLinks {
    float: left;
    list-style: none;
    margin: 0;
    padding: 0 2.6em .5em 0;
}

.three .footerLinks {
    padding-right: 1.5em;
}

.footerLinks li {
    line-height: 1.5em;
}

.footerLinks li a {
    cursor: pointer;
    font-family: OpenSans, sans-serif;
    font-size: .86em;
    -webkit-transition: color .3s ease-in-out;
    -o-transition: color .3s ease-in-out;
    transition: color .3s ease-in-out;
    background-color: transparent;
    color: #e7e7e7;
}

hr {
    margin: 1em 0;
}

.copyright {
    border-top: #dfdfdf;
    padding: 1em 0;
}

.copyright .copyright-paragraph {
    color: #fff;
    font-family: OpenSans, sans-serif;
    font-size: .71em;
    font-weight: 400;
    line-height: 2em;
    margin: 0;
    padding-top: .5em;
    color: #ccc;
    text-align: justify;
}
</style>