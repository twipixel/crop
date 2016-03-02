!function(a, b) {
    "function" == typeof define && define.amd ? define([], function() {
        return a.photos = b()
    }) : "object" == typeof exports ? module.exports = b() : a.photos = b()
}(this, function() {
    return function(a) {
        "use strict";
        a.Injector = {
            append: function(a, b) {
                this.appendHTML(a, b)
            },
            appendHTML: function(a, c) {
                if (a) {
                    var d = this.replacePrefix(b, c);
                    a.innerHTML = d
                }
            },
            replacePrefix: function(a, b) {
                return "photos_" === b ? a : a.replace(/photos_/g, b)
            },
            appendCSS: function(a) {
                var b = this.replacePrefix(c, a);
                this.loadCSS(b)
            },
            loadCSS: function(a) {
                var b = document.createElement("style");
                if (document.getElementsByTagName("head")[0].appendChild(b),
                        b.styleSheet)
                    b.styleSheet.disabled || (b.styleSheet.cssText = a);
                else
                    try {
                        b.innerHTML = a
                    } catch (c) {
                        b.innerText = a
                    }
            }
        };
        var b = '<div class="photos_editor photos_hide" data-click="wrapper:click"><strong class="photos_screen_out">Photos Web Editor</strong><div class="photos_container_main"><div class="photos_vertical_photo"><div class="photos_preview_wrapper" style=""><div class="photos_preview_scale_wrapper"><canvas class="photos_preview_canvas" width="0" height="0" style=""></canvas><canvas class="photos_preview_canvas_origin photos_hide" width="0" height="0" style=""></canvas><canvas class="photos_preview_canvas_fake photos_hide" width="0" height="0" style=""></canvas><canvas class="photos_preview_focus_layer photos_hide" width="0" height="0" style=""></canvas></div><div class="photos_preview_noscale_wrapper"><div class="photos_controls_deco"><pre class="text_proxy"><span class="proxy_get_size photos_hide"></span></pre></div><div class="photos_controls_size photos_hide"><div class="photos_size_outline"></div></div></div></div><div class="photos_tools_wrapper"><div class="photos_tools_crop photos_hide"><div class="photos_crop_dimmed" style=""><div class="photos_crop_dimmed_top" style=""></div><div class="photos_crop_dimmed_bottom" style=""></div><div class="photos_crop_dimmed_left" style=""></div><div class="photos_crop_dimmed_right" style=""></div></div><div class="photos_box_area"><div class="photos_crop_draggable"></div><span class="photos_corner_area photos_corner_t" data-click="crop:circle:n"></span> <span class="photos_corner_area photos_corner_l" data-click="crop:circle:w"></span> <span class="photos_corner_area photos_corner_b" data-click="crop:circle:s"></span> <span class="photos_corner_area photos_corner_r" data-click="crop:circle:e"></span> <span class="photos_corner_area photos_corner_tl" data-click="crop:circle:nw"><span class="photos_corner_mark" data-click="crop:circle:nw"></span></span> <span class="photos_corner_area photos_corner_tr" data-click="crop:circle:ne"><span class="photos_corner_mark" data-click="crop:circle:ne"></span></span> <span class="photos_corner_area photos_corner_bl" data-click="crop:circle:sw"><span class="photos_corner_mark" data-click="crop:circle:sw"></span></span> <span class="photos_corner_area photos_corner_br" data-click="crop:circle:se"><span class="photos_corner_mark" data-click="crop:circle:se"></span></span><div class="photos_line_edit photos_line_v photos_line_angle" style="left:11%"></div><div class="photos_line_edit photos_line_v photos_line_angle" style="left:22%"></div><div class="photos_line_edit photos_line_v" style="left:33%"></div><div class="photos_line_edit photos_line_v photos_line_angle" style="left:44%"></div><div class="photos_line_edit photos_line_v photos_line_angle" style="left:55%"></div><div class="photos_line_edit photos_line_v" style="left:66%"></div><div class="photos_line_edit photos_line_v photos_line_angle" style="left:77%"></div><div class="photos_line_edit photos_line_v photos_line_angle" style="left:88%"></div><div class="photos_line_edit photos_line_h photos_line_angle" style="top:11%"></div><div class="photos_line_edit photos_line_h photos_line_angle" style="top:22%"></div><div class="photos_line_edit photos_line_h" style="top:33%"></div><div class="photos_line_edit photos_line_h photos_line_angle" style="top:44%"></div><div class="photos_line_edit photos_line_h photos_line_angle" style="top:55%"></div><div class="photos_line_edit photos_line_h" style="top:66%"></div><div class="photos_line_edit photos_line_h photos_line_angle" style="top:77%"></div><div class="photos_line_edit photos_line_h photos_line_angle" style="top:88%"></div></div><div class="photos_detail_info"><div class="photos_info_btn photos_info_rotate" style=""><div class="photos_wrap_rotate"><div class="photos_bg_photos photos_degree_input"><label for="degree" class="photos_screen_out">회전 각도 입력</label><input type="text" id="degree" class="photos_inp_photos" maxlength="3"></div><button type="button" class="photos_ico_photos photos_btn_rotate_r" data-click="orientation:type:right">90도 회전</button> <button type="button" class="photos_ico_photos photos_btn_flip_h" data-click="orientation:type:horizontal">좌우반전</button></div><div class="photos_wrap_protractor"><canvas class="photos_protractor" width="512" height="512" style=""></canvas></div></div></div></div><div class="photos_tools_filter photos_hide"><button type="button" class="photos_btn_detail photos_btn_prev" data-click="filter:prev"><span class="photos_ico_photos photos_ico_prev">이전</span></button> <button type="button" class="photos_btn_detail photos_btn_next" data-click="filter:next"><span class="photos_ico_photos photos_ico_next">다음</span></button> <button type="button" class="photos_filter_origin"><span>원본</span></button></div><div class="photos_tools_effect_all photos_hide"></div></div></div><div class="photos_quicklist_photo photos_hide"><strong class="photos_screen_out">사진 목록</strong><div class="photos_quicklist_area"><div class="photos_scroll_wrap"><ul class="photos_list_quick"></ul></div><div class="photos_popup photos_hide" style=""><span class="photos_txt"></span> <span class="photos_ico_arr"></span></div></div></div><div class="photos_magnifier_photo"><div class="photos_inner_slider"><div class="photos_slider_bar pp_slider photos_icon_magnifier"><input class="pp_slider_input photos_hide" snap="1" type="range" min="1" max="1.5" step="0.0025" orientation="vertical" start="1"></div></div></div><div class="photos_light_editor"><button type="button" class="photos_btn_light" data-click="light:switch"><span class="photos_ico_photos photos_ico_light">화이트 버전</span></button></div><div class="photos_cancel_area"><button type="button" class="photos_btn_sub photos_btn_cancel" data-click="shortcut:cancel"><span class="photos_ico_photos photos_ico_back">닫기</span></button></div></div><div class="photos_tool_main"><div class="photos_wrap_menu"><div class="photos_wrap_menu_sub"><div class="photos_menu_sub_bg"></div><div class="photos_menu_sub photos_menu_sub_filter"><strong class="photos_screen_out">필터 메뉴</strong><div class="photos_list_wrapper photos_align_center"><ul class="photos_list_item photos_align_center photos_list_filter"></ul></div><button type="button" class="photos_menu_filter_prev photos_btn_detail photos_btn_prev photos_hide" data-click="filterNav:prev"><span class="photos_ico_photos photos_ico_prev">이전</span></button> <button type="button" class="photos_menu_filter_next photos_btn_detail photos_btn_next photos_hide" data-click="filterNav:next"><span class="photos_ico_photos photos_ico_next">다음</span></button></div><div class="photos_menu_sub photos_menu_sub_edit"><strong class="photos_screen_out">편집 메뉴</strong><ul class="photos_list_item photos_align_center photos_list_edit"><li><button type="button" class="photos_btn_item photos_menu_btn_crop" data-click="submenu:crop"><span class="photos_inner_btn"><span class="photos_ico_photos photos_ico_crop"></span> <span class="photos_txt_item">편집</span></span></button></li><li><button type="button" class="photos_btn_item photos_menu_btn_size" data-click="submenu:size"><span class="photos_inner_btn"><span class="photos_ico_photos photos_ico_size"></span> <span class="photos_txt_item">사이즈</span></span></button></li></ul></div><div class="photos_menu_sub photos_menu_sub_effect"><strong class="photos_screen_out">효과 메뉴</strong><ul class="photos_list_item photos_align_center photos_list_effect"><li><button type="button" class="photos_btn_item photos_menu_btn_auto" data-click="effect:auto"><span class="photos_inner_btn"><span class="photos_ico_photos photos_ico_auto"></span> <span class="photos_txt_item">자동조정</span></span></button></li><li><button type="button" class="photos_btn_item photos_menu_btn_brightness" data-click="submenu:brightness"><span class="photos_inner_btn"><span class="photos_ico_photos photos_ico_brightness"></span> <span class="photos_txt_item">밝기</span></span></button></li><li><button type="button" class="photos_btn_item photos_menu_btn_contrast" data-click="submenu:contrast"><span class="photos_inner_btn"><span class="photos_ico_photos photos_ico_contrast"></span> <span class="photos_txt_item">대비</span></span></button></li><li><button type="button" class="photos_btn_item photos_menu_btn_saturation" data-click="submenu:saturation"><span class="photos_inner_btn"><span class="photos_ico_photos photos_ico_saturation"></span> <span class="photos_txt_item">채도</span></span></button></li><li><button type="button" class="photos_btn_item photos_menu_btn_warmth" data-click="submenu:warmth"><span class="photos_inner_btn"><span class="photos_ico_photos photos_ico_warmth"></span> <span class="photos_txt_item">색온도</span></span></button></li><li><button type="button" class="photos_btn_item photos_menu_btn_focus" data-click="submenu:focus"><span class="photos_inner_btn"><span class="photos_ico_photos photos_ico_focus"></span> <span class="photos_txt_item">블러/포커스</span></span></button></li><li><button type="button" class="photos_btn_item photos_menu_btn_vignette" data-click="submenu:vignette"><span class="photos_inner_btn"><span class="photos_ico_photos photos_ico_vignette"></span> <span class="photos_txt_item">비네팅</span></span></button></li></ul></div><div class="photos_menu_sub photos_menu_sub_deco"><strong class="photos_screen_out">꾸미기 메뉴</strong><ul class="photos_list_item photos_align_center photos_list_deco"><li><button type="button" class="photos_btn_item photos_menu_btn_text" data-click="submenu:text"><span class="photos_inner_btn"><span class="photos_ico_photos photos_ico_text"></span> <span class="photos_txt_item">텍스트</span></span></button></li><li><button type="button" class="photos_btn_item photos_menu_btn_watermark" data-click="submenu:watermark"><span class="photos_inner_btn"><span class="photos_ico_photos photos_ico_watermark"></span> <span class="photos_txt_item">워터마크</span></span></button></li></ul></div></div><div class="photos_menu_main"><strong class="photos_screen_out">메인 메뉴</strong><ul class="photos_list_main_menu photos_align_center"><li><button type="button" class="photos_ico_photos photos_btn_filter" data-click="mainmenu:filter" disabled="disabled">필터</button></li><li><button type="button" class="photos_ico_photos photos_btn_edit" data-click="mainmenu:edit">편집</button></li><li><button type="button" class="photos_ico_photos photos_btn_effect" data-click="mainmenu:effect">효과</button></li><li><button type="button" class="photos_ico_photos photos_btn_effect_all" data-click="submenu:effectAll">효과</button></li><li><button type="button" class="photos_ico_photos photos_btn_deco" data-click="mainmenu:deco">꾸미기</button></li><li><button type="button" class="photos_ico_photos photos_btn_rotate_r" data-click="main:edit:rotate:right">회전</button></li><li><button type="button" class="photos_ico_photos photos_btn_flip_h" data-click="main:edit:flip:horizontal">회전</button></li><li><button type="button" class="photos_ico_photos photos_btn_crop" data-click="submenu:crop">편집</button></li><li><button type="button" class="photos_ico_photos photos_btn_size" data-click="submenu:size">사이즈</button></li></ul><button type="button" class="photos_btn_quicklist photos_hide" data-click="menu:list"><span class="photos_bg_photos photos_num_list"></span></button> <button type="button" class="photos_btn_save" data-click="menu:save"><span class="photos_ico_photos photos_ico_save">저장</span></button></div><div class="photos_menu_item"><div class="photos_sub_detail photos_sub_detail_filter"><strong class="photos_screen_out">필터</strong> <button type="button" class="photos_ico_photos photos_btn_origin" data-click="filter:OR00">ORIGIN</button></div><div class="photos_sub_detail photos_sub_detail_crop"><strong class="photos_screen_out">크롭/회전</strong><div class="photos_detail_list"><em class="photos_screen_out">크롭 비율</em><ul class="photos_list_info photos_list_crop photos_align_center"></ul></div></div><div class="photos_sub_detail photos_sub_detail_size"><strong class="photos_screen_out">사이즈</strong><div class="photos_detail_info"><div class="photos_info_btn photos_info_size"><div class="photos_bg_photos photos_size_input photos_size_width"><label for="width" class="photos_screen_out">넓이값 입력</label><input type="text" id="width" class="photos_inp_photos" maxlength="4"></div><button type="button" class="photos_ico_photos photos_btn_lock" data-click="size:lock">비율 고정</button><div class="photos_bg_photos photos_size_input photos_size_height"><label for="height" class="photos_screen_out">높이값 입력</label><input type="text" id="height" class="photos_inp_photos" maxlength="4"></div></div></div><div class="photos_detail_list"><em class="photos_screen_out">리사이즈 목록</em><ul class="photos_list_info photos_list_size photos_align_center" style=""></ul></div></div><div class="photos_sub_detail photos_sub_detail_brightness"><strong class="photos_screen_out">밝기</strong><div class="photos_effect_slider"><div class="photos_slider_bar photos_slider_brightness"><input class="pp_slider_input pp_hide" snap="1" type="range" min="-150" max="150" step="1" start="0"></div></div></div><div class="photos_sub_detail photos_sub_detail_contrast"><strong class="photos_screen_out">대비</strong><div class="photos_effect_slider"><div class="photos_slider_bar photos_slider_contrast"><input class="pp_slider_input pp_hide" snap="1" type="range" min="-100" max="100" step="1" start="0"></div></div></div><div class="photos_sub_detail photos_sub_detail_saturation"><strong class="photos_screen_out">채도</strong><div class="photos_effect_slider"><div class="photos_slider_bar photos_slider_saturation"><input class="pp_slider_input pp_hide" snap="1" type="range" min="-100" max="100" step="1" start="0"></div></div></div><div class="photos_sub_detail photos_sub_detail_warmth"><strong class="photos_screen_out">색온도</strong><div class="photos_effect_slider"><div class="photos_slider_bar photos_slider_warmth"><input class="pp_slider_input pp_hide" snap="1" type="range" min="-100" max="100" step="1" start="0"></div></div></div><div class="photos_sub_detail photos_sub_detail_focus"><strong class="photos_screen_out">포커스</strong><div class="photos_detail_info"><div class="photos_info_btn photos_info_focus"><button type="button" class="photos_ico_photos photos_btn_circle" data-click="focus:circle">원형</button> <button type="button" class="photos_ico_photos photos_btn_line" data-click="focus:linear">선형</button></div></div><button type="button" class="photos_ico_photos photos_btn_origin" data-click="focus:original">ORIGIN</button></div><div class="photos_sub_detail photos_sub_detail_vignette"><strong class="photos_screen_out">비네팅</strong><div class="photos_effect_slider"><div class="photos_slider_bar photos_slider_vignette"><input class="pp_slider_input pp_hide" snap="1" type="range" min="-100" max="100" step="1" start="0"></div></div></div><div class="photos_sub_detail photos_sub_detail_effect_all"><strong class="photos_screen_out">효과</strong><div class="photos_effect_slider_bg"></div><div class="photos_effect_slider"><div class="photos_slider_bar photos_slider_brightness"><input class="pp_slider_input pp_hide" snap="1" type="range" min="-150" max="150" step="15" start="0" mode="steps"></div><div class="photos_slider_bar photos_slider_contrast"><input class="pp_slider_input pp_hide" snap="1" type="range" min="-100" max="100" step="10" start="0" mode="steps"></div><div class="photos_slider_bar photos_slider_saturation"><input class="pp_slider_input pp_hide" snap="1" type="range" min="-100" max="100" step="10" start="0" mode="steps"></div><div class="photos_slider_bar photos_slider_warmth"><input class="pp_slider_input pp_hide" snap="1" type="range" min="-100" max="100" step="10" start="0" mode="steps"></div><div class="photos_slider_bar photos_slider_focus"><input class="pp_slider_input pp_hide" snap="1" type="range" min="-100" max="100" step="10" start="0" mode="steps"></div></div><div class="photos_detail_list"><em class="photos_screen_out">효과 목록</em><ul class="photos_list_info photos_list_effect_all photos_align_center"><li><button type="button" class="photos_btn_info photos_menu_btn_brightness" data-click="effect:brightness"><span class="photos_inner_btn"><span class="photos_ico_photos photos_ico_brightness"></span> <span class="photos_txt_item">밝기</span></span></button></li><li><button type="button" class="photos_btn_info photos_menu_btn_contrast" data-click="effect:contrast"><span class="photos_inner_btn"><span class="photos_ico_photos photos_ico_contrast"></span> <span class="photos_txt_item">대비</span></span></button></li><li><button type="button" class="photos_btn_info photos_menu_btn_saturation" data-click="effect:saturation"><span class="photos_inner_btn"><span class="photos_ico_photos photos_ico_saturation"></span> <span class="photos_txt_item">채도</span></span></button></li><li><button type="button" class="photos_btn_info photos_menu_btn_warmth" data-click="effect:warmth"><span class="photos_inner_btn"><span class="photos_ico_photos photos_ico_warmth"></span> <span class="photos_txt_item">색온도</span></span></button></li></ul></div></div><div class="photos_sub_detail photos_sub_detail_text"><strong class="photos_screen_out">텍스트</strong><div class="photos_detail_info"><div class="photos_info_btn photos_info_text"><button type="button" class="photos_ico_photos photos_btn_add" data-click="text:add">텍스트 추가</button> <button type="button" class="photos_ico_photos photos_btn_text" data-click="text:color">텍스트 색상</button> <button type="button" class="photos_ico_photos photos_btn_bold" data-click="text:bold">텍스트 굵게</button></div></div><button type="button" class="photos_ico_photos photos_btn_reset" data-click="text:reset">RESET</button></div><div class="photos_sub_detail photos_sub_detail_watermark"><strong class="photos_screen_out">워터마크</strong><div class="photos_detail_info"><div class="photos_info_btn photos_info_watermark"><div class="photos_ico_photos photos_btn_add"><label for="addWatermark" class="photos_screen_out">사진올리기</label><input class="photos_watermark_input photos_inp_file" id="addWatermark" type="file" accept="image/*"></div><button type="button" class="photos_btn_alpha photos_btn_disabled" data-click="watermark:alpha" disabled="disabled"><span class="photos_bg_photos"><span class="photos_screen_out">투명도</span>100<span class="photos_txt_percent">%</span></span></button></div></div><button type="button" class="photos_ico_photos photos_btn_reset" data-click="watermark:reset">RESET</button></div><button type="button" class="photos_btn_sub photos_btn_back" data-click="detailmenu:back"><span class="photos_ico_photos photos_ico_back">선택취소</span></button> <button type="button" class="photos_btn_sub photos_btn_ok" data-click="detailmenu:ok"><span class="photos_ico_photos photos_ico_ok">선택완료</span></button></div></div><div class="photos_icon_animation photos_hide"></div></div><div class="photos_progressbar photos_hide"></div></div>'
            , c = '@charset "utf-8";.photos_editor a,.photos_editor a:active,.photos_editor a:hover{text-decoration:none}.pp_slider{position:absolute;top:0;left:0;width:100%;height:20px;margin:0}.pp_slider_wrap{position:relative;width:100%;height:100%}.pp_slider_btn{position:absolute;top:0;left:0;width:18px;height:18px;margin-left:-9px;background-color:#ddd;border-radius:8px;z-index:1}.pp_slider_bar,.pp_slider_bg{left:0;position:absolute;top:0;height:2px;width:100%}.pp_slider_bg{margin:8px 0 0}.pp_slider_bar{background-color:#fff;opacity:.2}.pp_slider_line{position:absolute;top:0;left:0;height:2px;background-color:#fff}.pp_slider_point{position:absolute;top:0;left:0;margin:-2px 0 0 -3px;width:6px;height:6px;background-color:#fff;border-radius:6px}.pp_slider_val{position:absolute;top:-15px;width:18px;text-align:center;font-size:10px;color:#fff}.pp_slider.vertical{width:20px;height:100%;margin:0}.pp_slider.vertical .pp_slider_wrap{height:100%}.pp_slider.vertical .pp_slider_btn{margin-left:0;margin-top:-9px}.pp_slider.vertical .pp_slider_bg{width:0;height:100%;margin:0 0 0 8px}.pp_slider.vertical .pp_slider_bar{width:2px;height:100%}.pp_slider.vertical .pp_slider_line{width:2px}.pp_slider.vertical .pp_slider_point{position:absolute;top:0;left:0;width:6px;height:6px;margin:-3px 0 0 -2px;background-color:#fff;border-radius:6px}.photos_editor a:active,.photos_editor button{background-color:transparent}.pp_slider_animate{-webkit-transition:.2s ease-out;transition:.1s ease-out}.photos_editor blockquote,.photos_editor body,.photos_editor button,.photos_editor code,.photos_editor dd,.photos_editor div,.photos_editor dl,.photos_editor dt,.photos_editor fieldset,.photos_editor form,.photos_editor h1,.photos_editor h2,.photos_editor h3,.photos_editor h4,.photos_editor h5,.photos_editor h6,.photos_editor input,.photos_editor legend,.photos_editor li,.photos_editor ol,.photos_editor p,.photos_editor pre,.photos_editor select,.photos_editor td,.photos_editor textarea,.photos_editor th,.photos_editor ul{margin:0;padding:0}.photos_editor button:disabled{opacity:.3}.photos_editor fieldset,.photos_editor img{border:0}.photos_editor dl,.photos_editor li,.photos_editor menu,.photos_editor ol,.photos_editor ul{list-style:none}.photos_editor blockquote,.photos_editor q{quotes:none}.photos_editor blockquote:after,.photos_editor blockquote:before,.photos_editor q:after,.photos_editor q:before{content:"";content:none}.photos_editor button,.photos_editor input,.photos_editor select,.photos_editor textarea{vertical-align:middle}.photos_editor canvas{vertical-align:baseline}.photos_editor button{border:0;cursor:pointer}.photos_editor button:focus,.photos_editor input{outline:0}.photos_editor a{color:#333}.photos_editor address,.photos_editor caption,.photos_editor cite,.photos_editor code,.photos_editor dfn,.photos_editor em,.photos_editor var{font-style:normal;font-weight:400}.photos_editor *{-webkit-box-sizing:initial;box-sizing:initial}.photos_editor input::-ms-clear{display:none}.photos_editor .photos_ir_pm{display:block;overflow:hidden;font-size:0;line-height:0;text-indent:-9999px}.photos_editor .photos_screen_out{overflow:hidden;position:absolute;width:0;height:0;line-height:0;text-indent:-9999px}.photos_editor body,.photos_editor button,.photos_editor input,.photos_editor select,.photos_editor td,.photos_editor textarea,.photos_editor th{font-weight:300;font-size:12px;line-height:1.5;font-family:sans-serif;color:#333}.photos_editor .photos_hide,.photos_editor.photos_hide{display:none}.photos_editor .photos_align_center{display:inline-block;text-align:center}.photos_editor{-webkit-font-smoothing:antialiased;overflow:hidden;position:relative;height:100%;background-color:#1a1a1a}.photos_is_fullscreen .photos_editor{position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0}.photos_editor .photos_ico_photos{display:block;overflow:hidden;background:url(//t1.daumcdn.net/fp/photos/img/icon_default/ico_black_v2.png) no-repeat;text-indent:-9999px;vertical-align:top}.photos_editor .photos_bg{background-color:#1a1a1a}.photos_editor .photos_bg_op2{background-color:rgba(26,26,26,.2)}.photos_editor .photos_bg_photos{background:url(//t1.daumcdn.net/fp/photos/img/icon_default/bg_black.png) no-repeat}.photos_white_mode .photos_ico_photos{background-image:url(//t1.daumcdn.net/fp/photos/img/icon_default/ico_white_v2.png)}.photos_white_mode .photos_bg_photos{background-image:url(//t1.daumcdn.net/fp/photos/img/icon_default/bg_white.png)}.photos_editor .photos_img{vertical-align:top}.photos_editor .photos_container_main{display:table;width:100%;height:100%;text-align:center}.photos_container_main .photos_vertical_photo{display:table-cell;width:100%;padding-bottom:80px}.photos_container_main .photos_preview_wrapper{position:relative}.photos_editor.photos_fixed_width .photos_container_main{display:block;width:940px;height:100%;margin:0 auto}.photos_editor.photos_fixed_width .photos_menu_item{left:50%;width:992px;margin-left:-496px}.photos_editor.photos_fixed_width .photos_wrap_menu_sub .photos_menu_sub{left:50%;width:1024px;margin-left:-512px}.photos_preview_wrapper .photos_photos_img{width:100%}.photos_editor .photos_preview_canvas{position:absolute;top:0;left:0}.photos_editor .photos_preview_canvas_origin{width:100%;height:100%;position:absolute;top:0;left:0}.photos_preview_wrapper .photos_preview_noscale_wrapper,.photos_preview_wrapper .photos_preview_scale_wrapper{position:absolute}.photos_preview_wrapper.photos_preview_transparent .photos_preview_scale_wrapper{background:url(http://t1.daumcdn.net/fp/photos/img/icon_default/preview_tile.png)}.photos_preview_wrapper.photos_animate,.photos_preview_wrapper.photos_animate .photos_preview_scale_wrapper{-webkit-transition:-webkit-transform .5s ease-in-out;transition:transform .5s ease-in-out}.photos_preview_wrapper.photos_animate .photos_preview_noscale_wrapper{-webkit-transition:-webkit-transform .5s ease-in-out,width .5s ease-in-out,height .5s ease-in-out;transition:transform .5s ease-in-out,width .5s ease-in-out,height .5s ease-in-out}.photos_editor .photos_quicklist_photo{overflow:visible;position:absolute;left:0;bottom:0;width:88px;top:0;padding:0 16px 80px 0}.photos_editor .photos_quicklist_photo .photos_quicklist_area{height:100%}.photos_quicklist_photo .photos_scroll_wrap{position:relative;overflow-y:auto;overflow-x:hidden;width:95px;left:-95px;height:100%;background:url(//t1.daumcdn.net/fp/photos/img/icon_default/black_repeat.png);-webkit-transition:left .2s ease-in-out;transition:left .2s ease-in-out}.photos_quicklist_photo.photos_quicklist_open .photos_scroll_wrap{left:0}.photos_quicklist_open .photos_scroll_bar{display:block}.photos_quicklist_photo .photos_link_quick{position:relative;display:block;padding:0;margin:0 auto}.photos_quicklist_photo .photos_link_quick.photos_empty{background:#333}.photos_quicklist_photo .photos_link_quick.photos_empty img.photos_img{visibility:hidden}.photos_quicklist_photo .photos_link_quick .photos_img{border:2px solid #1a1a1a;width:52px;height:52px}.photos_editor .photos_scroll_wrap li{padding:12px 0}.photos_quicklist_photo .photos_link_quick .photos_status{display:none;position:absolute;top:0;left:0;width:100%;height:100%}.photos_quicklist_photo .photos_link_quick.photos_not_editable .photos_status{display:block;background:rgba(0,0,0,.5)}.photos_quicklist_photo .photos_link_quick.photos_edited .photos_status{display:block}.photos_quicklist_photo .photos_on .photos_img{border-color:#fff}.photos_quicklist_photo .photos_scroll_bar{display:none;position:absolute;top:0;right:0;bottom:80px;width:16px;background:url(//t1.daumcdn.net/fp/photos/img/icon_default/black_repeat.png)}.photos_quicklist_photo .photos_inner_scroll{width:3px;background-color:#fff}.photos_quicklist_photo .photos_popup{position:absolute;width:300px;font-size:10px;line-height:14px;color:#999;text-align:left;opacity:0;transition:opacity 200ms ease-in-out;-webkit-transition:opacity 200ms ease-in-out}.photos_quicklist_photo .photos_popup.photos_show{opacity:1}.photos_quicklist_photo .photos_popup .photos_txt{display:inline-block;padding:7px 8px 6px;background-color:#333;border-radius:3px}.photos_quicklist_photo .photos_popup .photos_ico_arr{position:absolute;top:50%;left:-3px;margin-top:-4px;width:0;height:0;border-bottom:4px solid transparent;border-top:4px solid transparent;border-right:4px solid #333}.photos_editor .photos_magnifier_photo{position:absolute;top:0;right:0;width:88px;height:100%;padding:40px 0 120px;-webkit-box-sizing:border-box;box-sizing:border-box}.photos_magnifier_photo .photos_inner_slider{width:88px;height:100%;-webkit-transform:translate(150px,0);transform:translate(150px,0);-webkit-transition:-webkit-transform .2s ease-in-out;transition:transform .2s ease-in-out}.photos_magnifier_photo.photos_magnifier_show .photos_inner_slider{-webkit-transform:translate(0,0);transform:translate(0,0)}.photos_magnifier_photo .photos_slider_bar.vertical{max-height:360px;left:50%;margin-top:20px}.photos_magnifier_photo .photos_slider_bar.vertical .pp_slider_btn{width:40px;height:40px;margin:-20px 0 0 -20px;background-position:-345px -90px}.photos_magnifier_photo .photos_slider_bar.vertical .pp_slider_val{width:38px;top:14px;left:-24px}.photos_magnifier_photo .photos_slider_bar.vertical .pp_slider_bg{border:20px solid #1a1a1a;border-radius:20px;margin:-20px 0 0 -20px;-webkit-transition:opacity .5s ease;transition:opacity .5s ease}.photos_magnifier_photo .photos_slider_bar.vertical .pp_slider_bar,.photos_magnifier_photo .photos_slider_bar.vertical .pp_slider_line{margin-left:-1px}.photos_magnifier_photo .photos_slider_bar.vertical .pp_slider_point{display:none}.photos_editor .photos_light_editor{position:absolute;top:0;left:50%;width:268px;height:52px;margin-left:-134px}.photos_light_editor .photos_btn_light{width:52px;height:52px;margin:0 auto;-webkit-transform:translate(0,-100%);transform:translate(0,-100%);-webkit-transition:-webkit-transform .2s ease-in-out;transition:transform .2s ease-in-out}.photos_light_editor:hover .photos_btn_light{-webkit-transform:translate(0,0);transform:translate(0,0)}.photos_light_editor .photos_ico_light{position:relative;width:22px;height:52px;margin:0 auto;background-position:-180px -110px}.photos_cancel_area{position:absolute;top:0;right:0;opacity:.1;display:block}.photos_cancel_area:hover{opacity:1}.photos_cancel_area .photos_btn_cancel{width:88px;height:80px}.photos_cancel_area .photos_btn_cancel .photos_ico_back{width:24px;height:24px;background-position:-220px -90px;position:relative;margin:0 auto}.photos_editor .photos_box_area{position:absolute;top:0;left:0;border:1px solid #fff;margin-left:-1px;margin-top:-1px}.photos_editor .photos_box_area:hover{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_move_b.png) 22 22,move}.photos_box_area .photos_tf_input{overflow:hidden;width:100%;height:100%;border:0;background:0 0;white-space:pre-wrap;word-wrap:break-word;resize:none;text-align:center;color:#fff;cursor:inherit}.photos_box_area .photos_corner_area{background-color:rgba(0,0,0,0);position:absolute;width:40px;height:40px}.photos_box_area .photos_corner_mark{position:absolute;width:13px;height:13px;border:solid #fff}.photos_box_area .photos_corner_tl{left:-10px;top:-10px;cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_tlbr_b.png) 22 22,nwse-resize}.photos_box_area .photos_corner_tl .photos_corner_mark{top:8px;left:8px;border-width:2px 0 0 2px}.photos_box_area .photos_corner_tr{top:-10px;right:-10px;cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_trbl_b.png) 22 22,nesw-resize}.photos_box_area .photos_corner_tr .photos_corner_mark{top:8px;right:8px;border-width:2px 2px 0 0}.photos_box_area .photos_corner_bl{bottom:-10px;left:-10px;cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_trbl_b.png) 22 22,nesw-resize}.photos_box_area .photos_corner_bl .photos_corner_mark{bottom:8px;left:8px;border-width:0 0 2px 2px}.photos_box_area .photos_corner_br{bottom:-10px;right:-10px;cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_tlbr_b.png) 22 22,nwse-resize}.photos_box_area .photos_corner_br .photos_corner_mark{bottom:8px;right:8px;border-width:0 2px 2px 0}.photos_box_area .photos_corner_t{left:30px;right:30px;top:-10px;width:auto;cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_tb.png) 22 22,n-resize}.photos_box_area .photos_corner_l{left:-10px;top:30px;bottom:30px;height:auto;cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_lr.png) 22 22,w-resize}.photos_box_area .photos_corner_b{left:30px;right:30px;bottom:-10px;width:auto;cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_tb.png) 22 22,s-resize}.photos_box_area .photos_corner_r{right:-10px;top:30px;bottom:30px;height:auto;cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_lr.png) 22 22,e-resize}.photos_box_area .photos_corner_out_t{left:0;top:-50px;width:100%;height:40px;border:0;cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_t.png) 19 19,n-resize}.photos_box_area .photos_corner_out_l{left:-50px;top:0;width:40px;height:100%;border:0;cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_l.png) 19 19,w-resize}.photos_box_area .photos_corner_out_b{left:0;bottom:-50px;width:100%;height:40px;border:0;cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_tb.png) 19 19,s-resize}.photos_box_area .photos_corner_out_r{right:-50px;top:0;width:40px;height:100%;border:0;cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_r.png) 19 19,e-resize}.photos_box_area .photos_corner_out_tl{left:-50px;top:-50px;width:40px;height:40px;border:0;cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_tl.png) 19 19,n-resize}.photos_box_area .photos_corner_out_tr{right:-50px;top:-50px;width:40px;height:40px;border:0;cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_tr.png) 19 19,n-resize}.photos_box_area .photos_corner_out_bl{left:-50px;bottom:-50px;width:40px;height:40px;border:0;cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_bl.png) 19 19,n-resize}.photos_box_area .photos_corner_out_br{right:-50px;bottom:-50px;width:40px;height:40px;border:0;cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_br.png) 19 19,n-resize}.photos_editor .photos_btn_next,.photos_menu_item .photos_btn_ok{right:0}.photos_box_area .photos_line_edit{position:absolute;background-color:#fff}.photos_box_area .photos_line_v{top:0;width:1px;height:100%}.photos_box_area .photos_line_h{left:0;width:100%;height:1px}.photos_editor .photos_tool_main{position:absolute;bottom:0;left:0;width:100%;min-width:408px;height:80px;background-color:#1a1a1a}.photos_tool_main .photos_menu_main{position:absolute;overflow:hidden;z-index:2;text-align:center;width:100%;height:80px;background-color:#1a1a1a;-webkit-transform:translateY(0);transform:translateY(0)}.photos_menu_main .photos_list_main_menu{overflow:hidden;height:52px;margin:14px auto 0;padding-left:8px}.photos_menu_main .photos_list_main_menu li{float:left;width:52px;height:52px;margin-right:8px}.photos_menu_main .photos_list_main_menu .photos_ico_photos{position:relative;width:52px;height:52px}.photos_menu_main .photos_btn_filter{background-position:0 0}.photos_menu_main .photos_btn_edit{background-position:-55px 0}.photos_menu_main .photos_btn_effect,.photos_menu_main .photos_btn_effect_all{background-position:-110px 0}.photos_menu_main .photos_btn_deco{background-position:-165px 0}.photos_select_filter .photos_menu_main .photos_btn_filter{background-position:0 -55px}.photos_select_edit .photos_menu_main .photos_btn_edit{background-position:-55px -55px}.photos_select_effect .photos_menu_main .photos_btn_effect{background-position:-110px -55px}.photos_select_deco .photos_menu_main .photos_btn_deco{background-position:-165px -55px}.photos_tool_main .photos_btn_quicklist{position:absolute;left:0;bottom:0;width:88px;height:80px;background-color:#1a1a1a;color:#fff}.photos_tool_main .photos_btn_quicklist .photos_num_list{display:block;position:relative;width:48px;height:40px;margin:0 auto;font-size:17px;line-height:42px;background-position:0 0}.photos_tool_main .photos_btn_quicklist.photos_quicklist_open .photos_num_list{background-position:-50px 0}.photos_tool_main .photos_btn_save{position:absolute;right:0;bottom:0;width:88px;height:80px}.photos_tool_main .photos_btn_save .photos_ico_save{position:relative;width:56px;height:56px;margin:0 auto;background-position:-60px -110px}.photos_tool_main .photos_btn_save.photos_on .photos_ico_save{background-position:-120px -110px}.photos_tool_main .photos_btn_disabled{cursor:default}.photos_tool_main .photos_btn_disabled .photos_ico_save{background-position:0 -110px}.photos_tool_main .photos_wrap_menu_sub{position:absolute;z-index:1;width:100%;bottom:80px}.photos_wrap_menu_sub .photos_menu_sub_bg{position:absolute;width:100%;height:126px;-webkit-transform:translateY(80px);transform:translateY(80px);background:url(//t1.daumcdn.net/fp/photos/img/icon_default/black_repeat.png);z-index:-2}.photos_wrap_menu_sub .photos_menu_sub{overflow:hidden;width:100%;height:120px;text-align:center;position:absolute;-webkit-transform:translateY(80px);transform:translateY(80px)}.photos_tool_main .photos_wrap_menu .photos_menu_item .photos_sub_detail,.photos_tool_main .photos_wrap_menu .photos_wrap_menu_sub .photos_menu_sub_filter{z-index:-1}.photos_tool_main .photos_list_item{overflow:hidden;position:relative;margin:20px auto 0}.photos_tool_main .photos_list_item li{float:left;padding:0 26px}.photos_tool_main .photos_list_item .photos_btn_item{float:left;width:68px;padding:12px 0 1px;color:#fff}.photos_tool_main .photos_list_item .photos_state_item .photos_inner_btn:before{content:"";position:absolute;width:4px;height:4px;border-radius:2px;top:0;left:50%;margin:-12px 0 0 -2px;background-color:#fff}.photos_list_item .photos_btn_item .photos_inner_btn{display:table;position:relative;margin:0 auto}.photos_list_item .photos_btn_item .photos_ico_photos{width:40px;height:40px;margin:0 auto}.photos_list_item .photos_btn_item .photos_txt_item{display:block;padding-top:5px;font-size:11px}.photos_editor .photos_menu_item{position:absolute;width:100%;left:0;bottom:0}.photos_menu_item .photos_btn_sub{position:absolute;top:80px;z-index:1;width:88px;height:80px;background-color:#1a1a1a}.photos_menu_item .photos_btn_sub .photos_ico_photos{position:relative;margin:0 auto}.photos_menu_item .photos_btn_back{left:0}.photos_menu_item .photos_btn_back .photos_ico_back{width:24px;height:24px;background-position:-220px -90px}.photos_menu_item .photos_btn_ok .photos_ico_ok{width:32px;height:22px;background-position:-250px -90px}.photos_menu_item .photos_btn_disabled .photos_ico_ok{background-position:-285px -90px}.photos_menu_item .photos_sub_detail{position:absolute;left:0;top:80px;width:100%;background-color:#1a1a1a;min-height:40px;text-align:center}.photos_menu_item .photos_sub_open{display:block}.photos_sub_detail .photos_btn_origin{width:76px;height:40px;margin:20px auto;background-position:-220px 0}.photos_sub_detail .photos_btn_origin.photos_on{background-position:-300px 0}.photos_sub_detail .photos_btn_reset{display:block;width:76px;height:40px;margin:20px auto;background-position:-220px -45px}.photos_sub_detail .photos_btn_reset:active{background-position:-300px -45px}.photos_menu_item .photos_detail_info{position:absolute;left:50%;bottom:104px}.photos_detail_info .photos_info_btn{overflow:hidden}.photos_info_btn .photos_ico_photos{float:left;width:32px;height:32px;margin-right:8px}.photos_detail_info .photos_inp_photos{height:20px;margin-top:7px;background:0 0;border:0;font-size:15px;text-align:center;color:#fff}.photos_menu_item .photos_detail_list{overflow:hidden;position:relative;height:80px}.photos_detail_list .photos_list_info{overflow:hidden;position:relative;padding:12px 0;margin:0 auto}.photos_detail_list .photos_list_info li{float:left;padding:0 14px}.photos_detail_list .photos_list_info .photos_btn_info{width:56px;height:56px;color:#fff}.photos_detail_list .photos_list_info .photos_on .photos_btn_info{font-weight:700;color:#1a1a1a}.photos_detail_list .photos_list_info .photos_bg_photos{display:table;position:relative;margin:0 auto}.photos_detail_list .photos_list_info .photos_txt_vertical{display:table-cell;vertical-align:middle;padding:2px 0 0 1px}.photos_detail_list .photos_btn_arr{position:absolute;top:0;width:40px;height:80px;background:url(//t1.daumcdn.net/fp/photos/img/icon_default/black_repeat.png)}.photos_detail_list .photos_btn_arr .photos_ico_photos{position:relative;width:7px;height:12px;margin:0 auto}.photos_editor .photos_select_deco .photos_menu_sub_deco,.photos_editor .photos_select_edit .photos_menu_sub_edit,.photos_editor .photos_select_effect .photos_menu_sub_effect,.photos_editor .photos_select_filter .photos_menu_sub_filter,.photos_editor .photos_sub_open .photos_menu_sub_bg{-webkit-transform:translateY(-120px);transform:translateY(-120px)}.photos_editor .photos_detail_open .photos_menu_main,.photos_editor .photos_detail_open .photos_menu_sub,.photos_editor .photos_detail_open .photos_menu_sub_bg{-webkit-transform:translateY(80px);transform:translateY(80px)}.photos_editor .photos_detail_open .photos_btn_sub,.photos_editor .photos_sub_select_brightness .photos_sub_detail_brightness,.photos_editor .photos_sub_select_contrast .photos_sub_detail_contrast,.photos_editor .photos_sub_select_crop .photos_sub_detail_crop,.photos_editor .photos_sub_select_effectAll .photos_sub_detail_effect_all,.photos_editor .photos_sub_select_filter .photos_sub_detail_filter,.photos_editor .photos_sub_select_focus .photos_sub_detail_focus,.photos_editor .photos_sub_select_saturation .photos_sub_detail_saturation,.photos_editor .photos_sub_select_size .photos_sub_detail_size,.photos_editor .photos_sub_select_sticker .photos_sub_detail_sticker,.photos_editor .photos_sub_select_text .photos_sub_detail_text,.photos_editor .photos_sub_select_vignette .photos_sub_detail_vignette,.photos_editor .photos_sub_select_warmth .photos_sub_detail_warmth,.photos_editor .photos_sub_select_watermark .photos_sub_detail_watermark{-webkit-transform:translateY(-160px);transform:translateY(-160px);z-index:1}.photos_editor .photos_sub_select_filter .photos_menu_sub_bg,.photos_editor .photos_sub_select_filter .photos_menu_sub_filter{-webkit-transform:translateY(-120px);transform:translateY(-120px)}.photos_editor .photos_detail_open .photos_menu_item{z-index:3}.photos_editor .photos_btn_detail{position:absolute;top:0;width:88px;height:120px;background:url(//t1.daumcdn.net/fp/photos/img/icon_default/black_repeat.png)}.photos_editor .photos_btn_detail .photos_ico_photos{position:relative;width:7px;height:12px;margin:0 auto}.photos_editor .photos_btn_prev{left:0}.photos_editor .photos_btn_prev .photos_ico_prev{background-position:-320px -90px}.photos_editor .photos_btn_next .photos_ico_next{background-position:-330px -90px}.photos_wrap_menu_sub .photos_list_wrapper{width:100%;overflow:hidden}.photos_wrap_menu_sub .photos_list_filter{margin:8px 0 0}.photos_list_filter .photos_menu_filter_item,.photos_wrap_menu_sub .photos_list_filter .photos_menu_category_item{margin-left:12px}.photos_wrap_menu_sub .photos_list_filter li{padding:0}.photos_wrap_menu_sub .photos_list_filter .photos_menu_category_item .photos_btn_item{width:72px}.photos_wrap_menu_sub .photos_list_filter .photos_list_sub{width:0;height:107px;overflow:hidden;float:left}.photos_wrap_menu_sub .photos_list_filter,.photos_wrap_menu_sub .photos_list_filter .photos_list_sub{-webkit-transition-property:-webkit-transform,width;-webkit-transition-duration:300ms;transition-property:transform,width;transition-duration:300ms}.photos_list_filter .photos_menu_filter_item .photos_btn_item{font-size:11px;width:72px}.photos_tool_main .photos_list_item .photos_unfold .photos_btn_category.photos_state_item .photos_inner_btn:before{content:none}.photos_tool_main .photos_list_filter .photos_menu_filter_item .photos_state_item .photos_inner_btn:before{width:100%;height:2px;border-radius:0;top:-6px;left:0;margin:0}.photos_tool_main .photos_list_item .photos_btn_category .photos_txt_item{font-size:13px}.photos_list_filter .photos_menu_filter_item .photos_txt_item{margin-top:-4px}.photos_list_filter .photos_menu_category_item.photos_unfold .photos_btn_category{cursor:w-resize}.photos_tool_main .photos_menu_sub_filter .photos_menu_filter_next,.photos_tool_main .photos_menu_sub_filter .photos_menu_filter_prev{-webkit-transition-duration:200ms;-webkit-transition-timing-function:ease-in-out;transition-duration:200ms;transition-timing-function:ease-in-out;opacity:.3}.photos_tool_main .photos_menu_sub_filter .photos_menu_filter_prev{-webkit-transition-property:left,opacity;transition-property:left,opacity;left:-50px}.photos_tool_main .photos_menu_sub_filter .photos_menu_filter_next{-webkit-transition-property:right,opacity;transition-property:right,opacity;right:-50px}.photos_tool_main .photos_menu_sub_filter .photos_menu_filter_next:hover,.photos_tool_main .photos_menu_sub_filter .photos_menu_filter_prev:hover{opacity:1}.photos_tool_main .photos_menu_sub_filter .photos_menu_filter_prev:hover{left:0}.photos_tool_main .photos_menu_sub_filter .photos_menu_filter_next:hover{right:0}.photos_tool_main .photos_menu_sub_filter .photos_menu_filter_next:disabled,.photos_tool_main .photos_menu_sub_filter .photos_menu_filter_prev:disabled{opacity:0}.photos_editor .photos_tools_filter{position:absolute;top:0;left:0;margin:0;padding:0;width:100%;height:100%}.photos_tools_filter .photos_btn_next,.photos_tools_filter .photos_btn_prev{left:50%;width:70px;height:70px;-webkit-transition:opacity 200ms ease-in-out;transition:opacity 200ms ease-in-out;opacity:.3;top:100%;margin-top:-300px}.photos_tools_filter .photos_btn_next:hover,.photos_tools_filter .photos_btn_prev:hover{opacity:1}.photos_tools_filter .photos_btn_prev{margin-left:-100px}.photos_tools_filter .photos_btn_next{margin-left:30px}.photos_tools_filter .photos_filter_origin{width:100%;height:100%;padding:0;text-indent:-9999px;top:0;left:0;background-color:rgba(0,0,0,0)}.photos_wrap_menu_sub .photos_list_edit .photos_ico_crop{background-position:0 -170px}.photos_wrap_menu_sub .photos_list_edit .photos_ico_size{background-position:-40px -170px}.photos_ani_ico_brightness,.photos_effect_slider .photos_slider_brightness .pp_slider_btn,.photos_sub_detail_effect_all .photos_ico_brightness,.photos_wrap_menu_sub .photos_list_effect .photos_ico_brightness{background-position:-80px -170px}.photos_ani_ico_contrast,.photos_effect_slider .photos_slider_contrast .pp_slider_btn,.photos_sub_detail_effect_all .photos_ico_contrast,.photos_wrap_menu_sub .photos_list_effect .photos_ico_contrast{background-position:-120px -170px}.photos_ani_ico_saturation,.photos_effect_slider .photos_slider_saturation .pp_slider_btn,.photos_sub_detail_effect_all .photos_ico_saturation,.photos_wrap_menu_sub .photos_list_effect .photos_ico_saturation{background-position:-160px -170px}.photos_ani_ico_warmth,.photos_effect_slider .photos_slider_warmth .pp_slider_btn,.photos_sub_detail_effect_all .photos_ico_warmth,.photos_wrap_menu_sub .photos_list_effect .photos_ico_warmth{background-position:0 -210px}.photos_ani_ico_focus,.photos_effect_slider .photos_slider_focus .pp_slider_btn,.photos_sub_detail_effect_all .photos_ico_focus,.photos_wrap_menu_sub .photos_list_effect .photos_ico_focus{background-position:-40px -210px}.photos_ani_ico_vignette,.photos_effect_slider .photos_slider_vignette .pp_slider_btn,.photos_sub_detail_effect_all .photos_ico_vignette,.photos_wrap_menu_sub .photos_list_effect .photos_ico_vignette{background-position:0 -250px}.photos_ani_ico_auto,.photos_effect_slider .photos_slider_auto .pp_slider_btn,.photos_sub_detail_effect_all .photos_ico_auto,.photos_wrap_menu_sub .photos_list_effect .photos_ico_auto{background-position:-40px -250px}.photos_list_effect_all .photos_state_item{position:relative;overflow:visible}.photos_list_effect_all .photos_state_item .photos_inner_btn:before{content:"";position:absolute;width:4px;height:4px;border-radius:2px;top:-7px;left:50%;background-color:#fff;margin-left:-2px}.photos_list_effect_all .photos_btn_info .photos_ico_photos{width:40px;height:40px;margin:0 auto}.photos_menu_item .photos_sub_detail_effect_all .photos_effect_slider{position:absolute;top:100%;width:100%}.photos_sub_detail_effect_all .photos_effect_slider .photos_slider_bar{position:absolute;width:696px;left:50%;margin-left:-348px}.photos_sub_detail_effect_all .photos_effect_slider_bg{position:absolute;background-color:rgba(26,26,26,.97);width:100%;height:100px;top:100%}.photos_sub_detail_effect_all.photos_select_brightness .photos_effect_slider_bg,.photos_sub_detail_effect_all.photos_select_contrast .photos_effect_slider_bg,.photos_sub_detail_effect_all.photos_select_focus .photos_effect_slider_bg,.photos_sub_detail_effect_all.photos_select_saturation .photos_effect_slider_bg,.photos_sub_detail_effect_all.photos_select_warmth .photos_effect_slider_bg{-webkit-transform:translateY(-170px);transform:translateY(-170px)}.photos_sub_detail_effect_all.photos_select_brightness .photos_slider_brightness,.photos_sub_detail_effect_all.photos_select_contrast .photos_slider_contrast,.photos_sub_detail_effect_all.photos_select_focus .photos_slider_focus,.photos_sub_detail_effect_all.photos_select_saturation .photos_slider_saturation,.photos_sub_detail_effect_all.photos_select_warmth .photos_slider_warmth{-webkit-transform:translateY(-150px);transform:translateY(-150px)}.photos_wrap_menu_sub .photos_list_deco .photos_ico_text{background-position:-80px -210px}.photos_wrap_menu_sub .photos_list_deco .photos_ico_watermark{background-position:-120px -210px}.photos_wrap_menu_sub .photos_list_deco .photos_ico_sticker{background-position:-160px -210px}.photos_tools_crop .photos_detail_info{position:absolute;top:0;left:0}.photos_detail_info .photos_info_rotate{position:relative;height:72px;margin-bottom:0}.photos_info_rotate .photos_wrap_rotate{position:relative;z-index:1;width:120px;margin:10px auto 0}.photos_info_rotate .photos_degree_input{width:40px;height:32px;margin:0 auto;background-position:-100px 0}.photos_info_rotate .photos_inp_photos{width:29px;margin-left:-18px;text-align:right}.photos_info_rotate .photos_btn_rotate_r{position:absolute;top:0;left:0;background-position:-205px -120px}.photos_info_rotate .photos_btn_rotate_r.photos_on{background-position:-240px -120px}.photos_info_rotate .photos_btn_flip_h{position:absolute;top:0;right:0;margin-right:0;background-position:-205px -155px}.photos_info_rotate .photos_btn_flip_h.photos_on{background-position:-240px -155px}.photos_info_rotate .photos_wrap_protractor{position:absolute;bottom:10px;left:0;width:100%;height:512px;cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_tb.png) 19 19,n-resize}.photos_white_mode .photos_info_rotate .photos_wrap_protractor{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_tb_w.png) 19 19,n-resize}.photos_crop_dimmed{position:absolute;left:0;top:0;opacity:.95;-webkit-transition:opacity 200ms ease-in-out;transition:opacity 200ms ease-in-out}.photos_crop_dimmed.photos_editing{opacity:.7}.photos_crop_dimmed_bottom,.photos_crop_dimmed_left,.photos_crop_dimmed_right,.photos_crop_dimmed_top{position:absolute;background-color:#1a1a1a}.photos_white_mode .photos_crop_dimmed_bottom,.photos_white_mode .photos_crop_dimmed_left,.photos_white_mode .photos_crop_dimmed_right,.photos_white_mode .photos_crop_dimmed_top{background-color:#fff}.photos_crop_dimmed_top{top:0}.photos_crop_dimmed_bottom{bottom:0}.photos_crop_dimmed_left{left:0;height:100%}.photos_crop_dimmed_right{right:0;height:100%}.photos_list_crop .photos_btn_info .photos_inner_btn{margin:auto;background:none;outline:rgba(102,102,102,.2) solid 1px;display:table;position:relative;-webkit-transition-property:width,height,line-height;-webkit-transition-duration:200ms;-webkit-transition-timing-function:ease-in-out;transition-property:width,height,line-height;transition-duration:200ms;transition-timing-function:ease-in-out}.photos_white_mode .photos_list_crop .photos_btn_info .photos_inner_btn{outline-color:rgba(26,26,26,.2)}.photos_list_crop .photos_btn_info.photos_on .photos_inner_btn{outline-color:#fff;background-color:#fff;color:#1a1a1a}.photos_white_mode .photos_list_crop .photos_btn_info.photos_on .photos_inner_btn{outline-color:#1a1a1a;background-color:#1a1a1a;color:#fff}.photos_list_crop .photos_btn_info .photos_txt_vertical.photos_rotate,.photos_list_crop.photos_ratio_r .photos_btn_info .photos_txt_vertical{display:none}.photos_list_crop.photos_ratio_r .photos_btn_info .photos_txt_vertical.photos_rotate{display:table-cell}.photos_list_crop .photos_btn_info .photos_inner_btn .photos_txt_vertical:after,.photos_list_crop .photos_btn_info .photos_inner_btn .photos_txt_vertical:before,.photos_list_crop .photos_btn_info .photos_inner_btn:after,.photos_list_crop .photos_btn_info .photos_inner_btn:before{position:absolute;width:4px;height:4px;border:solid #666;content:" "}.photos_list_crop .photos_btn_info.photos_on .photos_inner_btn .photos_txt_vertical:after,.photos_list_crop .photos_btn_info.photos_on .photos_inner_btn .photos_txt_vertical:before,.photos_list_crop .photos_btn_info.photos_on .photos_inner_btn:after,.photos_list_crop .photos_btn_info.photos_on .photos_inner_btn:before{border-color:#fff}.photos_white_mode .photos_list_crop .photos_btn_info.photos_on .photos_inner_btn .photos_txt_vertical:after,.photos_white_mode .photos_list_crop .photos_btn_info.photos_on .photos_inner_btn .photos_txt_vertical:before,.photos_white_mode .photos_list_crop .photos_btn_info.photos_on .photos_inner_btn:after,.photos_white_mode .photos_list_crop .photos_btn_info.photos_on .photos_inner_btn:before{border-color:#1a1a1a}.photos_list_crop .photos_btn_info .photos_inner_btn:before{top:-1px;left:-1px;border-width:1px 0 0 1px}.photos_list_crop .photos_btn_info .photos_inner_btn:after{top:-1px;right:-1px;border-width:1px 1px 0 0}.photos_list_crop .photos_btn_info .photos_inner_btn .photos_txt_vertical:before{bottom:-1px;right:-1px;border-width:0 1px 1px 0}.photos_list_crop .photos_btn_info .photos_inner_btn .photos_txt_vertical:after{bottom:-1px;left:-1px;border-width:0 0 1px 1px}.photos_list_crop .photos_ratio_free .photos_inner_btn,.photos_list_crop .photos_ratio_origin .photos_inner_btn,.photos_list_crop.photos_ratio_r .photos_ratio_origin_r .photos_inner_btn{width:46px;height:30px}.photos_list_crop .photos_ratio_origin_r .photos_inner_btn,.photos_list_crop.photos_ratio_r .photos_ratio_origin .photos_inner_btn{width:30px;height:46px}.photos_list_crop .photos_ratio_1_1 .photos_inner_btn{width:38px;height:38px}.photos_list_crop .photos_ratio_3_2 .photos_inner_btn,.photos_list_crop.photos_ratio_r .photos_ratio_2_3 .photos_inner_btn{width:46px;height:30px}.photos_list_crop .photos_ratio_2_3 .photos_inner_btn,.photos_list_crop.photos_ratio_r .photos_ratio_3_2 .photos_inner_btn{width:30px;height:46px}.photos_list_crop .photos_ratio_4_3 .photos_inner_btn,.photos_list_crop.photos_ratio_r .photos_ratio_3_4 .photos_inner_btn{width:42px;height:34px}.photos_list_crop .photos_ratio_3_4 .photos_inner_btn,.photos_list_crop.photos_ratio_r .photos_ratio_4_3 .photos_inner_btn{width:34px;height:42px}.photos_list_crop .photos_ratio_16_9 .photos_inner_btn,.photos_list_crop.photos_ratio_r .photos_ratio_9_16 .photos_inner_btn{width:48px;height:28px}.photos_list_crop .photos_ratio_9_16 .photos_inner_btn,.photos_list_crop.photos_ratio_r .photos_ratio_16_9 .photos_inner_btn{width:28px;height:48px}.photos_crop_draggable{position:absolute;width:100%;height:100%;background-color:rgba(0,0,0,0)}.photos_tools_crop .photos_box_area .photos_line_edit{display:none}.photos_tools_crop .photos_box_area.photos_preview_move .photos_line_edit{display:block}.photos_tools_crop .photos_box_area.photos_preview_move .photos_line_edit.photos_line_angle{display:none}.photos_tools_crop .photos_box_area.photos_preview_rotate .photos_line_edit{display:block}.photos_sub_detail_size .photos_detail_info{margin-left:-88px}.photos_detail_info .photos_info_size{width:176px}.photos_info_size .photos_size_input{float:left;width:60px;height:32px;margin-right:8px;background-position:-145px 0}.photos_info_size .photos_size_input .photos_inp_photos{width:38px;margin-left:-7px}.photos_info_size .photos_btn_lock{background-position:-205px -190px}.photos_info_locked .photos_size_input{background-position:-210px 0}.photos_info_locked .photos_btn_lock{background-position:-240px -190px}.photos_info_locked .photos_size_input .photos_inp_photos{color:#1a1a1a}.photos_controls_size,.photos_size_outline{position:absolute;width:100%;height:100%;top:0;left:0}.photos_controls_size .photos_size_outline{border:2px solid rgba(255,255,255,0);-webkit-transition:border-color .5s linear;transition:border-color .5s linear;margin:-2px}.photos_white_mode .photos_size_outline{border-color:rgba(26,26,26,0)}.photos_size_outline.photos_size_outline_height,.photos_size_outline.photos_size_outline_width{-webkit-transition:null;transition:null}.photos_size_outline.photos_size_outline_width{border-bottom-color:rgba(255,255,255,255);border-top-color:rgba(255,255,255,255)}.photos_white_mode .photos_size_outline.photos_size_outline_width{border-bottom-color:rgba(26,26,26,255);border-top-color:rgba(26,26,26,255)}.photos_size_outline.photos_size_outline_height{border-left-color:rgba(255,255,255,255);border-right-color:rgba(255,255,255,255)}.photos_white_mode .photos_size_outline.photos_size_outline_height{border-left-color:rgba(26,26,26,255);border-right-color:rgba(26,26,26,255)}.photos_list_size{left:-14px}.photos_list_size .photos_btn_info .photos_size_origin{background:0 0;width:48px;height:32px;border:1px solid #666}.photos_list_size .photos_btn_info .photos_size_w{width:48px;height:32px;background-position:-95px -235px}.photos_list_size .photos_btn_info .photos_size_h{width:48px;height:32px;background-position:-95px -280px}.photos_preview_focus_layer{position:absolute;top:0;left:0}.photos_menu_item .photos_info_focus{width:80px;padding-left:8px;margin-left:-40px}.photos_info_focus .photos_btn_circle{height:33px;background-position:-275px -119px}.photos_info_focus .photos_btn_line{height:33px;background-position:-275px -154px}.photos_info_focus .photos_btn_circle.photos_on{height:33px;background-position:-310px -119px}.photos_info_focus .photos_btn_line.photos_on{height:33px;background-position:-310px -154px}.photos_detail_info .photos_info_text{width:123px;margin-left:-61px;padding-left:4px}.photos_info_text .photos_btn_add{width:33px;height:33px;background-position:-205px -224px}.photos_info_text .photos_btn_text{width:33px;height:33px;background-position:-275px -189px}.photos_info_text .photos_btn_bold{width:33px;height:33px;background-position:-275px -224px}.photos_info_text .photos_btn_add:active{height:33px;background-position:-240px -224px}.photos_info_text .photos_btn_text.photos_on{height:33px;background-position:-310px -189px}.photos_info_text .photos_btn_bold.photos_on{height:33px;background-position:-310px -224px}.photos_detail_info .photos_info_watermark{width:80px;margin-left:-40px}.photos_info_watermark .photos_btn_add{position:relative;height:33px;background-position:-205px -224px;cursor:pointer}.photos_info_watermark .photos_btn_add:active{height:33px;background-position:-240px -224px}.photos_info_watermark .photos_btn_add .photos_inp_file{position:absolute;top:0;left:0;width:32px;height:32px;opacity:0;filter:alpha(opacity=0);cursor:pointer}.photos_info_watermark .photos_btn_alpha{float:left;width:40px;height:32px;font-size:15px;color:#fff}.photos_info_watermark .photos_btn_alpha.photos_btn_disabled{color:#626262}.photos_white_mode .photos_box_area .photos_tf_input,.photos_white_mode .photos_detail_info .photos_inp_photos,.photos_white_mode .photos_list_info .photos_btn_info,.photos_white_mode .photos_list_item .photos_btn_item,.photos_white_mode.photos_editor .photos_slider_bar .pp_slider_btn .pp_slider_val{color:#1a1a1a}.photos_info_watermark .photos_btn_alpha .photos_bg_photos{display:block;width:40px;height:33px;line-height:35px;background-position:-205px -224px}.photos_info_watermark .photos_btn_alpha .photos_txt_percent{font-size:11px}.photos_white_mode{background-color:#fff}.photos_white_mode.photos_editor .photos_magnifier_photo .photos_slider_bar.vertical .pp_slider_bg{border:20px solid #fff}.photos_white_mode.photos_editor .photos_slider_bar .pp_slider_btn{background-color:#fff;background-image:url(//t1.daumcdn.net/fp/photos/img/icon_default/ico_white_v2.png)}.photos_white_mode .photos_detail_list .photos_btn_arr,.photos_white_mode .photos_menu_sub_bg,.photos_white_mode .photos_quicklist_photo .photos_scroll_bar,.photos_white_mode .photos_quicklist_photo .photos_scroll_wrap,.photos_white_mode .photos_tool_main .photos_menu_item,.photos_white_mode.photos_editor .photos_btn_detail{background-image:url(//t1.daumcdn.net/fp/photos/img/icon_default/white_repeat.png)}.photos_white_mode.photos_editor .photos_slider_bar .pp_slider_bar{background-color:#e0e0e0}.photos_white_mode .photos_box_area .photos_line_edit,.photos_white_mode .photos_quicklist_photo .photos_inner_scroll,.photos_white_mode.photos_editor .photos_slider_bar .pp_slider_point{background-color:#1a1a1a}.photos_white_mode .photos_quicklist_photo .photos_img{border-color:#fff}.photos_white_mode .photos_box_area,.photos_white_mode .photos_box_area .photos_corner_mark,.photos_white_mode .photos_quicklist_photo .photos_on .photos_img{border-color:#1a1a1a}.photos_white_mode .photos_box_area:hover{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_move_w.png) 22 22,move}.photos_white_mode .photos_box_area .photos_corner_tl{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_tlbr_w.png) 22 22,nwse-resize}.photos_white_mode .photos_box_area .photos_corner_bl,.photos_white_mode .photos_box_area .photos_corner_tr{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_trbl_w.png) 22 22,nesw-resize}.photos_white_mode .photos_box_area .photos_corner_br{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_tlbr_w.png) 22 22,nwse-resize}.photos_white_mode .photos_box_area .photos_corner_t{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_tb_w.png) 22 22,n-resize}.photos_white_mode .photos_box_area .photos_corner_l{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_lr_w.png) 22 22,w-resize}.photos_white_mode .photos_box_area .photos_corner_b{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_tb_w.png) 22 22,s-resize}.photos_white_mode .photos_box_area .photos_corner_r{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_lr_w.png) 22 22,e-resize}.photos_white_mode .photos_box_area .photos_corner_out_t{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_t_w.png) 19 19,n-resize}.photos_white_mode .photos_box_area .photos_corner_out_l{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_l_w.png) 19 19,w-resize}.photos_white_mode .photos_box_area .photos_corner_out_b{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_tb_w.png) 19 19,s-resize}.photos_white_mode .photos_box_area .photos_corner_out_r{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_r_w.png) 19 19,e-resize}.photos_white_mode .photos_box_area .photos_corner_out_tl{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_tl_w.png) 19 19,n-resize}.photos_white_mode .photos_box_area .photos_corner_out_tr{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_tr_w.png) 19 19,n-resize}.photos_white_mode .photos_box_area .photos_corner_out_bl{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_bl_w.png) 19 19,n-resize}.photos_white_mode .photos_box_area .photos_corner_out_br{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_br_w.png) 19 19,n-resize}.photos_white_mode .photos_menu_main,.photos_white_mode .photos_tool_main{background-color:#fff}.photos_white_mode .photos_tool_main .photos_btn_quicklist{background-color:#fff;color:#1a1a1a}.photos_white_mode .photos_list_item .photos_state_item .photos_inner_btn:before{background-color:#1a1a1a}.photos_white_mode .photos_menu_item,.photos_white_mode .photos_menu_item .photos_btn_sub,.photos_white_mode .photos_menu_item .photos_sub_detail{background-color:#fff}.photos_white_mode .photos_info_locked .photos_size_input .photos_inp_photos,.photos_white_mode .photos_list_info .photos_on .photos_btn_info{color:#fff}.photos_white_mode .photos_info_watermark .photos_btn_alpha{color:#1a1a1a}.photos_white_mode .photos_icon_animation{background-image:url(//t1.daumcdn.net/fp/photos/img/icon_default/ico_white_v2.png)}.photos_editor .photos_progressbar{position:absolute;top:50%;left:50%;width:28px;height:28px;margin:-14px 0 0 -14px;border:2px solid #fff;border-radius:100%;background-repeat:no-repeat;background-image:url(//t1.daumcdn.net/fp/photos/img/icon_default/loading3_black.gif)}.photos_editor.photos_white_mode .photos_progressbar{border:2px solid #1a1a1a;background-image:url(//t1.daumcdn.net/fp/photos/img/icon_default/loading3_white.gif)}.photos_editor .photos_progressbar_new{position:absolute;top:50%;left:50%;width:295px;height:439px;margin:-283px 0 0 -147px;border:5px solid #fff;opacity:1}.photos_editor .photos_slider_bar .pp_slider_btn,.photos_icon_animation{height:40px;vertical-align:top;width:40px;background-repeat:no-repeat;background-image:url(//t1.daumcdn.net/fp/photos/img/icon_default/ico_black_v2.png)}.photos_editor .photos_progressbar_new .photos_hide{opacity:0;-webkit-transition:opacity .5s ease;transition:opacity .5s ease}.photos_editor .photos_progressbar_new .photos_tit_photos{display:block;margin-top:324px;font-size:38px;color:#fff;text-align:center;line-height:1.5}.photos_editor .photos_progressbar_new .photos_txt_photos{display:block;font-size:20px;color:#fff;text-align:center}.photos_tool_main .photos_btn_sub,.photos_tool_main .photos_menu_main,.photos_tool_main .photos_menu_sub,.photos_tool_main .photos_menu_sub_bg,.photos_tool_main .photos_sub_detail{-webkit-transition:-webkit-transform 200ms ease-in-out;transition:transform 200ms ease-in-out}.photos_icon_animation{overflow:hidden;position:absolute;left:0;top:0;z-index:4;text-indent:-9999px}.photos_editor .photos_slider_bar{position:relative}.photos_editor .photos_slider_bar .pp_slider_line{background-color:#666}.photos_editor .photos_slider_bar .pp_slider_bar{opacity:1;background-color:#292929}.photos_editor .photos_slider_bar .pp_slider_btn{position:absolute;margin:-20px 0 0 -20px;border-radius:20px;cursor:pointer;background-color:#1a1a1a}.photos_menu_item .photos_effect_slider{width:696px;margin:0 auto;padding:20px 0}.photos_effect_slider .photos_slider_bar{max-width:696px;height:40px}.photos_effect_slider .photos_slider_bar .pp_slider_bg{margin-top:19px}.photos_effect_slider .photos_slider_bar .pp_slider_btn{top:50%}.photos_effect_slider .photos_slider_bar .pp_slider_point{display:none}.photos_effect_slider .photos_slider_bar .pp_slider_btn .pp_slider_val{text-indent:0;width:40px}.resizable{display:block;position:absolute;top:0;left:0;border:1px solid #fff}.resizable.movable:hover{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_move_b.png) 22 22,move}.resizable .drag_btn{position:absolute}.resizable .remove_handle{top:-18px;right:-18px;color:#fff;font-size:10px;width:12px;height:12px;background:#000;border:2px solid #fff;border-radius:100%;box-shadow:0 1px 1px rgba(0,0,0,.3)}.resizable .remove_handle:hover{cursor:default}.resizable.no_border{border:none;margin:1px 0 0 1px}.resizable.no_border .corner_wrap,.resizable.no_handle .drag_btn{display:none}.resizable .corner_mark{position:absolute;width:13px;height:13px;border:solid #fff;background-color:rgba(0,0,0,0)}.resizable .corner_lt{left:-3px;top:-3px;border-width:2px 0 0 2px}.resizable .corner_rt{right:-3px;top:-3px;border-width:2px 2px 0 0}.resizable .corner_lb{left:-3px;bottom:-3px;border-width:0 0 2px 2px}.resizable .corner_rb{right:-3px;bottom:-3px;border-width:0 2px 2px 0}.resizable .corner_lt:hover,.resizable .corner_rb:hover{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_tlbr_b.png) 22 22,nwse-resize}.resizable .corner_lb:hover,.resizable .corner_rt:hover{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_trbl_b.png) 22 22,nesw-resize}.photos_controls_deco.photos_deco_off{opacity:0}.photos_controls_deco .textbox{width:300px;height:44px}.photos_controls_deco,.ss-content,.ss-wrapper{height:100%;width:100%}.photos_controls_deco .textbox textarea{border:none;background:0 0;width:100%;height:100%;font-size:42px;font-family:Arial,sans-serif;text-align:center;line-height:100%;box-shadow:none;white-space:pre-wrap;word-wrap:break-word;resize:none;overflow:hidden;cursor:inherit;padding:0;color:#fff}.photos_controls_deco{background-color:rgba(0,0,0,0)}.photos_controls_deco .text_proxy{position:absolute;left:0;top:0;overflow:hidden;line-height:100%;font-size:24px;font-weight:400;text-shadow:none;content-shadow:none;margin:0;padding:0 24px;box-sizing:content-box;-webkit-box-sizing:content-box;visibility:hidden}.ss-content,.ss-scroll,.ss-wrapper{position:relative}.photos_controls_deco .text_proxy .proxy_get_size{display:inline;font-family:inherit;font-size:inherit;line-height:100%;font-style:normal;margin:0;box-sizing:content-box;-webkit-box-sizing:content-box;float:left;border:1px solid #000;padding:0 10px}.photos_white_mode .resizable,.photos_white_mode .resizable .corner_mark{border-color:#1a1a1a}.photos_editor .photos_controls_deco.custom_cursor_l{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_l.png) 19 19,w-resize}.photos_editor .photos_controls_deco.custom_cursor_r{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_r.png) 19 19,e-resize}.photos_editor .photos_controls_deco.custom_cursor_t{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_t.png) 19 19,n-resize}.photos_editor .photos_controls_deco.custom_cursor_b{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_tb.png) 19 19,s-resize}.photos_editor .photos_controls_deco.custom_cursor_lt{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_tl.png) 19 19,nwse-resize}.photos_editor .photos_controls_deco.custom_cursor_rt{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_tr.png) 19 19,nesw-resize}.photos_editor .photos_controls_deco.custom_cursor_lb{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_bl.png) 19 19,nesw-resize}.photos_editor .photos_controls_deco.custom_cursor_rb{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_br.png) 19 19,nwse-resize}.photos_white_mode .resizable.movable:hover{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_move_w.png) 22 22,move}.photos_white_mode .resizable .corner_lt:hover,.photos_white_mode .resizable .corner_rb:hover{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_tlbr_w.png) 22 22,nwse-resize}.photos_white_mode .resizable .corner_lb:hover,.photos_white_mode .resizable .corner_rt:hover{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_trbl_w.png) 22 22,nesw-resize}.photos_white_mode .photos_controls_deco.custom_cursor_l{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_l_w.png) 19 19,w-resize}.photos_white_mode .photos_controls_deco.custom_cursor_r{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_r_w.png) 19 19,e-resize}.photos_white_mode .photos_controls_deco.custom_cursor_t{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_t_w.png) 19 19,n-resize}.photos_white_mode .photos_controls_deco.custom_cursor_b{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_tb_w.png) 19 19,s-resize}.photos_white_mode .photos_controls_deco.custom_cursor_lt{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_tl_w.png) 19 19,nwse-resize}.photos_white_mode .photos_controls_deco.custom_cursor_rt{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_tr_w.png) 19 19,nesw-resize}.photos_white_mode .photos_controls_deco.custom_cursor_lb{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_bl_w.png) 19 19,nesw-resize}.photos_white_mode .photos_controls_deco.custom_cursor_rb{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_br_w.png) 19 19,nwse-resize}.photos_white_mode .photos_controls_deco .textbox textarea{color:#1a1a1a}@media only screen and (-webkit-min-device-pixel-ratio :1.5),only screen and (min-device-pixel-ratio :1.5){.photos_editor .photos_ico_photos,.photos_editor .photos_icon_animation,.photos_editor .photos_slider_bar .pp_slider_btn{background-image:url(//t1.daumcdn.net/fp/photos/img/icon_default/ico_black_rtl_v2.png);-webkit-background-size:380px 300px;background-size:380px 300px}.photos_editor .photos_bg_photos{background-image:url(//t1.daumcdn.net/fp/photos/img/icon_default/bg_black_rtl.png);-webkit-background-size:270px 330px;background-size:270px 330px}.photos_editor.photos_white_mode .photos_ico_photos,.photos_editor.photos_white_mode .photos_icon_animation,.photos_editor.photos_white_mode .photos_slider_bar .pp_slider_btn{background-image:url(//t1.daumcdn.net/fp/photos/img/icon_default/ico_white_rtl_v2.png);-webkit-background-size:380px 300px;background-size:380px 300px}.photos_editor.photos_white_mode .photos_bg_photos{background-image:url(//t1.daumcdn.net/fp/photos/img/icon_default/bg_white_rtl.png);-webkit-background-size:270px 330px;background-size:270px 330px}}.ss-wrapper{overflow:hidden;z-index:1;float:left}.ss-content{padding:0 32px 0 0;right:-18px;overflow:auto;-moz-box-sizing:border-box;box-sizing:border-box}.ss-scroll{background:rgba(0,0,0,.1);width:9px;border-radius:4px;top:0;z-index:2;cursor:pointer;opacity:1}.ss-grabbed{user-select:none;-o-user-select:none;-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none}.photos_quicklist_open .photos_custom_scroll_on .photos_list_quick{position:relative;left:-9px}.photos_editor.photos_msie .photos_box_area:hover{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_move_b.cur),move}.photos_editor.photos_msie .photos_box_area .photos_corner_tl{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_tlbr_b.cur),nwse-resize}.photos_editor.photos_msie .photos_box_area .photos_corner_bl,.photos_editor.photos_msie .photos_box_area .photos_corner_tr{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_trbl_b.cur),nesw-resize}.photos_editor.photos_msie .photos_box_area .photos_corner_br{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_tlbr_b.cur),nwse-resize}.photos_editor.photos_msie .photos_box_area .photos_corner_t{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_tb.cur),n-resize}.photos_editor.photos_msie .photos_box_area .photos_corner_l{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_lr.cur),w-resize}.photos_editor.photos_msie .photos_box_area .photos_corner_b{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_tb.cur),s-resize}.photos_editor.photos_msie .photos_box_area .photos_corner_r{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_lr.cur),e-resize}.photos_editor.photos_msie .photos_box_area .photos_corner_out_t{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_t.cur),n-resize}.photos_editor.photos_msie .photos_box_area .photos_corner_out_l{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_l.cur),w-resize}.photos_editor.photos_msie .photos_box_area .photos_corner_out_b{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_tb.cur),s-resize}.photos_editor.photos_msie .photos_box_area .photos_corner_out_r{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_r.cur),e-resize}.photos_editor.photos_msie .photos_box_area .photos_corner_out_tl{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_tl.cur),n-resize}.photos_editor.photos_msie .photos_box_area .photos_corner_out_tr{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_tr.cur),n-resize}.photos_editor.photos_msie .photos_box_area .photos_corner_out_bl{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_bl.cur),n-resize}.photos_editor.photos_msie .photos_box_area .photos_corner_out_br{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_br.cur),n-resize}.photos_editor.photos_msie .photos_info_rotate .photos_wrap_protractor{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_tb.cur),n-resize}.photos_editor.photos_msie.photos_white_mode .photos_info_rotate .photos_wrap_protractor{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_tb_w.cur),n-resize}.photos_editor.photos_msie.photos_white_mode .photos_box_area:hover{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_move_w.cur),move}.photos_editor.photos_msie.photos_white_mode .photos_box_area .photos_corner_tl{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_tlbr_w.cur),nwse-resize}.photos_editor.photos_msie.photos_white_mode .photos_box_area .photos_corner_bl,.photos_editor.photos_msie.photos_white_mode .photos_box_area .photos_corner_tr{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_trbl_w.cur),nesw-resize}.photos_editor.photos_msie.photos_white_mode .photos_box_area .photos_corner_br{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_tlbr_w.cur),nwse-resize}.photos_editor.photos_msie.photos_white_mode .photos_box_area .photos_corner_t{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_tb_w.cur),n-resize}.photos_editor.photos_msie.photos_white_mode .photos_box_area .photos_corner_l{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_lr_w.cur),w-resize}.photos_editor.photos_msie.photos_white_mode .photos_box_area .photos_corner_b{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_tb_w.cur),s-resize}.photos_editor.photos_msie.photos_white_mode .photos_box_area .photos_corner_r{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_lr_w.cur),e-resize}.photos_editor.photos_msie.photos_white_mode .photos_box_area .photos_corner_out_t{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_t_w.cur),n-resize}.photos_editor.photos_msie.photos_white_mode .photos_box_area .photos_corner_out_l{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_l_w.cur),w-resize}.photos_editor.photos_msie.photos_white_mode .photos_box_area .photos_corner_out_b{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_tb_w.cur),s-resize}.photos_editor.photos_msie.photos_white_mode .photos_box_area .photos_corner_out_r{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_r_w.cur),e-resize}.photos_editor.photos_msie.photos_white_mode .photos_box_area .photos_corner_out_tl{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_tl_w.cur),n-resize}.photos_editor.photos_msie.photos_white_mode .photos_box_area .photos_corner_out_tr{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_tr_w.cur),n-resize}.photos_editor.photos_msie.photos_white_mode .photos_box_area .photos_corner_out_bl{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_bl_w.cur),n-resize}.photos_editor.photos_msie.photos_white_mode .photos_box_area .photos_corner_out_br{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_br_w.cur),n-resize}.photos_editor.photos_msie .resizable.movable:hover{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_move_b.cur),move}.photos_editor.photos_msie .resizable .corner_lt:hover,.photos_editor.photos_msie .resizable .corner_rb:hover{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_tlbr_b.cur),nwse-resize}.photos_editor.photos_msie .resizable .corner_lb:hover,.photos_editor.photos_msie .resizable .corner_rt:hover{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_trbl_b.cur),nesw-resize}.photos_editor.photos_msie .photos_controls_deco.custom_cursor_l{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_l.cur),w-resize}.photos_editor.photos_msie .photos_controls_deco.custom_cursor_r{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_r.cur),e-resize}.photos_editor.photos_msie .photos_controls_deco.custom_cursor_t{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_t.cur),n-resize}.photos_editor.photos_msie .photos_controls_deco.custom_cursor_b{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_tb.cur),s-resize}.photos_editor.photos_msie .photos_controls_deco.custom_cursor_lt{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_tl.cur),nwse-resize}.photos_editor.photos_msie .photos_controls_deco.custom_cursor_rt{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_tr.cur),nesw-resize}.photos_editor.photos_msie .photos_controls_deco.custom_cursor_lb{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_bl.cur),nesw-resize}.photos_editor.photos_msie .photos_controls_deco.custom_cursor_rb{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_br.cur),nwse-resize}.photos_editor.photos_msie.photos_white_mode .resizable.movable:hover{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_move_w.cur),move}.photos_editor.photos_msie.photos_white_mode .resizable .corner_lt:hover,.photos_editor.photos_msie.photos_white_mode .resizable .corner_rb:hover{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_tlbr_w.cur),nwse-resize}.photos_editor.photos_msie.photos_white_mode .resizable .corner_lb:hover,.photos_editor.photos_msie.photos_white_mode .resizable .corner_rt:hover{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_trbl_w.cur),nesw-resize}.photos_editor.photos_msie.photos_white_mode .photos_controls_deco.custom_cursor_l{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_l_w.cur),w-resize}.photos_editor.photos_msie.photos_white_mode .photos_controls_deco.custom_cursor_r{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_r_w.cur),e-resize}.photos_editor.photos_msie.photos_white_mode .photos_controls_deco.custom_cursor_t{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_t_w.cur),n-resize}.photos_editor.photos_msie.photos_white_mode .photos_controls_deco.custom_cursor_b{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_tb_w.cur),s-resize}.photos_editor.photos_msie.photos_white_mode .photos_controls_deco.custom_cursor_lt{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_tl_w.cur),nwse-resize}.photos_editor.photos_msie.photos_white_mode .photos_controls_deco.custom_cursor_rt{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_tr_w.cur),nesw-resize}.photos_editor.photos_msie.photos_white_mode .photos_controls_deco.custom_cursor_lb{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_bl_w.cur),nesw-resize}.photos_editor.photos_msie.photos_white_mode .photos_controls_deco.custom_cursor_rb{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_default/cursor_out_br_w.cur),nwse-resize}.photos_editor.photos_mobile .photos_tool_main .photos_menu_sub_effect .photos_list_item li{padding:0 12px}.photos_editor.photos_mobile .photos_tool_main .photos_menu_item .photos_effect_slider{width:300px}.photos_editor.photos_mobile .photos_tool_main .photos_detail_list .photos_list_info li{padding:0}';
        a.Injector.loadCSS(c)
    }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = a.userAgent = function(a) {
                    function b(a) {
                        var b = {}
                            , d = /(dolfin)[ \/]([\w.]+)/.exec(a) || /(edge)[ \/]([\w.]+)/.exec(a) || /(chrome)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(a) || /(webkit)(?:.*version)?[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(a) || ["", "unknown"];
                        return "webkit" === d[1] ? d = /(iphone|ipad|ipod)[\S\s]*os ([\w._\-]+) like/.exec(a) || /(android)[ \/]([\w._\-]+);/.exec(a) || [d[0], "safari", d[2]] : "mozilla" === d[1] ? /trident/.test(a) ? d[1] = "msie" : d[1] = "firefox" : "edge" === d[1] ? d[1] = "spartan" : /polaris|natebrowser|([010|011|016|017|018|019]{3}\d{3,4}\d{4}$)/.test(a) && (d[1] = "polaris"),
                            b[d[1]] = !0,
                            b.name = d[1],
                            b.version = c(d[2]),
                            b
                    }
                    function c(a) {
                        var b = {}
                            , c = a ? a.split(/\.|-|_/) : ["0", "0", "0"];
                        return b.info = c.join("."),
                            b.major = c[0] || "0",
                            b.minor = c[1] || "0",
                            b.patch = c[2] || "0",
                            b
                    }
                    function d(a) {
                        return e(a) ? "pc" : f(a) ? "tablet" : g(a) ? "mobile" : ""
                    }
                    function e(a) {
                        return a.match(/linux|windows (nt|98)|macintosh|cros/) && !a.match(/android|mobile|polaris|lgtelecom|uzard|natebrowser|ktf;|skt;/) ? !0 : !1
                    }
                    function f(a) {
                        return a.match(/ipad/) || a.match(/android/) && !a.match(/mobi|mini|fennec/) ? !0 : !1
                    }
                    function g(a) {
                        return a.match(/ip(hone|od)|android.+mobile|windows (ce|phone)|blackberry|bb10|symbian|webos|firefox.+fennec|opera m(ob|in)i|polaris|iemobile|lgtelecom|nokia|sonyericsson|dolfin|uzard|natebrowser|ktf;|skt;/) ? !0 : !1
                    }
                    function h(a) {
                        var b = {}
                            , d = /(iphone|ipad|ipod)[\S\s]*os ([\w._\-]+) like/.exec(a) || /(android)[ \/]([\w._\-]+);/.exec(a) || (/android/.test(a) ? ["", "android", "0.0.0"] : !1) || (/polaris|natebrowser|([010|011|016|017|018|019]{3}\d{3,4}\d{4}$)/.test(a) ? ["", "polaris", "0.0.0"] : !1) || /(windows)(?: nt | phone(?: os){0,1} | )([\w._\-]+)/.exec(a) || (/(windows)/.test(a) ? ["", "windows", "0.0.0"] : !1) || /(mac) os x ([\w._\-]+)/.exec(a) || (/(linux)/.test(a) ? ["", "linux", "0.0.0"] : !1) || (/webos/.test(a) ? ["", "webos", "0.0.0"] : !1) || /(cros)(?:\s[\w]+\s)([\d._\-]+)/.exec(a) || /(bada)[ \/]([\w._\-]+)/.exec(a) || (/bada/.test(a) ? ["", "bada", "0.0.0"] : !1) || (/(rim|blackberry|bb10)/.test(a) ? ["", "blackberry", "0.0.0"] : !1) || ["", "unknown", "0.0.0"];
                        return "iphone" === d[1] || "ipad" === d[1] || "ipod" === d[1] ? d[1] = "ios" : "windows" === d[1] && "98" === d[2] && (d[2] = "0.98.0"),
                        "cros" === d[1] && (d[1] = "chrome"),
                            b[d[1]] = !0,
                            b.name = d[1],
                            b.version = c(d[2]),
                            b
                    }
                    function i(a) {
                        var b = {}
                            , d = /(crios)[ \/]([\w.]+)/.exec(a) || /(daumapps)[ \/]([\w.]+)/.exec(a) || ["", ""];
                        return d[1] ? (b.isApp = !0,
                            b.name = d[1],
                            b.version = c(d[2])) : b.isApp = !1,
                            b
                    }
                    return a = (a || window.navigator.userAgent).toString().toLowerCase(),
                    {
                        ua: a,
                        browser: b(a),
                        platform: d(a),
                        os: h(a),
                        app: i(a)
                    }
                }
                ;
            "object" == typeof window && window.navigator.userAgent && (window.ua_result = b(window.navigator.userAgent) || null )
        }(function() {
            return "object" == typeof exports ? (exports.daumtools = exports,
                exports.util = exports,
                exports) : "object" == typeof window ? (window.daumtools = "undefined" == typeof window.daumtools ? {} : window.daumtools,
                window.util = "undefined" == typeof window.util ? window.daumtools : window.util,
                window.daumtools) : void 0
        }()),
        function(a) {
            "use strict";
            function b() {
                return window.Sizzle ? window.Sizzle : window.jQuery && window.jQuery.find ? window.jQuery.find : function(a, b) {
                    return "object" == typeof b && b.querySelectorAll ? b.querySelectorAll(a) : "string" == typeof b ? document.querySelectorAll(b + " " + a) : document.querySelectorAll(a)
                }
            }
            a.Selector = {
                $: function(a) {
                    return document.getElementById(a)
                },
                $$: b(),
                _createSelectorAlias: b
            }
        }(this),
        function(a) {
            "use strict";
            function b() {}
            Object.create || (Object.create = function() {
                function a() {}
                return function(b) {
                    if (1 !== arguments.length)
                        throw new Error("Object.create implementation only accepts one parameter.");
                    return a.prototype = b,
                        new a
                }
            }());
            var c = /xyz/.test(function() {
                xyz
            }) ? /\b_super\b/ : /.*/;
            b.extend = function(a) {
                var d = this.prototype
                    , e = Object.create(d);
                for (var f in a)
                    e[f] = "function" == typeof a[f] && "function" == typeof d[f] && c.test(a[f]) ? function(a, b) {
                        return function() {
                            var c = this._super;
                            this._super = d[a];
                            var e = b.apply(this, arguments);
                            return this._super = c,
                                e
                        }
                    }(f, a[f]) : a[f];
                var g = function() {
                        "function" == typeof this.init && this.init.apply(this, arguments)
                    }
                    ;
                return g.prototype = e,
                    e.constructor = g,
                    g.extend = b.extend,
                    g
            }
                ,
                a.Class = b
        }(this),
        function(a) {
            "use strict";
            a.Observer = Class.extend({
                on: function(a, b) {
                    for (var c = [].concat(a), d = 0, e = c.length; e > d; d++)
                        this.addListener.apply(this, [c[d], b]);
                    return this
                },
                addListener: function(a, b) {
                    var c = this.getListeners(a);
                    return c.push(b),
                        this
                },
                once: function(a, b) {
                    if (b) {
                        var c = this
                            , d = function() {
                                c.off(a, d),
                                    b.apply(this, arguments)
                            }
                            ;
                        b.__onetime_listener = d,
                            this.on(a, d)
                    }
                },
                emit: function(a) {
                    for (var b = [].concat(a), c = [].slice.call(arguments, 1), d = 0, e = b.length; e > d; d++)
                        this._emit(b[d], c);
                    return this
                },
                _emit: function(a, b) {
                    var c = this.getListeners(a).slice(0);
                    if ("undefined" != typeof c)
                        for (var d = 0, e = c.length; e > d; d++)
                            try {
                                c[d].apply(this, b)
                            } catch (f) {
                                throw "undefined" != typeof console && console.error('failed on while "' + a + '" event, caused by\r\n > ' + f),
                                    f
                            }
                },
                getListeners: function(a) {
                    return this.listeners = this.listeners || {},
                        this.listeners[a] = this.listeners[a] || [],
                        this.listeners[a]
                },
                off: function(a, b) {
                    var c = [].concat(a);
                    b && "function" == typeof b.__onetime_listener && (b = b.__onetime_listener);
                    for (var d = 0, e = c.length; e > d; d++)
                        this.removeListener.apply(this, [c[d], b]);
                    return b && "function" == typeof b.__onetime_listener && delete b.__onetime_listener,
                        this
                },
                removeListener: function(a, b) {
                    var c = this.getListeners(a);
                    if ("undefined" != typeof c)
                        for (var d = 0, e = c.length; e > d; d++)
                            if (c[d] === b || c[d].__original__ === b) {
                                c.splice(d, 1);
                                break
                            }
                    return this
                },
                destroy: function() {
                    this.listeners = null
                }
            })
        }(this),
        function(a) {
            "use strict";
            function b(b, c, d, e) {
                if ("undefined" == typeof Selector)
                    throw new Error("dependency not found. you should include selector-alias module to use delegate function.");
                if (!b)
                    throw new Error('failed to delegate event. Element: "' + b + '", Selector: "' + c + '", Event: "' + d + '", handler: ' + e.toString());
                var f = Selector.$$;
                a.DOMEvent.on(b, d, function(d) {
                    var g = a.DOMEvent.getTarget(d)
                        , h = f(c, b);
                    for (h = Array.prototype.slice.apply(h); g && g !== b; ) {
                        if (1 === g.nodeType && h.indexOf(g) > -1) {
                            e(d, g);
                            break
                        }
                        g = g.parentNode
                    }
                })
            }
            a.DOMEvent = {
                on: function() {
                    return document.addEventListener ? function(a, b, c) {
                        if (!a)
                            throw new Error('failed to add event. Element: "' + a + '", Event: "' + b + '", handler: ' + c.toString());
                        a.addEventListener(b, c, !1)
                    }
                        : function(a, b, c) {
                        if (!a)
                            throw new Error('failed to add event. Element: "' + a + '", Event: "' + b + '", handler: ' + c.toString());
                        a.attachEvent("on" + b, c)
                    }
                }(),
                off: function() {
                    return document.removeEventListener ? function(a, b, c) {
                        a.removeEventListener(b, c, !1)
                    }
                        : function(a, b, c) {
                        a.detachEvent("on" + b, c)
                    }
                }(),
                preventDefault: function(a) {
                    var b = a || window.event;
                    b.preventDefault ? b.preventDefault() : b.returnValue = !1
                },
                stopPropagation: function(a) {
                    var b = a || window.event;
                    b.stopPropagation ? b.stopPropagation() : b.cancelBubble = !0
                },
                getTarget: function(a) {
                    var b = a || window.event;
                    return b.target || b.srcElement
                }
            },
                a.DOMEvent.delegate = b
        }(window),
        function(a, b) {
            function c(a) {
                a.hasOwnProperty("data-simple-scrollbar") || Object.defineProperty(a, "data-simple-scrollbar", new SimpleScrollbar(a))
            }
            function d(a, c) {
                function d(a) {
                    var b = a.pageY - f;
                    f = a.pageY,
                        g(function() {
                            c.el.scrollTop += b / c.scrollRatio
                        })
                }
                function e() {
                    a.classList.remove("ss-grabbed"),
                        b.body.classList.remove("ss-grabbed"),
                        b.removeEventListener("mousemove", d),
                        b.removeEventListener("mouseup", e)
                }
                var f;
                a.addEventListener("mousedown", function(c) {
                    return f = c.pageY,
                        a.classList.add("ss-grabbed"),
                        b.body.classList.add("ss-grabbed"),
                        b.addEventListener("mousemove", d),
                        b.addEventListener("mouseup", e),
                        !1
                })
            }
            function e(a) {
                for (this.target = a,
                         this.bar = '<div class="ss-scroll">',
                         this.wrapper = b.createElement("div"),
                         this.wrapper.setAttribute("class", "ss-wrapper"),
                         this.el = b.createElement("div"),
                         this.el.setAttribute("class", "ss-content"),
                         this.wrapper.appendChild(this.el); this.target.firstChild; )
                    this.el.appendChild(this.target.firstChild);
                this.target.appendChild(this.wrapper),
                    this.target.insertAdjacentHTML("beforeend", this.bar),
                    this.bar = this.target.lastChild,
                    d(this.bar, this),
                    this.moveBar(),
                    this.el.addEventListener("scroll", this.moveBar.bind(this)),
                    this.el.addEventListener("mouseenter", this.moveBar.bind(this)),
                    this.target.classList.add("ss-container")
            }
            function f() {
                for (var a = b.querySelectorAll("*[ss-container]"), d = 0; d < a.length; d++)
                    c(a[d])
            }
            var g = a.requestAnimationFrame || a.setImmediate || function(a) {
                        return setTimeout(a, 0)
                    }
                ;
            e.prototype = {
                moveBar: function(a) {
                    var b = this.el.scrollHeight
                        , c = this.el.clientHeight
                        , d = this;
                    this.scrollRatio = c / b,
                        g(function() {
                            d.bar.style.cssText = "height:" + c / b * 100 + "%; top:" + d.el.scrollTop / b * 100 + "%;right:-" + (d.target.clientWidth - d.bar.clientWidth) + "px;"
                        })
                }
            },
                b.addEventListener("DOMContentLoaded", f),
                e.initEl = c,
                e.initAll = f,
                a.SimpleScrollbar = e
        }(window, document),
        function(a) {
            function b() {}
            var c = a.Ajax = function(a) {
                    return this.init(a)
                }
                ;
            c.prototype = {
                init: function(a) {
                    return this.option = {
                        method: "get",
                        url: "",
                        query: "",
                        async: !0,
                        time: 5e3,
                        header: {
                            charset: "utf-8"
                        },
                        start: b,
                        end: b,
                        success: b,
                        progress: b,
                        error: b,
                        timeout: b
                    },
                        this.xhr = this.getXHR(),
                        this.setOption(a),
                        this.readyStateChange(),
                        this
                },
                getXHR: function() {
                    var a;
                    if (window.XMLHttpRequest)
                        a = new XMLHttpRequest;
                    else
                        try {
                            a = new ActiveXObject("Msxml2.XMLHTTP")
                        } catch (b) {
                            try {
                                a = new ActiveXObject("Microsoft.XMLHTTP")
                            } catch (c) {
                                a = null
                            }
                        }
                    return a
                },
                setOption: function(a) {
                    a = a || {};
                    for (var b in a)
                        a.hasOwnProperty(b) && (this.option[b] = a[b] || this.option[b])
                },
                setHeader: function(a) {
                    var b = this.xhr;
                    if (b)
                        for (var c in a)
                            a.hasOwnProperty(c) && b.setRequestHeader(c, a[c])
                },
                setTimeout: function() {
                    var a = this;
                    this.timer = window.setTimeout(function() {
                        a.timer = null ,
                            a.option.timeout(),
                            a.option.end(),
                            a.flag = !0
                    }, this.option.time)
                },
                clearTimeout: function() {
                    window.clearTimeout(this.timer),
                        this.timer = null
                },
                readyStateChange: function() {
                    var a = this.xhr
                        , b = this;
                    this.flag = !0,
                    a && (a.onreadystatechange = function() {
                            1 === a.readyState || 2 === a.readyState ? (b.flag = !1,
                                b.option.start()) : 4 === a.readyState && b.timer && (b.clearTimeout(),
                                200 === a.status ? b.option.success(a) : b.option.error(a),
                                b.option.end(),
                                b.flag = !0)
                        }
                    )
                },
                send: function(a) {
                    return this.xhr && ("object" == typeof a && this.setOption(a),
                        this.xhr.open(this.option.method, this.getRequestUrl(), this.option.async),
                        this.setHeader(this.option.header),
                        this.xhr.send("post" === this.option.method ? this.option.query : ""),
                        this.setTimeout()),
                        this
                },
                getRequestUrl: function() {
                    var a = this.option
                        , b = a.url
                        , c = a.query;
                    return "post" !== a.method && c && (b += (b.indexOf("?") < 0 ? "?" : "&") + c),
                        b
                },
                on: function(a, b) {
                    if ("start" !== a && "end" !== a && "success" !== a && "progress" !== a && "error" !== a && "timeout" !== a)
                        throw new TypeError(a + " is not a callbackType [start, end, success, progress, error, timeout]");
                    return this.option[a] = b,
                        this
                },
                onStart: function(a) {
                    return this.on("start", a)
                },
                onEnd: function(a) {
                    return this.on("end", a)
                },
                onSuccess: function(a) {
                    return this.on("success", a)
                },
                onProgress: function(a) {
                    return this.on("progress", a)
                },
                onError: function(a) {
                    return this.on("error", a)
                },
                onTimeout: function(a) {
                    return this.on("timeout", a)
                }
            }
        }(window.daumtools = "undefined" == typeof window.daumtools ? {} : window.daumtools),
        function(a) {
            "use strict";
            var b = a.util = "object" == typeof a.util ? a.util : {}
                , c = document;
            b.getOffset = function(a) {
                for (var b = a.offsetLeft, d = a.offsetTop, e = a; e.offsetParent && e.offsetParent !== c.body; )
                    e = e.offsetParent,
                        b += e.offsetLeft,
                        d += e.offsetTop;
                return {
                    left: b,
                    top: d
                }
            }
                ,
                b.getPrefix = function(a, b) {
                    for (var d = ["", "-ms-", "-o-", "-moz-", "-webkit-"], e = c.documentElement.style, f = 0, g = d.length; g > f; f += 1) {
                        var h = d[f] + b;
                        if (h in e)
                            return h
                    }
                    return ""
                }
                ,
                b.getTransitionEndEventName = function() {
                    var a = document.createElement("div")
                        , b = {
                        transition: "transitionend",
                        OTransition: "otransitionend",
                        MozTransition: "transitionend",
                        WebkitTransition: "webkitTransitionEnd"
                    };
                    for (var c in b)
                        if (b.hasOwnProperty(c) && void 0 !== a.style[c])
                            return b[c];
                    return !1
                }
                ,
                b.degree2radian = function(a) {
                    return a * Math.PI / 180
                }
                ,
                b.radian2degree = function(a) {
                    return 180 * a / Math.PI
                }
                ,
                b.Transform = {
                    REGEX_TRANSLATE: /translate\((.?\d+\.?\d*?)px, (.?\d+\.?\d*?)px\)/,
                    REGEX_SCALE_IE: /scale\((.?\d+\.?\d*?)\)/,
                    REGEX_SCALE: /scale\((.?\d+\.?\d*?), (.?\d+\.?\d*?)\)/,
                    REGEX_ROTATE: /rotateX\((.?\d+\.?\d*?)deg\) rotateY\((.?\d+\.?\d*?)deg\) rotateZ\((.?\d+\.?\d*?)deg\)/,
                    parse: function(a) {
                        var b = this.REGEX_TRANSLATE.exec(a)
                            , c = this.REGEX_SCALE.exec(a)
                            , d = this.REGEX_SCALE_IE.exec(a)
                            , e = this.REGEX_ROTATE.exec(a)
                            , f = {};
                        return b && 3 === b.length && (f.translateX = parseFloat(b[1]),
                            f.translateY = parseFloat(b[2])),
                            c && 3 === c.length ? (f.scaleX = parseFloat(c[1]),
                                f.scaleY = parseFloat(c[2])) : d && 2 === d.length && (f.scaleX = parseFloat(d[1]),
                                f.scaleY = parseFloat(d[1])),
                        e && 4 === e.length && (f.rotateX = parseFloat(e[1]),
                            f.rotateY = parseFloat(e[2]),
                            f.rotateZ = parseFloat(e[3])),
                            f
                    },
                    stringify: function(a) {
                        var b = [];
                        return "undefined" != typeof a.translateX && b.push("translate(" + a.translateX + "px, " + a.translateY + "px)"),
                        "undefined" != typeof a.scaleX && b.push("scale(" + a.scaleX + ", " + a.scaleY + ")"),
                        "undefined" != typeof a.rotateX && b.push("rotateX(" + a.rotateX + "deg) rotateY(" + a.rotateY + "deg) rotateZ(" + a.rotateZ + "deg)"),
                            b.join(" ")
                    }
                },
                b.async = function(a, b) {
                    this.init(a, b)
                }
                ,
                b.async.prototype = {
                    init: function(a, b) {
                        this.funcList = a,
                            this.callback = b,
                            this.process()
                    },
                    process: function() {
                        var a, b = this.funcList.shift(), c = this;
                        b ? (a = [function() {
                            c.connect.apply(c, arguments)
                        }
                        ],
                            b.apply(null , a)) : (a = [null ].concat(arguments),
                            this.callback.apply(c, a))
                    },
                    connect: function(a) {
                        if (a)
                            this.callback(a);
                        else {
                            var b = Array.prototype.slice.call(arguments, 1);
                            this.process.apply(this, b)
                        }
                    }
                },
                b.Flow = function(a) {
                    this.init(a)
                }
                ,
                b.Flow.prototype = {
                    init: function(a) {
                        this.funcList = [],
                        a && this.then(a)
                    },
                    delay: function(a) {
                        var b = this;
                        return this.funcList.push(function(c) {
                            var d = Array.prototype.slice.call(arguments, 1);
                            b.delayTimeId = window.setTimeout(function() {
                                c.apply(null , d)
                            }, a)
                        }),
                            this
                    },
                    then: function(a) {
                        return this.funcList.push(function(b) {
                            var c = Array.prototype.slice.call(arguments, 0);
                            a.apply(null , c)
                        }),
                            this
                    },
                    end: function(a) {
                        return this.callback = a || function() {}
                            ,
                            this.process.apply(this, arguments),
                            this
                    },
                    stop: function() {
                        this.isStop = !0,
                            window.clearTimeout(this.delayTimeId)
                    },
                    process: function() {
                        var a = this.funcList.shift()
                            , b = this
                            , c = Array.prototype.slice.call(arguments, 0);
                        a ? (c = [function(a) {
                            b.connect.apply(b, arguments)
                        }
                        ].concat(c),
                            a.apply(null , c)) : (c = [null ].concat(c),
                            this.callback.apply(b, c))
                    },
                    connect: function(a) {
                        if (!this.isStop)
                            if (a)
                                this.callback(a);
                            else {
                                var b = Array.prototype.slice.call(arguments, 1);
                                this.process.apply(this, b)
                            }
                    }
                };
            var d = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
                        window.setTimeout(a, 1e3 / 60)
                    }
                ;
            b.animation = {
                animate: function(a) {
                    var b = this;
                    this.requestAnimFrame(function(c) {
                        a = a || {};
                        var d, e = c || +new Date, f = a.duration || 500, g = e + f, h = a.onChange || function() {}
                            , i = a.abort || function() {
                                return !1
                            }
                            , j = a.easing || function(a, b, c, d) {
                                return -c * Math.cos(a / d * (Math.PI / 2)) + c + b
                            }
                            , k = "startValue" in a ? a.startValue : 0, l = "endValue" in a ? a.endValue : 100, m = a.byValue || l - k;
                        a.onStart && a.onStart(),
                            function n(c) {
                                d = c || +new Date;
                                var l = d > g ? f : d - e;
                                return i() ? void (a.onComplete && a.onComplete()) : (h(j(l, k, m, f)),
                                    d > g ? void (a.onComplete && a.onComplete()) : void b.requestAnimFrame(n))
                            }(e)
                    })
                },
                requestAnimFrame: function() {
                    return d.apply(window, arguments)
                },
                easeInOut: function(a, b, c, d) {
                    return a /= d / 2,
                        1 > a ? c / 2 * a * a + b : -c / 2 * ((a -= 1) * (a - 2) - 1) + b
                }
            },
                b.animation["ease-in-out"] = b.animation.easeInOut,
                a.util.effectSlider = Class.extend({
                    init: function(a) {
                        this.currentOffset = null ,
                            this.currentState = null ,
                            this.callback = {
                                start: function() {},
                                move: function() {},
                                end: function() {}
                            },
                            this.initSlider(a)
                    },
                    initSlider: function(b) {
                        if (!this.slider) {
                            var c = a.$$p(".sub_detail_" + b + " .slider_bar")[0];
                            this.slider = new a.Slider(c)
                        }
                    },
                    on: function(a, b) {
                        var c = this;
                        return this.slider.on(a, function(d) {
                            (c.isChangedOffset(d) || c.currentState !== a) && (c.currentState = a,
                                c.currentOffset = d,
                                b(d))
                        }),
                            this
                    },
                    isChangedOffset: function(a) {
                        return this.currentOffset !== a
                    },
                    resize: function() {
                        this.slider && this.slider.resize()
                    },
                    setCurrent: function(a) {
                        this.slider && this.slider.setCurrent(a)
                    }
                }),
                b.convolute = function(a, b, d) {
                    for (var e = c.createElement("canvas"), f = e.getContext("2d"), g = Math.round(Math.sqrt(b.length)), h = Math.floor(g / 2), i = a.data, j = a.width, k = a.height, l = j, m = k, n = f.createImageData(l, m), o = n.data, p = d ? 1 : 0, q = 0; m > q; q++)
                        for (var r = 0; l > r; r++) {
                            for (var s = q, t = r, u = 4 * (q * l + r), v = 0, w = 0, x = 0, y = 0, z = 0; g > z; z++)
                                for (var A = 0; g > A; A++) {
                                    var B = s + z - h
                                        , C = t + A - h;
                                    if (B >= 0 && k > B && C >= 0 && j > C) {
                                        var D = 4 * (B * j + C)
                                            , E = b[z * g + A];
                                        v += i[D] * E,
                                            w += i[D + 1] * E,
                                            x += i[D + 2] * E,
                                            y += i[D + 3] * E
                                    }
                                }
                            o[u] = v,
                                o[u + 1] = w,
                                o[u + 2] = x,
                                o[u + 3] = y + p * (255 - y)
                        }
                    return n
                }
                ,
                b.calculateGaussianKernel = function(a, b) {
                    for (var c = [], d = 0, e = a / 2, f = 0, g = 1 / (2 * Math.PI * Math.pow(b, 2)), h = -e; e >= h; h++)
                        for (var i = -e; e >= i; i++)
                            f = (i * i + h * h) / (2 * (b * b)),
                            c[h + e] || (c[h + e] = []),
                                c[h + e][i + e] = g * Math.exp(-f),
                                d += c[h + e][i + e];
                    for (var j = 0; a >= j; j++)
                        for (var k = 0; a >= k; k++)
                            c[j][k] = c[j][k] * (1 / d);
                    return c
                }
                ,
                b.StackCache = function(a) {
                    this.init(a)
                }
                ,
                b.StackCache.prototype = {
                    init: function(a) {
                        this.list = [],
                            this.maxlength = a
                    },
                    addItem: function(a) {
                        if (this.isInvalidItem(a))
                            throw new TypeError("item is invaild type\nitem must have {key, value}");
                        this.removeItem(a.key),
                        this.list.length >= this.maxlength && this.list.shift(),
                            this.list.push(a)
                    },
                    isInvalidItem: function(a) {
                        return "string" != typeof a.key ? !0 : !1
                    },
                    getIndex: function(a) {
                        for (var b = 0, c = this.list.length; c > b; b += 1)
                            if (this.list[b].key === a)
                                return b;
                        return -1
                    },
                    getValue: function(a) {
                        return this.getItem(a).value
                    },
                    getItem: function(a) {
                        var b = this.getIndex(a);
                        return b > -1 ? this.list[b] : {
                            key: a,
                            value: null
                        }
                    },
                    removeItem: function(a) {
                        var b = this.getIndex(a);
                        b > -1 && this.list.splice(b, 1)
                    },
                    isEmpty: function() {
                        return !(this.list && this.list.length > 0)
                    },
                    destroy: function() {
                        this.list = null
                    },
                    clear: function() {
                        this.list = []
                    }
                },
                b.loadImage = function(a, b) {
                    var c = new Image;
                    c.onload = function() {
                        b(null , c, [c.naturalWidth, c.naturalHeight]),
                            c.onload = null ,
                            c.onerror = null
                    }
                        ,
                        c.onerror = function(a) {
                            b(a),
                                c.onload = null ,
                                c.onerror = null
                        }
                        ,
                        c.src = a
                }
                ,
                b.HDPICanvas = function() {
                    function a(a) {
                        if (!a.canvas)
                            throw "A canvas is required";
                        if (!a.image)
                            throw "Image is required";
                        var b = a.canvas
                            , c = b.getContext("2d")
                            , d = a.image
                            , e = a.srcx || 0
                            , f = a.srcy || 0
                            , g = a.srcw || d.naturalWidth
                            , h = a.srch || d.naturalHeight
                            , i = a.desx || e
                            , j = a.desy || f
                            , k = a.desw || g
                            , l = a.desh || h
                            , m = a.auto
                            , n = window.devicePixelRatio || 1
                            , o = c.webkitBackingStorePixelRatio || c.mozBackingStorePixelRatio || c.msBackingStorePixelRatio || c.oBackingStorePixelRatio || c.backingStorePixelRatio || 1
                            , p = n / o;
                        if ("undefined" == typeof m && (m = !0),
                            m && n !== o) {
                            var q = b.width
                                , r = b.height;
                            b.width = q * p,
                                b.height = r * p,
                                b.style.width = q + "px",
                                b.style.height = r + "px",
                                c.scale(p, p)
                        }
                        c.drawImage(a.image, e, f, g, h, i, j, k, l)
                    }
                    return {
                        drawImage: a
                    }
                }(),
                b.rubberBandValue = function(a, b, c) {
                    return c = "undefined" == typeof c ? .55 : c,
                        b = "undefined" == typeof b ? .5 : b,
                    (1 - 1 / (a * c / b + 1)) * b
                }
                ,
                b.crop = {
                    adjustDp: function(a, c) {
                        c = c || {},
                        ("flipV" in c || "flipH" in c) && b.crop.adjustDpForFlip(a, c.flipV, c.flipH),
                        "rotate" in c && b.crop.adjustDpForRotate(a, c.rotate),
                        "angle" in c && b.crop.adjustDpForAngle(a, c.angle),
                        "scale" in c && b.crop.adjustDpForScale(a, c.scale)
                    },
                    adjustDpForFlip: function(a, b, c) {
                        (b || 0) % 2 === 1 && (a.dy *= -1),
                        (c || 0) % 2 === 1 && (a.dx *= -1)
                    },
                    adjustDpForRotate: function(a, c) {
                        b.crop.adjustDpForAngle(a, 90 * c)
                    },
                    adjustDpForAngle: function(a, c) {
                        c = b.degree2radian(-c);
                        var d = a.dx
                            , e = a.dy;
                        a.dx = d * Math.cos(c) - e * Math.sin(c),
                            a.dy = e * Math.cos(c) + d * Math.sin(c)
                    },
                    adjustDpForScale: function(a, b) {
                        a.dx = a.dx / b,
                            a.dy = a.dy / b
                    },
                    sizeAspectFill: function(a, b) {
                        if (0 !== b) {
                            var c = a.width / a.height;
                            b > c ? a.width = a.height * b : a.height = a.width / b
                        }
                    },
                    sizeAspectFit: function(a, b) {
                        if (0 !== b) {
                            var c = a.width / a.height;
                            b > c ? a.height = a.width / b : a.width = a.height * b
                        }
                    },
                    sizeAspect: function(a, b, c) {
                        0 !== b && ("h" === c ? a.height = a.width / b : a.width = a.height * b)
                    },
                    sizeAspectSameArea: function(a, b, c) {
                        0 !== b && (a.width = Math.sqrt(c * b),
                            a.height = a.width / b)
                    },
                    getBoundHalfSize: function(a, c, d) {
                        d = b.degree2radian(Math.abs(d));
                        var e = Math.atan(c / a)
                            , f = Math.sqrt(Math.pow(a, 2) + Math.pow(c, 2)) / 2
                            , g = Math.cos(e - d) * f
                            , h = Math.sin(e + d) * f;
                        return {
                            width: g,
                            height: h
                        }
                    },
                    getAngleInBound: function(a, c, d, e) {
                        var f = Math.atan2(c, a)
                            , g = Math.sqrt(Math.pow(a, 2) + Math.pow(c, 2)) / 2
                            , h = d > g ? Math.PI : f - Math.acos(d / g)
                            , i = e > g ? Math.PI : -f + Math.asin(e / g)
                            , j = Math.abs(Math.min(h, i));
                        return b.radian2degree(j)
                    },
                    division: function(a, b) {
                        return 0 === b ? 0 : a / b
                    },
                    adjustNumberForInt: function(a, c) {
                        return c = c || !1,
                        c && (a *= 2),
                            a = Math.round(a),
                        c && (a /= 2,
                            a = b.crop.adjustNumber(a, 1)),
                            a
                    },
                    adjustNumber: function(a, b) {
                        return b = void 0 === b ? 5 : b,
                            parseFloat(a.toFixed(b))
                    },
                    calTriangleResize: function(a, c, d, e) {
                        var f = Math.atan2(c, a)
                            , g = Math.sqrt(Math.pow(a, 2) + Math.pow(c, 2));
                        return g = Math.max(0, g - b.crop.division(d, Math.cos(f)) - b.crop.division(e, Math.sin(f))),
                        {
                            width: g * Math.cos(f),
                            height: g * Math.sin(f)
                        }
                    }
                },
                b.isNumeric = function(a) {
                    return !isNaN(parseFloat(a)) && isFinite(a)
                }
                ,
                b.getAPIHost = function(a) {
                    var b = a || "daum"
                        , c = {
                        kakao: "//irving.fotolab.kakao.com",
                        daum: "//irving.fotolab.daum.net",
                        dev: "//imagefilter.dev.daum.net",
                        local: "//localhost:8080"
                    };
                    return c[b]
                }
                ,
                b.getImagePath = function(a) {
                    var b = a || "daum"
                        , c = {
                        kakao: "//t1.daumcdn.net/fp/photos/img/",
                        daum: "//t1.daumcdn.net/fp/photos/img/",
                        dev: "//t1.daumcdn.net/fp/photos/img/",
                        local: "//t1.daumcdn.net/fp/photos/img/"
                    };
                    return c[b]
                }
                ,
                b.htmlEscape = function(a) {
                    return b.htmlMapping("" + a, {
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': "&quot;",
                        "'": "&#x27;",
                        "`": "&#x60;"
                    })
                }
                ,
                b.htmlUnescape = function(a) {
                    return b.htmlMapping("" + a, {
                        "&amp;": "&",
                        "&lt;": "<",
                        "&gt;": ">",
                        "&quot;": '"',
                        "&#x27;": "'",
                        "&#x60;": "`"
                    })
                }
                ,
                b.htmlMapping = function(a, b) {
                    var c = "(?:" + Object.keys(b).join("|") + ")"
                        , d = new RegExp(c)
                        , e = new RegExp(c,"g")
                        , f = function(a) {
                            return b[a]
                        }
                        ;
                    return d.test(a) ? a.replace(e, f) : a
                }
                ,
                b.getImageId = function(a, b) {
                    if (b.indexOf("daumcdn") < 0)
                        throw new Error("not supported image url");
                    return "" === b.split("//")[0] ? location.protocol + b : b
                }
                ,
                b.sendErrorLog = function(b, c, d) {
                    if ("global_error" !== b || /photos/i.test(c)) {
                        var e = a.version || "dev";
                        d = d || "pew";
                        var f = new Image;
                        f.src = "http://put.qostore.daum.net/api/opencounter/Open.do?service=" + encodeURIComponent(d) + "&key=" + encodeURIComponent(b) + "&host=" + encodeURIComponent(document.referrer || location.href) + "&extra=" + encodeURIComponent("[" + e + "] " + c)
                    }
                }
                ,
                b.setCurrentImageId = function(a) {
                    "" === a.split("//")[0] && (a = location.protocol + a);
                    var c = a;
                    b.isCurrentImageId = function(a) {
                        return "" === a.split("//")[0] && (a = location.protocol + a),
                            a === c ? !0 : !1
                    }
                }
                ,
                b.isIE10 = function() {
                    return a.ua.browser.msie
                }
                ,
                b.getThumbUrl = function(a, b, c) {
                    if ("daum" === b) {
                        var d = location.protocol
                            , e = decodeURIComponent(a).split(/[http|https]\:/i)
                            , f = e[e.length - 1];
                        return "R" === c ? d + "//t1.daumcdn.net/thumb/R0x160/?fname=" + encodeURIComponent(d + f) : d + "//t1.daumcdn.net/thumb/T100x0/?fname=" + encodeURIComponent(d + f)
                    }
                    return a
                }
                ,
                b.extend = function(a, b) {
                    for (var c in b)
                        b.hasOwnProperty(c) && (a[c] = b[c])
                }
                ,
                b.num2rate = function(a, b) {
                    return a * (100 / b)
                }
                ,
                b.rate2num = function(a, b) {
                    return a * (b / 100)
                }
                ,
                b.getPropsName = function(a) {
                    return "vertical" === a ? {
                        POSITION: "top",
                        SIZE: "height",
                        DX: "dy"
                    } : {
                        POSITION: "left",
                        SIZE: "width",
                        DX: "dx"
                    }
                }
                ,
                b.createEl = function(a, b) {
                    var d = c.createElement(a);
                    return b && (d.className = b),
                        d
                }
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = a.Matrix = Observer.extend({
                init: function(a, b, c, d, e, f) {
                    this.REVERSE_UPDOWN = 1,
                        this.REVERSE_LEFTRIGHT = 2,
                        a = "undefined" == typeof a ? 1 : a,
                        b = "undefined" == typeof b ? 0 : b,
                        c = "undefined" == typeof c ? 0 : c,
                        d = "undefined" == typeof d ? 1 : d,
                        e = "undefined" == typeof e ? 0 : e,
                        f = "undefined" == typeof f ? 0 : f,
                        this.setData(a, b, c, d, e, f)
                },
                setData: function(a, b, c, d, e, f) {
                    this.a = parseFloat(a.toFixed(15)),
                        this.b = parseFloat(b.toFixed(15)),
                        this.c = parseFloat(c.toFixed(15)),
                        this.d = parseFloat(d.toFixed(15)),
                        this.e = parseFloat(e.toFixed(15)),
                        this.f = parseFloat(f.toFixed(15))
                },
                matrixMulti: function(a) {
                    var b = a.a * this.a + a.c * this.b
                        , c = a.b * this.a + a.d * this.b
                        , d = a.a * this.c + a.c * this.d
                        , e = a.b * this.c + a.d * this.d
                        , f = a.a * this.e + a.c * this.f + a.e
                        , g = a.b * this.e + a.d * this.f + a.f;
                    this.setData(b, c, d, e, f, g)
                },
                translate: function(b, c) {
                    this.matrixMulti(new a.Matrix(1,0,0,1,b,c))
                },
                rotateMatrix: function(b) {
                    var c = b * Math.PI / 180;
                    this.matrixMulti(new a.Matrix(Math.cos(c),-Math.sin(c),Math.sin(c),Math.cos(c),0,0))
                },
                reverseMatrix: function(a) {
                    var b = a === this.REVERSE_LEFTRIGHT ? -1 : 1
                        , c = a === this.REVERSE_UPDOWN ? -1 : 1;
                    this.scaleMatrix(b, c)
                },
                scaleMatrix: function(b, c) {
                    this.matrixMulti(new a.Matrix(b,0,0,c,0,0))
                },
                getInverseMatrix: function(a) {
                    var c = this.a
                        , d = this.b
                        , e = this.c
                        , f = this.d
                        , g = this.e
                        , h = this.f;
                    a && (c = a[0],
                        d = a[1],
                        e = a[2],
                        f = a[3],
                        g = a[4],
                        h = a[5]);
                    var i = c * (1 * f - 0 * h) - e * (1 * d - 0 * h) + g * (0 * d - 0 * f)
                        , j = [[+(1 * f - 0 * h) * (1 / i), -(1 * e - 0 * g) * (1 / i), +(e * h - g * f) * (1 / i)], [-(1 * d - 0 * h) * (1 / i), +(1 * c - 0 * g) * (1 / i), -(c * h - g * d) * (1 / i)], [+(0 * d - 0 * f) * (1 / i), -(0 * c - 0 * e) * (1 / i), +(c * f - e * d) * (1 / i)]];
                    return new b(j[0][0],j[1][0],j[0][1],j[1][1],j[0][2],j[1][2])
                },
                pointMulti: function(a, b) {
                    return "object" == typeof a && (b = a.y,
                        a = a.x),
                        a = a || 0,
                        b = b || 0,
                    {
                        x: this.a * a + this.c * b + this.e,
                        y: this.b * a + this.d * b + this.f
                    }
                },
                toArray: function() {
                    return [this.a, this.b, this.c, this.d, this.e, this.f]
                }
            })
        }(window.photos = "undefined" == typeof window.photos ? {} : window.photos),
        function(a) {
            "use strict";
            a.FileReader = function(a, b, c) {
                this.init(a, b, c)
            }
                ,
                a.FileReader.prototype = {
                    init: function(a, b, c) {
                        if (!this._isSupportFileAPI())
                            throw new Error("this browser is not supported File api");
                        this.metadata = {},
                            this.readFileCnt = 0,
                            this.setMetadata({
                                name: "",
                                type: "",
                                size: 0,
                                lastModified: null ,
                                lastModifiedDate: null
                            }),
                            this.callback = b,
                            this.completed = c,
                            this._bindEvent(a)
                    },
                    _bindEvent: function(a) {
                        var b = this;
                        a.addEventListener("change", function(a) {
                            b.fileLength = this.files.length;
                            for (var c = 0, d = this.files.length; d > c; c++)
                                b.read(this.files[c]),
                                    b.setMetadata(this.files[c])
                        })
                    },
                    read: function(a) {
                        var b = this
                            , c = new window.FileReader;
                        c.onload = function(a) {
                            var c = a.target.result;
                            b.readFileCnt++,
                                b.callback(c),
                            b.readFileCnt === b.fileLength && b.completed(b.readFileCnt)
                        }
                            ,
                            c.readAsDataURL(a)
                    },
                    setMetadata: function(a) {
                        for (var b in a)
                            a.hasOwnProperty(b) && (this.metadata[b] = a[b])
                    },
                    _isSupportFileAPI: function() {
                        return !!window.File && !!window.FileReader && !!window.FileList
                    }
                }
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            a.EVENT_NAME = function() {
                var a = {
                    START: "touchstart",
                    MOVE: "touchmove",
                    END: "touchend",
                    CANCEL: "touchcancel"
                }
                    , b = {
                    START: "mousedown",
                    MOVE: "mousemove",
                    END: "mouseup"
                };
                return "ontouchstart" in window ? a : b
            }(),
                a.Draggable = Observer.extend({
                    init: function(b) {
                        if (!b.el)
                            throw new Error("element should be provided");
                        this.initialX = 0,
                            this.initialY = 0,
                            this.options = b,
                            this.el = b.el || null ,
                            this.EVENT_NAME = a.EVENT_NAME,
                            this.offset = null ,
                            this._bindEvent()
                    },
                    onmousedown: function(b) {
                        var c = b.touches && b.touches.length > 0 ? b.touches[0] : b;
                        this.initialX = c.pageX || c.clientX,
                            this.initialY = c.pageY || c.clientY,
                            a.event.on(window, this.EVENT_NAME.MOVE, this._onmousemove),
                            a.event.on(window, this.EVENT_NAME.END, this._onmouseup),
                        this.EVENT_NAME.CANCEL && a.event.on(window, this.EVENT_NAME.CANCEL, this._onmouseup),
                            this.offset = this._calOffset(b),
                            this.emit("start", this.offset)
                    },
                    onmouseup: function(b) {
                        a.event.off(window, this.EVENT_NAME.MOVE, this._onmousemove),
                            a.event.off(window, this.EVENT_NAME.END, this._onmouseup),
                        this.EVENT_NAME.CANCEL && a.event.off(window, this.EVENT_NAME.CANCEL, this._onmouseup),
                            this.offset = this._calOffset(b),
                            this.emit("end", this.offset)
                    },
                    onmousemove: function(a) {
                        this.offset = this._calOffset(a),
                            this.emit("move", this.offset)
                    },
                    _bindEvent: function() {
                        var b = this;
                        this._onmousedown = function(a) {
                            var c = window.event || a;
                            b._preventEvent(a),
                                b.onmousedown(c)
                        }
                            ,
                            this._onmouseup = function(a) {
                                var c = window.event || a;
                                b._preventEvent(a),
                                    b.onmouseup(c)
                            }
                            ,
                            this._onmousemove = function(a) {
                                var c = window.event || a;
                                b._preventEvent(a),
                                    b.onmousemove(c)
                            }
                            ,
                            a.event.on(this.el, this.EVENT_NAME.START, function(a) {
                                b._onmousedown(a)
                            })
                    },
                    _preventEvent: function(b) {
                        this.options && !this.options.eventBubbling && (a.event.preventDefault(b),
                            a.event.stopPropagation(b))
                    },
                    _calOffset: function(b) {
                        var c = b.touches && b.touches.length > 0 ? b.touches[0] : b;
                        window.TouchEvent && c instanceof TouchEvent && (c = c.changedTouches[0]);
                        var d = c.pageX || c.clientX
                            , e = c.pageY || c.clientY
                            , f = d - this.initialX
                            , g = e - this.initialY;
                        return {
                            x: d,
                            y: e,
                            dx: f,
                            dy: g,
                            target: a.event.getTarget(b)
                        }
                    }
                })
        }(window.photos = "undefined" == typeof window.photos ? {} : window.photos),
        function(a) {
            "use strict";
            a.lookupDataUrl = {
                tc_brightness: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAEtCAYAAADAy2hPAAAgAElEQVR4Xu1dh7Ykt61sSbtrW5IVLOnZli3JL+ecw///lt9hb5MLggWgQLJn5+pYx+t773ScriJCAWR/8OrV8fvjOI4PPij///Y/+fvxwVH+d352fo7+/rHsQ3y39gyu5yGfTX1G1M8P3z3TD8u5rr+73+tnHx7Hh+Xftd/5e/n30XF8dP3+0UfX3x8dx6vy+avjeHX9e/3mOMq/n/zkOH76s+P45OfH8cU3x/HD/x3HBwMBrofwjg2AALOAi+NOIhEPfCvhJq7fAS4GQjcg6nfxSCEAr8eegDLga+ArATT4Hx5HIcIJ/vXz9evjePX6ON4UAvz0HQE+/+Y4fve/OwmwgRToYaeIctM9QLABGQbroIjRAEfAV5AlIcCoL9eoFuAc9cISVCvQWYDXx1FIUAjwRlsAmgA3PlgTYO12WGsxsV+7B+JYc+QbhBjcgTb9qxaguoHyU/yr5r/8LAQ4XYCwAKcL+B/WAhAP5llG6vJ9qO/K+PyOQNodgL+16T9HNWkB6n5t9CsLUF1A+XmSQFmAn318HB9/esUAT0WAVZKtHo8sTkQGsP2uAFCa/hYEXj6/uQHLAlhB4H+vWoA7Hnpg+q2gbMvIt76PAXR25FvBn7QAFegGeBAA6hhAWwAzCPz6OH5IEWAV7Jd0fDTyHX+PSGEFfwPwKgCUoz6yAGYa6AWB/0VYgMyIe2n7hsFfZuRHQaBKA3elgMUCNPDL76/e/k0Fgf+5QIAQ7MyIJ/bdcb3sOZgAMEr9ZEzQWQIk/DgWYBCBgBAks4AmBAkLcApBMghME2ABqOzDD0enGnEoBth1zeXUT+X9zfSvpoCSBF4aaAWB/5G1AGSQFIL35OdhRv6uANCTgbtRD4JBJASlgkCWANZI8h5UlgTUNbKjfpFo20b+igXQ9QAlA7d6gEwBZS3A0wH+nbQAM0AvH2OBTYK6fP1MAGjpAaz+T4pAXSYgCkGVBC0GEIWgpgT+ZCwGff9vGwgQmcvQNydTrp3ns6wUDOwmtP/O11tWQAWDWhEsUb6VArYMQGYCuhoog0BZDCo6QIYANNAeoOSo3nKtWWJlRn6U+okgr7oTRgZGJJDqn/5dagDVCnRpYCkEXcUgKQV//68JC3AXKHedlx7dHikdqTcTBKL0r1kHwgLAFFBnALUUfPn/Uwsoo98pBn3/L0kCbAPrztGZsDLR98m4ApnvD78jEcjRASTgnvnvmkKIILDrB/j6OGICJIFKP9Dk6PNGdXTtYcQmr21mBNW3Bz890y+tgWX+ERFgGoiUQMsF/DOwAOeDbL1hfTcQfAhRl8yzb49IXoFl/L1FghstQCWBVgGrHHz2Ahj9AN//0w4CMEFTRIKbzhGNetbEu/5efzeQ+nXZQNALaJp/JQTJfgA3CHSyAI4ADDi79tlBlF33Eox8jxRD9U9lA6b6J0BuJh8ogENT6KUJmDqA5QL+kbEA7ANl99sF8s3Xg9bByQq6wI8QgIYsQOT7FfwwAAT9gNX0Dy4ACEHf/QNLAPZh796PFV8W9oMjOVnvRxnAag9AB75hBaT/P9VA1BFkuIAvvj6OZQJkRwnjkzPnzIDH7mua9mwQyNT/DQmYMv9WS7iaEyB7AnUa+N3fZyxAVhRhR+WznDd7H0T6NyMAmeBLK2DUAaoVKCpgJwQZMcB3f5clwMxDyhAhe/6sqd64vyv8qKAPZQEoEIQagBMEWi5AzgtoaSCKAf52hgBBIMSa2lBYyYI1c1+zxxCjvwNdEGJoBbOk4KgM7MwK6lrCnBjgt9MEmH1wgR+d9b8zx6VyexJwLxNwewBVLDBUAIEVMJtByBigBIG//ZvAApgBWZAjh6ObSKdWALrtWHTfhvCTEX902iczAC8VNF2AEQMMQeBfEwRYJUF4/CoZiOPDeyAi/BXhR+f88m9zNrAnAOnZwVUIuoCXLqDKwLIcXGYHf14swF+RBAgfIAnCj/Y8m+RfKwMYrEDQDTQQoMQBVxBY+gEaAf4yQQAKvAQR6PMlzknX6IkRn7q/OrdPxgrsJFDt/+XI96yAWhsAtoTLuYGCAOfcwK+P4zdZAmQfSnbxBBrABCmoeEQHeSRBWtA3I/3qzOAy62kRyGsHiwjwF0kLIKPcFFhk0Gjl1k9/LW0BnPLvrP+vxJBVQNQRrGcFNSUQWYA/XyDAMhkWSfFM16/Lu8h7gmkfGvWeC7C0AGNpGNkPWH6vE0PrAhElC2g9gV8fx7d/tokAeuROjVgr186aYyJn33p/K/5fi0AKcCYFhC3hanmYkwAyCPz0bRbw7Z/eRICtppwAdLjeDaSxvtP5eVD40Wmglfqx+f/QC6gaQvX6QAMBShr41XF8+ycPJoD7EA2gd4/WmXuIjnGLPsDsozgg1QgaVQIjC3AR4Nd//AIIED3897599+gHqV+zDDL/19PCay/ANSuozA4uLeHnCmHVBciJIV8dx69/VwlwpVXnaJMNoTPm96UdE7kLR+ptI7l+5w25f+f3ARlgL6B2AXJqWF0hTC8TVwjwwx8I0BbA9CwJ7PG7w/crwGEQiDIAsT6gtThEXSewZQFfHcevvn8BBDAf/iMtTST1KjKkKn8C9Gj0y7mA3cogwaQQGAT+4jh++d2DCfAQMAOTPRszeD1+nSuQqZ2T91ewLeXPSgF1GRj1AsqG0LpK6LBSaCHAb28gwFaQN4M5fW+e1ItGP+j9D1O/pPkf8n8VBLZ1gq9JIVoH+KwQ4DcbCDD9UIEPzY7OR12bGv3BhI906qcIYUrA2v+LhhC5RNxgAb48jm++nSTA1IOfGM1Pcx021cvm/BJkEPFbU8L1dLDWDGp0AxUilAWiWkPIp8dRLMA3v5ogAA1KEvBnPm9K6JEksPr9tP6vK4F6GZhgeXg4H6AuFQ9cQCkHf/7lcXz9ywQBKIASoO88363nYke/Ats1+VbkTxR/hnUB5YSQKgLVQpBYG0DGAIUAn31xHF//EUmA8AETwL/Uc9C9/ZmRnyj6oHWB4YxgYf5bJdAiwCdvCfCLbwgCuMCtAp9R2XTef9OxFuC6oEMVeICpjwo+cnsX+OmFoaX6J1cFUSrgqQEoKfjjT47j54UAXwUEmAX/RR+3weTrHH/I+YGpt/J++VqYrgEkQYBOCPrZ2+Xif/75cXw5TQBn9EHws/sHKSIrzcq0MnPMDrPvCT2M4tdlAFr+FeAXUpzlX50ByPcFiX6A8s6g0wJEBDBzckYWBcURfb4MUTLgDQUa6TrYe3eKOq7p1yZ/wgVEqZ8UgKQK2KaDyVIwiAEaAT47ji88CwAJwD5AZwSzwLP7mYAv3CuyAO0zJ9rPiD3I5HefqdKvNv9aAtbrAugVwqQQ9PHHx/Hp58fxxS+cGGAgAPtAn30/g5zTub4a5Wn/HwhAQ/lXdQFrDaBVA9UScY0ApS/wk+P4tFgAmgALoEYyamYEP/JccMSTSp9FAmbOH3IBZgHIkYHrErFdMaiogSUGKBbgs+P4fIUAU2BYEbYTM+y4DiSZV+BxYoDzfjaIPmbUj1RArwdABIBmS7hYH+Cn1QKUl0dSBPAelAFcGrRnuEaQ/kngh0Awknwj4Qe4gZQGEOgAMg08CXBND5siQARuansE/Obt9L3NWAAB8jYXAOYAhlkAEILavIDLBRQCfFoaQ7+MgsAkAJ6KNphhzx0kXUWo3jmpYCr4izIAhwTa/9MuwNAAhkaQSAqubw4VFiBNAPpBz4K76bhZsunAL5R/DdPfwDWKPjT41jRw8aLoTBZwFoQqAa6K4NuXR5cbPV8b/q4r+EwDA79YU8XdxNh9Po8QjOrnij83+H/d+wffC4BWB1dqYGsIqUvFKgJ85rqAmdFIHkMBTJ6rA5c8hjX7jOrX+fuM8kc0gKAuoPOzuiCELgU7DSGnDiAIUEvCtgXIjv7s/srChKCQ+1OEIO7VjfpvFn/MV8Oi9wQTaWD39vA6OaQUhL5QQWB5eG1eCIqESRCQL90KDEg/pwmEyKC/O5H368i/Emg6+LO6gFQh6Mz9rTRQ1gIuLeCMAWpFME0AduSQ8UMIWuZ6FjkzRE4A7+r+bPBnuYGgDtDcgDUfQKSCdY0g3RdYKoKlKaRzAc0CqOYLMzpesAgZK+FePwM8Syg54oHy16mBOggEqSB68VOYCaB5gE4doKmANQ64agF1buDrKw0scUCzAJ8TBLjj4acJxQI3SYYo/UPyLyQBAz4R/A3LwYtuIBgEireE6AWi5FrBXUXw6gkILcAKWC/tWH2/CHhk+m/z/6ANzJ0QgrKAEgfUWsCVCZSegFIRLE0h8wRAvnXnZzvPhSyDc36XCFHez/p/YS3ga+BEUUg2gXoEGIpBNQhUreFnU8jVE+ASYHYEp46bBTp5HHNPtAWwSMC4AAd4mP4Zr4fzpGD5zsDBBZQ3iF8WoJSE5wjAPPwH7DMDKkpHaeBlQAjAjiRgmRp6L4Ks27y1AEwCgKlhsjO4yMGtJJwlQBQsMQ/X1Nd1tL1otmeuM2P6Wf+fBX8ggVD/GvglRlDLw3ZuAHUFiaaQTygCZH0lA5yRbzMEokm4cN9m8Dfp/xH4ZhrI9AJaLeGgM1i+Nq6uF1x7AjgXEIF193bHMsARu7q/o/rRur8RCJ6jmkkDIw1AE8BRAmsMYPUEmDHAnQ83KrPu3j71XYzRrk0+7QLI4A9pAGhCCB0DaDm4xgBXV1COAORopx74znMBta4rVXsSr3HsjPgjR3dn4plRz/QCEkogWiNIqoGyIlhWDfcJMPHgotHrBVqw/EqCu+u8rPjTwAYl4M7MI/AdQjC9gGh1UFkUQmmgrAjWghBNgK0PNwPoBgJKQDME0wDP+P/B37OWAPUCWusConKwMTtoWCiCtQDhQ/SAemHbZkw/yv81+GHxR7sAqxfQKgfXDMDoCuosQCkIffx2kijlAoaHQvjNsJtmxzkIcrEij6nxKxNvBn1ydKuRngZfLgVLKoHD1LBaEq5awJu3q4fLpWJMAtQAypsAYebsQRoVEkMeT5CEBZi1Yh3ZZ/J+hwhhGqg1AF0F1EFgMDOoWyms1gPEiqE+AdjRtRPwGfDB9VMkm837Ua4fgM9aAm9FMKYYZJWEqwU45eCrKwi6gNMCWA+GHZXRg32P13AJgu7b0f0Z/0+JPyoGcCeFgnQwbAuTFmCJACvAbhrhUaq2bAFIEQjm/Zv8f9caXl0DqgcYbWGnFRBdQVUSrotFFTmYcgG3P+xHWBQhwdLkWPX/hvLnugGrDoA6gmRreLIg1FzAJ0YW4LoAb3Q8K5iJ+6KCQOASwu5fVgOQXUAgAzBjgIl6QGkMjWOAHSb/hZ0DkgCBbhR99Chngz+rIcTqCIrmB55ZACgJy54AlwAZ85/ZF6lq6cAsGNWZ+8mIP4MErEz9lhrApA7gagHiLeIxAcgRGz3kaHuGCNG5ou3UtVi/z4z8ZA0AzQeUS8St9AXW1ULqHIFWEDJdgEMA80FHpJk5J1Lh5MhfuKZJCG3qQbEHpX7RyKfdgNELYK0R2C0UbcjBuiegvT0kRQAvPwbmeIYooSkmwU9de0Pe74KfCP6oGADUArop4qArSFsAOU0cxwBEpM+CtQ2MCPwNBHUrgLKbx1L8NmoA0Qqh1gxhFAfIN4h29YCPZRZQbv6aGdpUQPah3kWYyet7pVu26DMEe0npF5r8wBroXoB0DBBMEtWvjykVwXcWgCCAlyNPPXQC4LuvOZ33Z6p/GTeQaAqFi0WCOOC0AKo1rK4UYhKAeTDmaGKkVBTgZS3JHddxdP9Q+gVA08GfrAV4TaFWRVCOfhQH1DSw/BTvEV4nQJA6hZbhThA9kjHXNfz+XQUga4FouEws6gxWLqDGA9AClIKQ5wLcgEinRk6A5qpqCSvAWCRmn46QbN6flX4Nkx9ZAzoGcDIBsyp4WQD5KvlSEh4tQLn5+kp0MAK8EZ0BmwHrvZ5vVvpddQNRQUhWBmVBSIz+cK2AywVMEWAZlEhoQdaEHKmZ0Q33zfp/JQPLGCHs/rFeDCULQIYkbC4UJRpE2/LxoDWszRByLcDKQydBpoouhruhjl38Dkj3h4EgmvGTifwNMmSbQqogJMFHfQE5AiTBjMQUd+QFYD/y3FHE76l/lq9fiQHM2UGT8wTPegBlARyzmDG5prCyY4Sz98gSLPD/nakn1L8IeDP6V+6AKQvr18cMmYDsDr6FACwYL2C/yAponz8AveAG2MZQJAZFs4ROF1C6gysByo3L5WJnR+ttxz2QLMjvM3m/Bj816hMxwLBaeDBTuGUEujHkWjX0TAOXCbAA0DJpFq49AAv0fgkkJILOBMDfzcR7FgHMCdA9AowLaIGgWDmszRWUWsA1SzhHAOJh04AS5zIBcmr0UXoX3p8EEBWAFMDUyM+4AmdySDoQVCSQi0fXkrBPAAIkpmqmQcmAQB+7+V6tdA9aBOvlzxngnXkBbFWwaw5BFgAUhNIEyAD+DPumzHxQ8jXBX1X/iBhgIEEwRwD2B4p5grUrCBPAS4M8P0mYZi/ImgJr9zUNF5BJ/bwA0NxmxABo9GcDwTM1VJNEaAKkAFslTvL4O+/NBDzI+yHAGVfgxQDOkrHhiyTrq2RrIHhNEg0tAPKFKBo2fTUaUZ6pvWMbW9gJXECU9yPwp9NBsjm0WzJOTBOry8eVDGBIBYsYdC0baxKAzYcZs+0KKqzfdUz91vMzLiAqArGrgXkFIbYoZJSGo7JwrQfEBIjSollg2PNO7OdZqEjdswK9ndE/tApEDDC8OyhYL8BrEN1PgAioaHvWEtxwvh2pn2nyE3GA1xgy2x0kF46qE0SKFkBZAHrUyC85AejMdSKlzrUGEYkCU79dBHL6Aqk2cRkDXL+7fQEuATIPJ1LMXtD2ndH/dAAIloo/5WThJrJTxbqqYG0QRQQoN13mBZjTnaNRTgRRUFN/5HWJe1zN+ynwr+88mHxGFZStYd4r5Y0O4TevjwO6AEmA0CcaZAiPSwIQmXkLrDCgI+4/nfp5vp6MAyAhwOhnBSHtBloM8AbEABYBph+yVTzJPvzIQjhFmlkCDS97CkQgTRaqCuikgnSXsCMLN/AvS9BaxK+egCEIzBKA8pkLYL+38ycDQAt8yhUsNIh2WYHuEramiom1AkYCZEeSFj1WwJ64dveAb7p25AYg+KS5Z94c0mUAxIukpCyMBKFWFoYuwKt3Ww+YBI4NrKiqm2OOdx4/gKuBRUBH4HvbLUFIrR3UZQHMdLFSC7hWDpPzBEML4LHfHH0bSDRDllvvlW39dsDNugMUDLbPdFCozH/UG1ADQUgA1+SRVoA+h+drvaBrx7YgqPMInjL7kUVIxAD0+oHeMrKiL2CNAGBUsFZhmiCZ4GyWJFGxJ2H2s6Peiglgl3DwRtFiBXSbuO4PxATIPOTkw3Ll040jMjN6M/eE3gN8WwagLYOMDwwXQLeJX5kARwANchL0KIqONPUMmFHQlrpW9L2tsm9k8qPtoBTMvEsotYikJkB5MOW/KgNHD/LFbyfAjciSigNmewRQVsCogqgwdGUCsj2sWYCQAMQDS5Nixzl3nAOMyN3gr8YCOiNgJo7K1cNkh5CMA2wCgAeLGD/zoIaHQQDw7NeGsYHVLh51AlnbyTaxNn1cWQFUE8gRYJIUbOCERskUWZ7hPneDX0kRkMBdO6C6ANEg6hKA9nFsWsSMdATeIz4jvwNFUhb8IBg0y8RENoCsQFcYurQAnwDGg18iRgJM+jqJc0JfvAD+bAqYiQmi8jBsEyMLQyEBUl/QYDT90J1IOXOOW/YlSeLFAjuXjXEnjhKLSNVAMCaAZQXu/twyjzd/TpMnex+zaaDXJ+hUBk1NQM0ZpAgwFeFOFEVMszhxrpnmDBr8jGusADLiD5MdaF0AxQPBvEGZDdAEMB9oxOwZ8Bzr4ppY7yHPbMu4NO+ed4FvZAIrzaI9AcqNljUCLSYGX+QZj52+p6yJnyQ61RAC8DCFoWSz6EAAd6RHo53ZHozuMIhirhGNuFkiz4Ac3Qtj9tE+jivItIyPBCAAokD6sZ1nBnyGrLME0G8XC1rFukmk4jVzkAChFcgGNolRwObHj97Pu97stlnzDyuDqoLIrieECUCO3tm2Zxa8ev7U/gmybbFk0fWi7QsWQDeLetPHdFpYLYJJAPbhDCye/MIpkLMWSD3kzLWifaPttDWdIUJmMQnZOCqEIpcAS8rVIkiz1mUXIVngQgLcGAe4TaOkS4gJsAtIzfBJSzGbomb8LQUqW/CR33vjd7YKRXTfwGUFeALc9EVCYDY+NPdaC9fJEGbWQkUTSOt53bUFQKYwRwDHXy09jBk/mDzmtvtbIFA4CMjvSJWPr3PVfbcTYNeXmcoAyAe1+x6Z891BPNYqyPvTxzw9AZiH+4d9HPk+GBRPT4AZlj8bIe74DrMWRR+3nQB3fNltgDoTL5eucdd5Ey4tq0bW/ecI8Kgv/OTXWSI7+d3okU50LHXnuvanCbD0ZTWTyS/Pjspt95a4r8w1M/t63zkzyhHYnbDHEmDp5hMPFH7xxeOn7p255q59EibezYrU6Jfgt9/FPs38l8/qG0PKh+W1MWaliblZ5sHssAY3Xycizup21rKh/QYrkAG/jvoL53IukwDRl/RyS+8LvojzegQLyJf5fmkiAD8PR7uo5srRXq53/i2IAAnAfglqP3K0UucCTRArrsO7ZkZVW7KajGU16g4ZUy9B9wlAABaCteMcDNgbrpMG2rlm+FwSYGtiD/m7cNemn68WQ5p+OfqRC4i+hLt90Ty+r3Nb14WfvwcCbAXfJUAZdRZLZ/3iSzjOuMdnIEAKfDXiB7OvwR8sgEOA1ChRzQjanD3E7FrEWwX7URaADfgM0Ds/rwO/ckz9J9PAtjqIsgIp8JMPfuhrq9fOAOXEC/QoRtfbdA+3RfveiL8i/iHqF+CfJAkJkHgI9MO2AEtcyyIOugf2vthj0xYsEfzRef4O8BkCrDyUZzoWEWa4P0BAljxmRw4LfkbLJ8A/Rzfw+e1zygUwD4Q0nRQZZs+18TiGFKbbUt02lOlHwDOLZ6IUTwo9CvwBeIYA4cOYJEh4XuQi9LU2XXvqXjZoFGZhRxNC/D3k+0DaRSPfBN91ARMPXD/M8OE+wzUm7uEc2YQIRVkA4SJmUr5O6lVm3wU+sgARmEvbo4d+8/bsvWcCzizoXYnWIAM98nXkL9O9sq3U++RnngXoHlIAyPS+2pRmrhMc64KcJVg2zWQDv2g1M8f8DyMfgS8+64CXRIBpoHpAHsD0tgxgd1zfO6c30zbQJcoIdiVsgwwoBrCaOGBFD1T2OpNvgV9IlSIACwa7n/HiA+RXTXKx12L3YwgQAc3EBEbE762lnAbfA76a/4gA1IN3Hu6LOD7pfh4e+AHzb5l9NucvQ7+5gkoC5AIkgLt+h1OXdTQtSZX93bEs1ncw38Xj5fPMSGdiACfdkxYhaujQmn+TfnWwd/3dSNARoEaIGwHZRZx2niwhmP1nrEDkCiLwgRvY0thRCz4G8HXkTxMAAko85K3HoWVQFGlXiIcCum26/4zUqwI9s6tHg6/jAJX+nSRgLEA0+iJwo+1oeTPLVazeC+WCkMATmHw3A7CCvgmp1wLf8v9Dvi9I4BKAftDiwew6JiIMug59jGU9IjewW/WbkHqXwVepX5oA7oMPiPCUx2Y0CUIHoNS/rO9HxR6p/atijxX8ocg/R4AswM+2PxE30L5/JgOIfL/crkB3R74n+6pAUAd+NgE88DZu86zCHdtgrOEJUrMtbU5hB87sWaz0UcUemf5dcUCKAAMggAjmPpl9BSBL1/TOw6a5mbp++Y5OsNfcg9rHTf2kqUeTOaKoHyh+gxWAWUAFzAFuBuz3fsykG5jV+buYgPT9uuK3VOwBit8cARKEqCDrn/BtFnIkEmSbPrcBvKkMGiKPm+o5wo/b3xdJvV6xB+j90h1Ayfea+1nz//MVgeUeTim4KoEa8Pf9NzDnFhloknhuwPH9NAkMd7Ct0kcGf1H0DwlQRqs0e9mHTe3/vkhF1gpCs48yAS8GIHx/Vu9ngz8v+s8TgASOIkEFY+c5CXdlZQNUx3Ck8YPt1qhfKfaEyp8j+8roPyZAAA4E2jgms69c1HiwRpnzR/7fKWevln6XfL8h9oTAg8Cv3IcV/DUyyBjgdAHMQ75pH4YozD5m4JloRpnp84+6fFDqh6J9dlqXGfg50m8d+TQBugeugH/UNvo62rVkNIFZ8cfy/5bvt6J/S/pVkm/k/4dyrxH9hwQIHzpBBnSOu87rug6yZBwGgGQckPb9ge4fNXnoyp8b/F3WYSRAXXDgAvYECoHsfMYCbu6XvF4HOhlQDv4dRPV0yqcJoa0B0vmt5VucQg/l/9ngb4YAERmo7co8y2MiQkTbKSIk0sC0JSDVPjP63xH4Ib8vPtO+37QAFJjASkQgpQEnLZF53sD/d6Mc5fZEHwAK+swO38D3NzNvaP+eG6CUPzXyKQIMD3cWFIswK587FoXKAjToFglIv99W4EIVwZsDP6vfr8v77yIAQxK9z8wxyMxHVmUgwkIJ2G36mPH92cAP9fsjvy/NPvi9koK2ANNgLYzu6WsStYOoFTw76fNW0UelgEOfXxV/rH6/kgKqHgCKACEABLjv6xxWOpiRgcMgkCj4sKIP9P0AeJ3/d37fE34M048tgAGsBybcljmPR6bMeaL6AtsUmvD5YbPHA3x/KPwsEUADQAJC+fzo3BPXisQgGfnrXH8299cuQDd2yODQavKA0m8179oagCnejPBz1gWqOzh/ueYGtFpAEYLEQ49AbNuzQDr709e8RrPrZrIycHbGz0zgZzV56KVdZn2/E/TNE4AhRXKfk2joGIYcHuEybsACPEgHw9zfMvvOLJ8ux1fR/qrv18DXv20LEABjjlL2uJX99MgnBakuqFMAz5p+tsuXavZQIz4q+HRl3iDt20eAFeDUsch9bPlMqHedMukUg2U9MbYAAA/6SURBVLJpXxj4JZZqd33/RN7fiCF9vPL9nAWwwCZIYAGZ/by5CeKaVC1Ajnxt5gOzr0UgM/AD4HeTO4xl3KhijwwKdd5vWQER9FExQAcSSYL3coznCqw4IFIBiSCQbvhAKl+iy9dyARnNvwO8poJRFuCBeQZttUQMgriVbSvHmhJxlAUQgGfk3yH9C6TeMPWTI179DtM+aQUs9Y8hwACG578NIjz0HCAlpIpBRLXPIkDY8BFZABH0TS3shHr9CN2/ycCWDlBHOQMgtAiALLfvx1QFHRUwFQQyub8Cf8vUbs//g/l+Wu8f/paxgRSCJAEgCRyAzf0zpHAsiueCpK4QqYGWzu+mg0j7l58ZoLOze5mWL3OiR2bkg1jg3cygDy5xpoKAfL7apsUcTSCXFATYLKnSWcCi/0eFnqHbJ4gBIOjB0i5d/k+MfCvyl5JwSADKKiBiBNZiiiyANFpVbCO8pnYixetGeTL1Q0u6Llf8JiRfmeu7v4MUUMYAjRyeC0AgRZ91+btFDPZzEeC5hEFxAJEFZPx/Jve3ij669Fv+jsx/xvRbqp8Wf5YsQESAR2036wlADeyABiPf8/9s7k9JvuTEzkoM+XOm4se5gNfH788LBaPtUcCi67wSFmOwMNksYMX/q2DQyv1DC7DB9A/mn8j9myXosoBFAkhwpkjyCgef1LmssnBk/nf6/8W0D6l+2W4fSQYzBZQi0AwBaKBJQJfOp6wVlQXokZ8gwU7hJ/L52vxPq3415UMycIYAJlAB0C7AzrE0MXSaqkc9yAJQ0Jfy/wu5fwd8tKL3Qrcv4/f7INBwARAIA7jMvuWBZ/b3CDGkgCL1RAtdhM2eXj8gAl9X/0Dub0X+liVgCj4dyKgGADT/rh0ssgDDQwfAT+1TANp0LiYLQPMCZkhguYA7I3+22TNK/VDg51qACNjU9gjsie1DcDiRBdAkcLR/CH60pFtk+sVorrGAnN2Dgj0YACIRiA0CO4AVQG2b9TkY4dT5vOO8WGM2CyDWARzyf0EGN/1Dlb6gz68DuxZ+jMkezHQvpPh1lUDLBVhgPdvn5Q3nQ+WSaAjNKH+yFCzJYIE/FH6skq+q7dOiD1Pv9yJ/kQ2YLgCN8BB8MUJvPx5IyGEtgOgE8ho/psA3Wr8Q2N1nbKuXApqK/JcJoIFmgZ/dz3MzVgpoZAHhfEAU/VuqH7vAg1L7ok7fjObfuQGi7+/tjJC3E0Hqf400r0QaeI5gBzBzhDMgL55Xpo9uw2iwCmkb7ZYQpAM/9XKHTOQ/gD7R6Yt8PkoDQ78/TYBo5D9wO5SHvSzA6wQi5wB6LqAjAxH8uS6ANf/BbF80/WuwAFIdrBagpkbVAkBrcIGtLQH82yDGyr5WCtgaRzbXABj/P5AgafpbGqei/0ECNoBveT4IAKFVUO7gg44AHmjENg/ccFtEGKeHwK0FzNQAyKpf2O/HVP3YkR8ofgMRjLxfWwNIgHD0S0tg/S7iCXk++nd9vEEAMwuYaQTd4f8B6JmKn1v31wEfKvSgzxQZOsuALAANEkOEDftY9QO2FkArfyouQC4A+X09swdG/DUAVIWezgVIM49SPW3mvbx/lwV4tQHAHecw+wOYeQETcwBo/78S/KGq36ZmTyvt41xABPojtxsFpEYIth+QJcGs/18J/gLZd2feHxIAmf+Vz07zjQjDflZ9P6oJOKO/1fnZHkDP/4ttp2XQoz6r/Dkjny74BP4fzQJ6pwK9E4XeBYHXg65gh6ArAO/a3+wf0H2CVi2AHfmT/l8Toub62yZ4Rn5fCjxGAKjdAQ4CDQJ0wHqgG9vSx3tZRaYWsFADmBF/GhFqPn+H6kf2+uvmjxwBAiAhoDcc00Y+kpCDWsB0Iwjp/2UmYFkAaQmGJk+Z0yMByEr3wAhv+T8Z9dsxQLUAFczo5xWcaZfB/t3FBta1ogBQFH+qz5eqIEz/UA2A8f91H8P/DxagAgt+ht0+kdyb8f9aA0BK4Omvaq/eq6tn7wl+IitAdQQt1gDY/L8Dnen2ESNfBnvu7zPVPhkXbCFAZA3E9tACJM7VBYBOFoBmB0ezgZi5/7Dy50T8dMmX6faxrADR8OlqAJQFcEAaAAb7miRg9k0GgV4hqGv5juYBZPw/En+ABNyqfyjt03EAa/aTUu8QEGYJ4AH+iG3V5HedSUEKmNIAVvw/AD3U/YHca+b+k1G/DAxzBECmPPisBnONDBPnQMduyQIm5gE2/2+IP6Huv0Pz19YAEcFwBQhwTYhBB2hBoARvBshdx6gMw50nGEjBdCHIcAHbmj4Yvx+JPhboQdCXIgAcyQawct/Z45oFAdcIswC2EBRZgsD/WyRYSf3CVq/A/JtSryLDIAK5MYBM/d7j70P9AOkB1pwAEewN8/5UICjTvWHpV5X3m8u6Rekf2/CxEPV3I3yZAJYbYAmxejww/1YAWF2DtTBUdh5A5P+R6rcr9TOndUeij9PsgbqBoRIoY4BSuetMuwLUMvut4leOz5zDIIy0Al5BKGoHo0hwl/8nRv9yqTca8Xp76AIuAKVv1oRwCeIRRm9z9p3KAlBTaFQNzPp/lfplqn5so+dgDTRoXYM/7vdHpV89J+A8bWkJK1/iHCl19IIRHJFg2B6B7W2XbiCqBxhZABz5IgbI+H/YA5AVfkAWEI1+q6vXKgBFOX+OAAAgBuTZfaBrsSaqaCFIFIW8dwOYU8CkFdgR/BGmv4Jo/dwCPqoD6KphswAI8Ad9ZroU1BksawLO7GBqOljC/NOFnweB79X4PfOvrcQ7F2CAPQR3RpB3Bn7IdQSfd7GGjj+M1vKoIijBH1JBMCOIjv49s48qfUDv32H2KfCN0T8UiqQFQOY7BNYhjkkeligsAQwXwICvVwANlT9Egpkev0mdn5J6VdD4bkpouagKGjsCeMBEI3zTdqQMRilhWA4GmYAOAmHp16r6lc/BP3dSh5J5WyCn5V8NXiDzQqXPGv2AGJ0LYEZ724chC0uKSDtAsYDqDzTFICsNTOb+FXC32hfo/abYQ2r8COxB5/dGPyAGJgDSAmSK6P2u00nyuFQsYDWHGjoAdAUeAfTIz8q9StZF5V5pyq20zpV4nVEOSXH5gaFUPLgAAzAEUGcNSKDrMcz5dKnZUwS7XkCp+VuNICj1897rY5j9ahks8z8b9GW6ejwfH21zLcAMwAyw7HldApTg01griGkH62IAlfuzmn/X7cuMeuDvh1gAmXAg51qj3Bv90IWwFoAFbed+IQF0V3Ad7WrUDy4gY/5Jxc8s72rQUXFHizOO1GsWeALfbx233QK8fn3pAUmXgIiziwDSIgwScDD6vWqf1959m+mf9P1QJu5qAQFgO4EtYIfnk8GkpwhKNdAqBlnLwQhLAPV+L/jzFD+rto9Gv5fmAdNvpX3m5yIIQO7BtQAhSIA0246JCJBJAw0CaAXQLPrM5P1A6EH+PlXYWRj9pl6AYgAWRGq/18fxmnAH+lymIARSQJkBNH8ftIEP8u/m1O+OnH9l9NMEiEBd2h6QoZ1baQmwRcywAGEGQAaAXfEnq/o9ePQz5p8jgAOQCfzmY7xg0NIBWBWQln/JyF8KPFDscTKADhDt6zO+35N9A//fN4RYgZkBMCTEhn1NAjhysEuASf9vWQAv8q/+3PrJ1PjNaF2mhlLdQWTp1J+3f5i6QYsBEHjkZ4gM1GdMfBA0icJCUNAGHvp/ywIQtf6H+n5y9M8RAICjQR1A3nQMLDh5rWFkDcBT//SMH138QaofMvvPOPq9GKGlgR8pAccFWwMd/B0RxwsskRjUNYR4S8PM5v+M7p+RfheqfW6AR5r/PAEUoB1AD9gmLcCQAehp4poArPlXhR/LAlRLcP4Myr3Z0R8WfAIT7+r+RADYBYHSAkjATfAdIqwej/oS6LkBddRrHWBD+pdp+IAB3y7Vj9H9UwQoo6aKNRLYhd8tEjCfDwQIGkJSPYCR/IsCwETwp62Ame49IPVDbeA6QXgbAxgEaGAZRIBgRvsypIqaQ3VbOLskjAbfeMlTZ/ZlPGC5AEf4saRebb6hTm+lfonoPxKJBgIg0Hd/9kqQwHQXQg3UPYFuEAheCOUKQFoCntH9mZKvHPGLoz8CNWoC6WQEbQEqIB7oFCEQyPUzywpUMQpJwSgNzGYAkfm3qn8vNPjz8v/mHjoCANBMQjj7thEOAPcIBptJpBAkSWCUga3JoNIK1N919U+a/pIVRLl/5++1FbBSP22+k7IvA2o3wh038i4LqDGABsz6W8jGGlDrb4YUHgGiOkB2FvBU6RdYAlP5s0z+I80/ESt0MQAL5u79ZEygSeBVAnUNwCXBk5j/hwV/ZKoYE8CwAi4JkseYBAB1gKUA0CGBK/0KEQj1/g1W4EnMPxMsjgRQ4HVAM8BOHG+2iHkEmA0AKwnI6L/p/YAEuu8PEWFn2ZcBNOP/hxjgBPsCEAHPftadwyOELEGDQhLVCBJpAFIB9MAPVvdGIz8s/3rdvoZ/9uRdVvplBKAxC0BASTLcsV31IEhNQBeB0DpB1qrgcB0AC/zFWT+0+V8N/oiAblD5ggygtwAA7MEikCSwjpOfD1lBUf/q+Y2G0JoJoDeFeQGgV/+3Gj9qTGDp/9r8t9EpgO5G7CoB2MpfG9r9LGDQI/K2UaTpAAQBGGCz+3gZAHrVTAsCky3gmgQd8D9C88/GC5AAHojbtgEtYdABkAiEFodkS8A68PsRm/85AmgrEP19gahJEf2tA80oDUQi0KAB6GngZPk3XOXLEX8Gs/8s5j8RLzQLUECQwDQQHRKk9gFksYpCegZxNfslEPTeFOoGf97MX2kJBOCy5Wv43Wv93hz9s6M5mwJ2MUAjgAAcAbzls2r+japgt9YQUwQyFoFw9X9U92dKv9nK34O1/7eRHRcA2gSwSLDrc+T/pQ6gS8HOghBhDUClf+aavwL8qc6fJ9H+lwjQjW4F9rAt2i5MvukqZOqHpo8ZnUBsDcBL/6I1frPm/5ae/+Robi5g1gIUoBigM/udfl7+0+YfKIC6JazT/8WaAOHoL65hRgCKOn92ln43NX7O+P/BBXRA1aBQAwhGvjxuALweb2QM3lTxFv2DxSHDPkAgAaP6v7QEqP5PFX/uMv+JaP4WAmhCQOuACAJAH0gS1AG69xEFU8HNJWBr5J9c+8eNAUD0/1LNf2gBEAFWP4OFIjAv0SoE0fMAdemXecGz0f0LrUBABNS5k238zETzM/7/HQHKSyO9kbx7W5AFuLOBwESQ0wJcsQHbACrbv4bfn2HWz6T5z5LmrRBEEOANS4I3KugzgsCutOwtTQf6AKkq4ET6l6n9Z4s/sJTrReuJSH7W/4cWAILuABzuH6iB5qRQbx6AqgN0FiBq/jBe8fYMtf/sSM70AHSEQRZgABKA3u0TbQfWIysDZ6uAZvUvs/CTcgXPXPufJsBHr4/flwUXXwkQ/0CAd3KqFIR+jAT4f/j1fYWCGV1BAAAAAElFTkSuQmCC",
                tc_contrast: "data:image/png;base64,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"
            }
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = Class.extend({
                init: function(a, b) {
                    this.queue = b,
                        this._render(a),
                        this._bindEvent()
                },
                _render: function(a) {
                    var b = document;
                    this.el = b.createElement("div"),
                        this.el.className = "remove_handle drag_btn",
                        this.el.innerText = "X",
                        a.appendChild(this.el)
                },
                _bindEvent: function() {
                    var b = this;
                    a.event.on(this.el, "click", function() {
                        b.queue.emit("remove:box")
                    })
                }
            })
                , c = a.Draggable.extend({
                init: function(b, c, d, e) {
                    this.queue = c,
                        this.type = e,
                        this.initialX = 0,
                        this.initialY = 0,
                        this.options = d,
                        this.EVENT_NAME = a.EVENT_NAME,
                        this.offset = null ,
                        this._render(b),
                        this._bindEvent()
                },
                _render: function(a) {
                    var b = document;
                    this.el = b.createElement("div"),
                        this.el.className = "resize_handle drag_btn corner_mark corner_" + this.type,
                        a.appendChild(this.el)
                },
                onmousedown: function(a) {
                    this._super(a),
                        this.queue.emit("resize:box:start")
                },
                onmousemove: function(a) {
                    this._super(a),
                        this.queue.emit("move:resizeBtn", {
                            offset: this.offset,
                            type: this.type
                        })
                },
                onmouseup: function(a) {
                    this._super(a),
                        this.queue.emit("resize:box:end")
                }
            });
            a.Resizable = a.Resizable || {},
                a.Resizable.RemoveBtnView = b,
                a.Resizable.ResizeBtnView = c
        }(window.photos = "undefined" == typeof window.photos ? {} : window.photos),
        function(a) {
            "use strict";
            var b = a.Draggable.extend({
                left: 0,
                top: 0,
                width: 0,
                height: 0,
                angle: 0,
                currentScale: 1,
                init: function(b, c, d) {
                    this.queue = c,
                        this.initialX = 0,
                        this.initialY = 0,
                        this.options = d,
                        this.EVENT_NAME = a.EVENT_NAME,
                        this.offset = null ,
                        this.el = b,
                        this.isDraggable = !1,
                        this.TRANSFORM_NAME = a.util.getPrefix(this.el, "transform"),
                        this._render(),
                        this._bindEvent(),
                        this._bindExternalEvent()
                },
                setCurrentScale: function(a) {
                    this.currentScale = a
                },
                changeScale: function(a) {
                    var b = a ? a : 1
                        , c = b / this.currentScale;
                    this.lastUpdatedInfo && (this._saveCurrentInfo({
                        left: this.lastUpdatedInfo.left * c,
                        top: this.lastUpdatedInfo.top * c,
                        width: this.lastUpdatedInfo.width * c,
                        height: this.lastUpdatedInfo.height * c
                    }),
                        this._update(this.lastUpdatedInfo)),
                        this.currentScale = b
                },
                _render: function() {},
                onmousedown: function(a) {
                    this.isDraggable || (this._super(a),
                        this.moved = !1,
                        this._setBoxInfo())
                },
                _setBoxInfo: function() {
                    this.left = this._getAttr("left"),
                        this.top = this._getAttr("top"),
                        this.width = this._getAttr("width"),
                        this.height = this._getAttr("height"),
                        this.angle = this._getCurrentAngle()
                },
                _getAttr: function(a, b) {
                    return parseInt(window.getComputedStyle(b || this.el).getPropertyValue(a).split("px")[0], 10)
                },
                _getCurrentAngle: function() {
                    return a.util.Transform.parse(this.el.style[this.TRANSFORM_NAME]).rotateZ || 0
                },
                onmousemove: function(a) {
                    this._super(a),
                        this._move(this.offset),
                        this.moved = !0
                },
                _move: function(a) {
                    var b = this.left + a.dx
                        , c = this.top + a.dy;
                    this.el.style.left = b + "px",
                        this.el.style.top = c + "px",
                        this._saveCurrentInfo({
                            left: b,
                            top: c
                        })
                },
                _saveCurrentInfo: function(a) {
                    if (this.lastUpdatedInfo || (this.lastUpdatedInfo = {}),
                            a)
                        for (var b in a)
                            a.hasOwnProperty(b) && (this.lastUpdatedInfo[b] = a[b]);
                    else
                        this.lastUpdatedInfo = {
                            left: this._getAttr("left"),
                            top: this._getAttr("top"),
                            width: this._getAttr("width"),
                            height: this._getAttr("height"),
                            angle: this._getCurrentAngle()
                        }
                },
                onmouseup: function(a) {
                    this._super(a),
                    this.moved && this.queue.emit("reset:selected")
                },
                _bindExternalEvent: function() {
                    var b = this;
                    a.event.on(this.el, "click", function(a) {
                        b.queue.emit("click:boxView")
                    }),
                        this.queue.on("resize:box:start", function() {
                            b._setBoxInfo()
                        }),
                        this.queue.on("rotate:box:start", function(a) {
                            b._setBoxInfo(),
                                b.rotateStartX = a.x,
                                b.rotateStartY = a.y
                        }),
                        this.queue.on("resize:box", function(a) {
                            b._resize(a)
                        }),
                        this.queue.on("rotate:box", function(a) {
                            b._rotate(a)
                        }),
                        this.queue.on("change:mode", function(a) {
                            "select" === a ? b.isDraggable = !1 : b.isDraggable = !0
                        })
                },
                _resize: function(a) {
                    var b = this._getBtnPos(a);
                    this._setBoxSize(b)
                },
                _getBtnPos: function(a) {
                    var b = a.offset
                        , c = this.left
                        , d = this.top;
                    if (a.type) {
                        var e = a.type;
                        e.indexOf("r") > -1 && (c += this.width),
                        e.indexOf("b") > -1 && (d += this.height)
                    }
                    var f = this._lowTranslate(c, d, -(this.left + this.width / 2), -(this.top + this.height / 2));
                    return f = this._lowRotate(f.x, f.y, this.angle),
                        f = this._lowTranslate(f.x, f.y, this.left + this.width / 2, this.top + this.height / 2),
                    {
                        x: f.x - (this.left + this.width / 2) + b.dx,
                        y: f.y - (this.top + this.height / 2) + b.dy
                    }
                },
                _lowTranslate: function(a, b, c, d) {
                    return {
                        x: a + c,
                        y: b + d
                    }
                },
                _lowRotate: function(b, c, d) {
                    var e = a.util.degree2radian(d);
                    return {
                        x: Math.round(Math.cos(e) * b - Math.sin(e) * c),
                        y: Math.round(Math.sin(e) * b + Math.cos(e) * c)
                    }
                },
                _setBoxSize: function(a) {
                    this._applyResize(a),
                        this._update(this.lastUpdatedInfo)
                },
                _applyResize: function(a) {
                    var b = a.x
                        , c = a.y
                        , d = Math.atan(this.height / 2 / (this.width / 2))
                        , e = Math.sqrt(Math.pow(b, 2) + Math.pow(c, 2))
                        , f = e * Math.cos(d) - this.width / 2
                        , g = e * Math.sin(d) - this.height / 2;
                    this._saveCurrentInfo({
                        left: this.left - f,
                        top: this.top - g,
                        width: this.width + 2 * f,
                        height: this.height + 2 * g
                    })
                },
                _rotate: function(a) {
                    var b = this._getMousePos(a);
                    this._setBoxAngle(b)
                },
                _getMousePos: function(a) {
                    return {
                        x: this.rotateStartX - (this.left + this.width / 2) + a.dx,
                        y: this.rotateStartY - (this.top + this.height / 2) + a.dy
                    }
                },
                _setBoxAngle: function(a) {
                    this._applyRotate(a),
                        this._update(this.lastUpdatedInfo)
                },
                _applyRotate: function(b) {
                    var c = b.x
                        , d = b.y
                        , e = this.rotateStartX - (this.left + this.width / 2)
                        , f = this.rotateStartY - (this.top + this.height / 2)
                        , g = Math.atan(f / e)
                        , h = a.util.radian2degree(g);
                    0 > e && (h += 180);
                    var i = Math.atan(d / c)
                        , j = a.util.radian2degree(i);
                    0 > c && (j += 180);
                    var k = j - h + this.angle;
                    k > -1 && 1 > k && (k = 0),
                        this._saveCurrentInfo({
                            angle: k
                        })
                },
                _update: function(b) {
                    if (b) {
                        var c = [];
                        ["left", "top", "width", "height"].forEach(function(a) {
                            b[a] && c.push(a + ":" + Math.floor(b[a]) + "px")
                        }),
                        b.angle && c.push(this.TRANSFORM_NAME + ":" + a.util.Transform.stringify({
                                rotateX: 0,
                                rotateY: 0,
                                rotateZ: b.angle
                            })),
                            this.el.style.cssText = c.join(";")
                    }
                },
                toJson: function() {
                    return {
                        left: this._getAttr("left"),
                        top: this._getAttr("top"),
                        width: this._getAttr("width"),
                        height: this._getAttr("height"),
                        angle: this._getCurrentAngle(),
                        scale: this.currentScale
                    }
                },
                set: function(a) {
                    this._saveCurrentInfo({
                        left: a.left,
                        top: a.top,
                        width: a.width,
                        height: a.height,
                        angle: a.angle
                    })
                }
            });
            a.Resizable = a.Resizable || {},
                a.Resizable.BoxView = b
        }(window.photos = "undefined" == typeof window.photos ? {} : window.photos),
        function(a) {
            "use strict";
            var b = Observer.extend({
                RemoveBtnView: a.Resizable.RemoveBtnView,
                ResizeBtnView: a.Resizable.ResizeBtnView,
                BoxView: a.Resizable.BoxView,
                init: function(a) {
                    if (!a.wrapEl)
                        throw new Error("wrapper element should be provided");
                    this.options = a,
                        this.wrapEl = a.wrapEl,
                        this.el = this._createBoxElement(),
                        this.selectable = !0,
                        this.mode = "blur",
                        this._initView(),
                        this._bindExternalEvent()
                },
                "new": function(a) {
                    this.wrapEl.appendChild(this.el);
                    var b = this.el.getBoundingClientRect()
                        , c = this.wrapEl.getBoundingClientRect()
                        , d = c.width / a
                        , e = c.height / a;
                    this.boxView.set({
                        left: d / 2 - b.width / 2,
                        top: e / 2 - b.height / 2,
                        width: b.width,
                        height: b.height,
                        angle: 0
                    }),
                        this.boxView.changeScale(a),
                        this._setSelectMode()
                },
                add: function(a, b) {
                    this.wrapEl.appendChild(this.el),
                        this.boxView.set(b),
                        this.boxView.setCurrentScale(b.scale),
                        this.boxView.changeScale(a)
                },
                remove: function() {
                    this._remove()
                },
                toJson: function() {
                    return this.boxView.toJson()
                },
                enable: function() {
                    this.selectable = !0
                },
                disable: function() {
                    this._setBlurMode(),
                        this.selectable = !1
                },
                changeScale: function(a) {
                    this.boxView.changeScale(a)
                },
                isSelected: function(b) {
                    for (var c = a.event.getTarget(b); c && c.tagName && "html" !== c.tagName.toLowerCase(); ) {
                        if (c === this.el)
                            return !0;
                        c = c.parentNode
                    }
                    return !1
                },
                getMode: function() {
                    return this.mode
                },
                _createBoxElement: function() {
                    var a = document
                        , b = a.createElement("div");
                    return b.className = "resizable no_border no_handle",
                        b
                },
                _initView: function() {
                    this._initBoxView(),
                        this._initRemoveBtnView(),
                        this._initResizeBtnView()
                },
                _initBoxView: function() {
                    var a = this;
                    this.on("click:boxView", function() {
                        this.selectable && a._onClickBoxView()
                    }),
                        this.boxView = new this.BoxView(this.el,this,this.options)
                },
                _onClickBoxView: function() {
                    this._setSelectMode()
                },
                _setBlurMode: function() {
                    this._hideHandle(),
                        this._hideBorder(),
                        this._deleteMovable(),
                        this.options.eventBubbling = !0,
                        this.mode = "blur",
                        this.emit("change:mode", "blur")
                },
                _setSelectMode: function() {
                    this._showHandle(),
                        this._showBorder(),
                        this._setMovable(),
                        this.options.eventBubbling = !1,
                        this.mode = "select",
                        this.emit("change:mode", "select"),
                        this.emit("update:menu", this.toJson())
                },
                _bindExternalEvent: function() {
                    var a = this;
                    this.on("blur:box", function() {
                        a._setBlurMode()
                    })
                },
                _showHandle: function() {
                    this.el.classList.remove("no_handle")
                },
                _hideHandle: function() {
                    this.el.classList.add("no_handle")
                },
                _showBorder: function() {
                    this.el.classList.remove("no_border")
                },
                _hideBorder: function() {
                    this.el.classList.add("no_border")
                },
                _initRemoveBtnView: function() {
                    var a = this;
                    this.on("remove:box", function() {
                        a._remove()
                    }),
                        new this.RemoveBtnView(this.el,this,this.options)
                },
                _remove: function() {
                    this.wrapEl.removeChild(this.el)
                },
                _initResizeBtnView: function() {
                    var a = this;
                    this.on("move:resizeBtn", function(b) {
                        a._resize(b)
                    }),
                        ["lt", "rt", "lb", "rb"].forEach(function(b) {
                            new a.ResizeBtnView(a.el,a,a.options,b)
                        })
                },
                _resize: function(a) {
                    this.emit("resize:box", a)
                },
                _setMovable: function() {
                    this.el.classList.add("movable")
                },
                _deleteMovable: function() {
                    this.el.classList.remove("movable")
                }
            });
            a.Resizable = a.Resizable || {},
                a.Resizable.App = b
        }(window.photos = "undefined" == typeof window.photos ? {} : window.photos),
        function(a) {
            "use strict";
            a.ResizableTool = a.Draggable.extend({
                MAX_SIZE: 5,
                init: function(b, c, d) {
                    this.el = b,
                        this.callback = d,
                        this.boxes = [],
                        this.lastPosition = "",
                        this.initialX = 0,
                        this.initialY = 0,
                        this.options = c,
                        this.EVENT_NAME = a.EVENT_NAME,
                        this.offset = null ,
                        this.selectedBox = null ,
                        this.moved = !1,
                        this.wrapPos = this.el.getBoundingClientRect(),
                        this._setStartScale(),
                        this._bindEvent(),
                        this._bindWrapperEvent()
                },
                onmousedown: function(a) {
                    this._super(a),
                    this._isRotatable() && this.selectedBox.emit("rotate:box:start", {
                        x: this.offset.x - this.wrapPos.left,
                        y: this.offset.y - this.wrapPos.top,
                        dx: this.offset.dx,
                        dy: this.offset.dy
                    })
                },
                onmousemove: function(a) {
                    this._super(a),
                        this.moved = !0,
                    this._isRotatable() && this.selectedBox.emit("rotate:box", this.offset)
                },
                onmouseup: function(a) {
                    this._super(a)
                },
                _isRotatable: function() {
                    return this.selectedBox && "select" === this.selectedBox.getMode()
                },
                _setStartScale: function() {
                    var b = a.$$p(".preview_scale_wrapper")[0];
                    b ? (this.TRANSFORM_NAME = a.util.getPrefix(this.el, "transform"),
                        this.startScale = a.util.Transform.parse(b.style[this.TRANSFORM_NAME]).scaleX) : this.startScale = 1
                },
                add: function(a) {
                    var b = this;
                    if (a)
                        b.reset(),
                            a.forEach(function(a) {
                                b._addBox(a)
                            });
                    else {
                        if (this.boxes.length === this.MAX_SIZE)
                            return void alert("5개 까지 추가 가능합니다.");
                        b._addBox()
                    }
                },
                _addBox: function(b) {
                    var c = this
                        , d = new a.Resizable.App({
                        wrapEl: this.el
                    });
                    d.on("remove:box", function() {
                        c.remove(d)
                    }),
                        d.on("resize:box:end", function() {
                            c.moved = !0
                        }),
                        d.on("update:menu", function(a) {
                            c.updateMenu(a)
                        }),
                        b ? d.add(this.startScale, b) : (d["new"](this.startScale),
                            this._select(d)),
                        this.boxes.push(d)
                },
                remove: function(a) {
                    var b = this;
                    this.boxes.forEach(function(c) {
                        if (a === c) {
                            var d = b.boxes.indexOf(a);
                            d > -1 && b.boxes.splice(d, 1)
                        }
                    })
                },
                reset: function() {
                    0 < this.boxes.length && this.boxes.forEach(function(a) {
                        a.remove()
                    }),
                        this.boxes = [],
                        this.lastPosition = "",
                        this._setStartScale()
                },
                clear: function() {
                    this._unbindWrapperEvent(),
                        this.reset()
                },
                toJson: function() {
                    return this.boxes.map(function(a) {
                        return a ? a.toJson() : void 0
                    })
                },
                isEmpty: function() {
                    return 0 === this.boxes.length
                },
                enable: function() {
                    this.options.eventBubbling = !1,
                        this.boxes.forEach(function(a) {
                            a.enable()
                        })
                },
                disable: function() {
                    this.options.eventBubbling = !0,
                        this.boxes.forEach(function(a) {
                            a.disable()
                        })
                },
                changeScale: function(a) {
                    this.boxes.forEach(function(b) {
                        b.changeScale(a)
                    })
                },
                updateMenu: function(a) {
                    this.callback(a)
                },
                _bindWrapperEvent: function() {
                    this.__onWrapperOver = this._onWrapperOver.bind(this),
                        a.event.on(this.el, a.EVENT_NAME.MOVE, this.__onWrapperOver),
                        this.__onWrapperClick = this._onWrapperClick.bind(this),
                        a.event.on(this.el, "click", this.__onWrapperClick)
                },
                _unbindWrapperEvent: function() {
                    this.__onWrapperOver && (a.event.off(this.el, a.EVENT_NAME.MOVE, this.__onWrapperOver),
                        this.__onWrapperOver = null ),
                    this.__onWrapperClick && (a.event.off(this.el, "click", this.__onWrapperClick),
                        this.__onWrapperClick = null )
                },
                _onWrapperOver: function(a) {
                    if (this.selectedBox && "select" === this.selectedBox.getMode()) {
                        var b = a.touches && a.touches.length > 0 ? a.touches[0] : a;
                        TouchEvent && b instanceof TouchEvent && (b = b.changedTouches[0]);
                        var c = b.pageX || b.clientX
                            , d = b.pageY || b.clientY
                            , e = this.selectedBox.boxView.lastUpdatedInfo
                            , f = c - this.wrapPos.left
                            , g = d - this.wrapPos.top
                            , h = ""
                            , i = e.left
                            , j = i + e.width
                            , k = e.top
                            , l = k + e.height;
                        i > f && k > g ? h = "lt" : f > j && k > g ? h = "rt" : i > f && g > l ? h = "lb" : f > j && g > l ? h = "rb" : i > f ? h = "l" : f > j ? h = "r" : k > g ? h = "t" : g > l && (h = "b"),
                        h && this.lastPosition !== h && (this.lastPosition = h,
                            this._removeCustomCursor(),
                            this._applyCustomCursor(h))
                    } else
                        this._removeCustomCursor()
                },
                _applyCustomCursor: function(a) {
                    this.el.classList.add("custom_cursor_" + a)
                },
                _removeCustomCursor: function() {
                    var a = this;
                    ["lt", "rt", "lb", "rb", "l", "r", "t", "b"].forEach(function(b) {
                        a.el.classList.remove("custom_cursor_" + b)
                    })
                },
                _onWrapperClick: function(a) {
                    if (this.moved)
                        return void (this.moved = !1);
                    var b = this.boxes.filter(function(a) {
                        return a.isSelected()
                    });
                    this._select(b[0])
                },
                _select: function(a) {
                    this.lastPosition = "",
                        this.selectedBox = a,
                        this._blurOthers(this.selectedBox)
                },
                _blurOthers: function(a) {
                    this.boxes.forEach(function(b) {
                        b !== a && b.emit("blur:box")
                    })
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = a.util;
            a.SliderBar = a.SliderBar || {},
                a.SliderBar.App = Observer.extend({
                    init: function(a, c) {
                        if (!a)
                            throw new Error("element should be provided");
                        this.el = a,
                            this.initOptions = c,
                            this.options = this._parseAttrs(a),
                            this.PROPS_NAME = b.getPropsName(this.options.orientation),
                            this._bindEvent(),
                            this._initSliderView(),
                            this._updateView()
                    },
                    reset: function(a) {
                        this._extendOptions(a),
                            this.emit("reset:view", this.options)
                    },
                    resize: function() {
                        this._updateView()
                    },
                    setCurrent: function(a) {
                        b.isNumeric(a) || (a = this.options.start),
                            this.emit("reset:view", {
                                current: a
                            })
                    },
                    _setInputValue: function(a) {
                        this.emit("set:value", a),
                            this.inputEl.setAttribute("value", a)
                    },
                    _parseAttrs: function(b) {
                        this.inputEl = a.$$(".pp_slider_input", b)[0],
                            this.inputEl.style.display = "none";
                        var c = this._getOptionAttr("min", 0)
                            , d = this._getOptionAttr("max", 100)
                            , e = this._getOptionAttr("start", 0);
                        return {
                            min: c,
                            max: d,
                            range: d - c,
                            step: this._getOptionAttr("step", 1),
                            start: this._getOptionAttr("start", 0),
                            current: this._getOptionAttr("current", e),
                            snap: this._getOptionAttr("snap", 0),
                            type: this.inputEl.getAttribute("type") || "range",
                            mode: this.inputEl.getAttribute("mode") || "nosteps",
                            orientation: this.inputEl.getAttribute("orientation") || "horizontal"
                        }
                    },
                    _getOptionAttr: function(a, c) {
                        var d = this.initOptions && this.initOptions[a];
                        return b.isNumeric(d) || (d = this.inputEl.hasAttribute(a) ? this.inputEl.getAttribute(a) : c),
                            parseFloat(d)
                    },
                    _initSliderView: function() {
                        new a.SliderBar.SliderView(this.el,this,this.options)
                    },
                    _bindEvent: function() {
                        var a = this;
                        this.on("set:inputValue", function(b) {
                            a._setInputValue(b)
                        })
                    },
                    _updateView: function() {
                        this.emit("update:view")
                    },
                    _extendOptions: function(a) {
                        for (var b in a)
                            a.hasOwnProperty(b) && (this.options[b] = a[b]);
                        this.options.range = this.options.max - this.options.min
                    }
                })
        }(window.photos = "undefined" == typeof window.photos ? {} : window.photos),
        function(a) {
            "use strict";
            var b = a.util;
            a.SliderBar.SliderView = Class.extend({
                init: function(a, c, d) {
                    this.el = a,
                        this.queue = c,
                        this.options = d,
                        this.digit = this._calculateDigit(),
                        this.PROPS_NAME = b.getPropsName(d.orientation),
                        this._render(),
                        this._initView(),
                        this._bindEvent()
                },
                _render: function() {
                    this._append(),
                        this._composite()
                },
                _append: function() {
                    this.wrapEl && this.el.removeChild(this.wrapEl),
                        this.wrapEl = b.createEl("div", "pp_slider_wrap"),
                        this.el.appendChild(this.wrapEl),
                    "vertical" === this.options.orientation && (this.el.className += " vertical")
                },
                _composite: function() {
                    var a = b.getPrefix(this.wrapEl, "transform");
                    this.wrapEl.style[a] = "translateZ(0)"
                },
                _initView: function() {
                    this._initBarView(),
                        this._initBtnView(),
                        this._initLineView(),
                        this._initPointView(),
                        this.queue.emit("set:inputValue", this.options.current)
                },
                _initBtnView: function() {
                    var b = this;
                    this.btnView = new a.SliderBar.BtnView(this.wrapEl,this.queue,this.options),
                        this.btnView.on("start", function(a) {
                            b._removeEffect(),
                                b.queue.emit("start", b._calculate(a))
                        }),
                        this.btnView.on("move", function(a) {
                            var c = b._calculate(a);
                            b.queue.emit("set:inputValue", c),
                                b.queue.emit("move", c)
                        }),
                        this.btnView.on("end", function(a) {
                            b.queue.emit("end", b._calculate(a))
                        })
                },
                _initBarView: function() {
                    new a.SliderBar.BarView(this.wrapEl,this.queue,this.options)
                },
                _initLineView: function() {
                    this.lineView = new a.SliderBar.LineView(this.wrapEl,this.queue,this.options)
                },
                _initPointView: function() {
                    new a.SliderBar.PointView(this.wrapEl,this.queue,this.options)
                },
                _bindEvent: function() {
                    var b = this;
                    a.event.on(this.wrapEl, "mousedown", function(a) {
                        var c, d, e, f = a.touches && a.touches.length > 0 ? a.touches[0] : a, g = b.wrapEl.getBoundingClientRect();
                        "vertical" === b.options.orientation ? (c = f.pageY || f.clientY,
                            d = g[b.PROPS_NAME.POSITION],
                            e = window.pageYOffset) : (c = f.pageX || f.clientX,
                            d = g[b.PROPS_NAME.POSITION],
                            e = window.pageXOffset);
                        var h = c - (d + e)
                            , i = h / g[b.PROPS_NAME.SIZE] * 100
                            , j = b._calculate(i);
                        b._addEffect(),
                            b.queue.emit("reset:view", {
                                current: j
                            }),
                            b.queue.emit("end", j)
                    })
                },
                _calculate: function(a) {
                    var b = this.options.step
                        , c = this.options.range / 100
                        , d = a * c
                        , e = parseFloat((d / b).toFixed(0))
                        , f = parseFloat(this.options.min) + parseFloat((e * b).toFixed(this.digit))
                        , g = parseFloat(f.toFixed(this.digit));
                    return g < this.options.min ? this.options.min : g > this.options.max ? this.options.max : g
                },
                _calculateDigit: function() {
                    var a = 0;
                    return (this.options.step + "").split(".")[1] && (a = (this.options.step + "").split(".")[1].length),
                        a
                },
                _addEffect: function() {
                    this.btnView.el.classList.add("pp_slider_animate"),
                        this.lineView.el.classList.add("pp_slider_animate")
                },
                _removeEffect: function() {
                    this.btnView.el.classList.remove("pp_slider_animate"),
                        this.lineView.el.classList.remove("pp_slider_animate")
                }
            })
        }(window.photos = "undefined" == typeof window.photos ? {} : window.photos),
        function(a) {
            "use strict";
            var b = a.util
                , c = 100;
            a.SliderBar.BtnView = a.Draggable.extend({
                init: function(c, d, e) {
                    this.wrapEl = c,
                        this.queue = d,
                        this.options = e,
                        this.EVENT_NAME = a.EVENT_NAME,
                        this.PROPS_NAME = b.getPropsName(e.orientation),
                        this.initialX = 0,
                        this.initialY = 0,
                        this._render(),
                        this._initRate(),
                        this._bindEvent()
                },
                onmouseup: function(a) {
                    this._super(a),
                        this.lastRate = this.rate
                },
                onmousemove: function(a) {
                    this.offset = this._calOffset(a),
                        this._setStyle(),
                        this.emit("move", this.offset)
                },
                _calOffset: function(a) {
                    var d = this._super(a);
                    return this.rate = this.lastRate + b.num2rate(d[this.PROPS_NAME.DX], this.size),
                        this.rate = this.rate < 0 ? 0 : this.rate > c ? c : this.rate,
                    this.startRate - this.options.snap < this.rate && this.rate < this.startRate + this.options.snap && (this.rate = this.startRate),
                        this.rate
                },
                _render: function() {
                    this.valEl = b.createEl("div", "pp_slider_val"),
                        this.el = b.createEl("div", "pp_slider_btn"),
                        this.el.appendChild(this.valEl),
                        this.wrapEl.appendChild(this.el)
                },
                _initRate: function() {
                    var a = this.options
                        , c = b.num2rate(a.start - a.min, a.range)
                        , d = b.num2rate(a.current - a.min, a.range);
                    this.step = b.num2rate(a.step, a.range) || 1,
                        this.startRate = b.isNumeric(c) ? c : 0,
                        this.lastRate = b.isNumeric(d) ? d : c,
                        this.rate = b.isNumeric(d) ? d : c
                },
                _bindEvent: function() {
                    this._super();
                    var a = this;
                    this.queue.on("set:value", function(b) {
                        a._setValue(b)
                    }),
                        this.queue.on("update:view", function() {
                            a._update()
                        }),
                        this.queue.on("reset:view", function(b) {
                            a._reset(b),
                                a.queue.emit("set:inputValue", b.current)
                        })
                },
                _update: function() {
                    this._setSize(),
                        this._setStyle()
                },
                _setSize: function() {
                    var a = this;
                    this.queue.emit("get:size", function(b) {
                        a.size = b
                    })
                },
                _setStyle: function() {
                    var a = this._calculate(this.rate);
                    "vertical" === this.options.orientation ? this._setBtnLeftByNum(b.rate2num(a, this.size)) : this._setBtnLeftByRate(a),
                        this.queue.emit("update:style", a, this.startRate)
                },
                _calculate: function(a) {
                    var b = this.step
                        , d = a % b
                        , e = Math.floor(a / b);
                    return b / 2 > d ? e * b : c > e * b + b ? e * b + b : c
                },
                _setBtnLeftByRate: function(a) {
                    this.el.style[this.PROPS_NAME.POSITION] = a + "%"
                },
                _setBtnLeftByNum: function(a) {
                    this.el.style[this.PROPS_NAME.POSITION] = a + "px"
                },
                _reset: function(a) {
                    this._extendOptions(a),
                        this._initRate(),
                        this._update()
                },
                _setValue: function(a) {
                    this.valEl.innerHTML = a
                },
                _extendOptions: function(a) {
                    for (var b in a)
                        a.hasOwnProperty(b) && (this.options[b] = a[b]);
                    this.options.range = this.options.max - this.options.min
                }
            })
        }(window.photos = "undefined" == typeof window.photos ? {} : window.photos),
        function(a) {
            "use strict";
            var b = a.util;
            a.SliderBar.BarView = Class.extend({
                init: function(a, c, d) {
                    this.wrapEl = a,
                        this.queue = c,
                        this.options = d,
                        this.PROPS_NAME = b.getPropsName(d.orientation),
                        this._render(),
                        this._bindEvent()
                },
                _render: function() {
                    var a = b.createEl("div", "pp_slider_bg");
                    this.el = b.createEl("div", "pp_slider_bar"),
                        a.appendChild(this.el),
                        this.wrapEl.appendChild(a)
                },
                _bindEvent: function() {
                    var a = this;
                    this.queue.on("get:size", function(b) {
                        b(a._getSize())
                    })
                },
                _getSize: function() {
                    var a = this.el.getBoundingClientRect()[this.PROPS_NAME.SIZE];
                    return this.wrapEl.setAttribute("data-size", a),
                        a
                }
            })
        }(window.photos = "undefined" == typeof window.photos ? {} : window.photos),
        function(a) {
            "use strict";
            var b = a.util;
            a.SliderBar.LineView = Class.extend({
                init: function(a, c, d) {
                    this.wrapEl = a,
                        this.queue = c,
                        this.options = d,
                        this.PROPS_NAME = b.getPropsName(d.orientation),
                        this._render(),
                        this._bindEvent()
                },
                _render: function() {
                    var c = a.$$(".pp_slider_bg", this.wrapEl)[0];
                    this.el = b.createEl("div", "pp_slider_line"),
                        c.appendChild(this.el)
                },
                _bindEvent: function() {
                    var a = this;
                    this.queue.on("update:style", function(b, c) {
                        a._update(b, c)
                    })
                },
                _update: function(a, b) {
                    var c = this.PROPS_NAME.POSITION
                        , d = this.PROPS_NAME.SIZE;
                    b > a ? this.el.style.cssText = c + ":" + a + "%;" + d + ":" + (b - a) + "%;" : this.el.style.cssText = c + ":" + b + "%;" + d + ":" + (a - b) + "%;"
                }
            })
        }(window.photos = "undefined" == typeof window.photos ? {} : window.photos),
        function(a) {
            "use strict";
            var b = a.util;
            a.SliderBar.PointView = Class.extend({
                init: function(a, c, d) {
                    this.wrapEl = a,
                        this.queue = c,
                        this.options = d,
                        this.PROPS_NAME = b.getPropsName(d.orientation),
                        this._render(),
                        this._bindEvent()
                },
                _render: function() {
                    var c = a.$$(".pp_slider_bg", this.wrapEl)[0]
                        , d = document.createDocumentFragment();
                    if ("steps" === this.options.mode)
                        for (var e = this.options.range / this.options.step, f = 0; e >= f; f++)
                            d.appendChild(b.createEl("div", "pp_slider_point"));
                    else
                        d.appendChild(b.createEl("div", "pp_slider_point"));
                    c.appendChild(d),
                        this.els = a.$$(".pp_slider_point", c)
                },
                _bindEvent: function() {
                    var a = this;
                    this.queue.on("update:style", function(b, c) {
                        a._update(b, c)
                    })
                },
                _update: function(a, b) {
                    var c = ""
                        , d = this.PROPS_NAME.POSITION;
                    if ("steps" === this.options.mode)
                        for (var e = 100 / (this.els.length - 1), f = 0, g = this.els.length; g > f; f++)
                            c = d + ":" + e * f + "%;" + this._getPointOpacity(e * f, a, b),
                                this.els[f].style.cssText = c;
                    else
                        c = d + ":" + b + "%;",
                            this.els[0].style.cssText = c
                },
                _getPointOpacity: function(a, b, c) {
                    if (b >= c) {
                        if (c > a || a > b)
                            return "opacity:0.2;"
                    } else if (a > c || b > a)
                        return "opacity:0.2;"
                }
            })
        }(window.photos = "undefined" == typeof window.photos ? {} : window.photos),
        function(a) {
            "use strict";
            function b(a, c) {
                if (c -= 1,
                    0 > c)
                    return "";
                if ("object" != typeof a)
                    return a;
                var d = [];
                for (var e in a)
                    a.hasOwnProperty(e) && (a[e] instanceof Date ? d.push(e + ":Date(" + a[e].toString() + ")") : "object" == typeof a[e] ? d.push(e + ":{" + b(a[e], c) + "}") : "string" == typeof a[e] ? d.push(e + ':"' + a[e] + '"') : "number" == typeof a[e] && d.push(e + ":" + a[e]));
                return "{" + d.join(", ") + "}"
            }
            a.$ = Selector.$,
                a.$$ = Selector.$$,
                a.ua = daumtools.userAgent(),
                a.event = DOMEvent,
                a.Ajax = daumtools.Ajax,
                a.Slider = a.SliderBar.App,
                a.Scrollbar = SimpleScrollbar,
                a.modules = {},
                a.debugflag = !1,
                window.onerror = function(b, c, d) {
                    var e, f = window.event || {};
                    e = f.errorUrl ? f.errorMessage + "\n at " + f.errorUrl + ":" + f.errorLine + ":" + f.errorCharacter : b + "\n at " + c + ":" + d + ":1",
                        a.util.sendErrorLog("global_error", e)
                }
            ;
            var c, d, e;
            a.initTime = function(a) {
                console.log("=====  " + (a || "init time") + "  ====="),
                    c = (new Date).getTime(),
                    d = c
            }
                ,
                a.calcTime = function(a) {
                    e = d,
                        d = (new Date).getTime(),
                        console.log((a || "calc time") + " ::: total(" + (d - c) + "), this(" + (d - e) + ")")
                }
                ,
                a.addModule = function(b, c, d) {
                    var e = a.modules;
                    if (e[b] && !d)
                        throw a.util.sendErrorLog("module_error", 'module "' + b + '" already registered'),
                            new Error('module "' + b + '" already registered');
                    return "function" == typeof c ? e[b] = c : e[b] = Class.extend(c),
                        c.__moduleName__ = b,
                        c
                }
                ,
                a.Editor = Class.extend({
                    init: function(a, b, c) {
                        this.frameEl = a,
                            this.queue = b,
                            this.modules = {},
                            this.options = c || {},
                            this.loadResources(),
                            this.initModules(),
                            this.bindEvent()
                    },
                    loadResources: function() {
                        a.effect && "function" == typeof a.effect.loadLookupImage && a.effect.loadLookupImage()
                    },
                    initModules: function() {
                        var b = a.modules;
                        for (var c in b)
                            b.hasOwnProperty(c) && this.initModule(c, b[c])
                    },
                    initModule: function(b, c) {
                        if (c)
                            try {
                                this.modules[b] = new c(new f(b,this.queue),this.frameEl,this.options),
                                    a.log('initialize module : "' + b + '".')
                            } catch (d) {
                                throw a.util.sendErrorLog("module_error", 'failed to initialize module "' + b + '". caused by ' + d.message),
                                    new Error('failed to initialize module "' + b + '". caused by ' + d.message)
                            }
                        else
                            a.util.sendErrorLog("module_error", 'Not exsisted module : "' + b + '".'),
                                a.log('Not exsisted module : "' + b + '".')
                    },
                    bindEvent: function() {
                        var b = this;
                        a.event.on(window, "load", function() {
                            b.queue.emit("window:load")
                        })
                    },
                    change: function(a) {
                        return a = a || {},
                            this.queue.emit("editor:change", a),
                            this
                    },
                    clear: function() {
                        return this.queue.emit("editor:clear"),
                            this
                    },
                    show: function() {
                        var b = this;
                        return this.frameEl.classList.remove(a.HIDE_CLASS),
                            setTimeout(function() {
                                b.queue.emit("screen:set")
                            }, 10),
                            this
                    },
                    hide: function() {
                        return this.frameEl.classList.add(a.HIDE_CLASS),
                            this
                    }
                });
            var f = Class.extend({
                init: function(a, b) {
                    this.moduleName = a,
                        this.queue = b
                },
                on: function(b, c) {
                    var d = this.moduleName
                        , e = function() {
                            try {
                                c.apply(null , arguments)
                            } catch (e) {
                                var f = "event handler error. event: " + b + ', module: "' + d + '"' + (c && c.name ? ', callback: "' + c.name + '"' : "") + "caused by ";
                                if (!e || !e.stack)
                                    throw a.util.sendErrorLog("module_error", f + e.message),
                                        new Error(f + e.message);
                                a.util.sendErrorLog("module_error", f + e.stack),
                                    console.error(e.stack)
                            }
                        }
                        ;
                    e.__original__ = c,
                        this.queue.on(b, e),
                        a.log('module "' + d + '" observes "' + b + '" event')
                },
                emit: function(b) {
                    a.log('module "' + this.moduleName + '" will fire "' + b + '" event');
                    try {
                        this.queue.emit.apply(this.queue, arguments)
                    } catch (c) {
                        var d = 'failed on while "' + b + '" event, moduel : ' + this.moduleName + ", caused by : ";
                        d += c && c.stack ? c.stack : c.message,
                            a.util.sendErrorLog("module_error", d)
                    }
                },
                off: function(a, b) {
                    this.queue.off(a, b)
                }
            });
            a.log = function(c, d) {
                if (a.debugflag) {
                    if (d = d || 5,
                        "undefined" == typeof console)
                        return b(c, d);
                    console.log(b(c, d))
                }
            }
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = window
                , c = "pew.fotolab.kakao.com"
                , d = "dev"
                , e = b.location.href;
            a.tiara = a.tiara || {},
                a.tiara.OK = "ok",
                a.tiara.USE = "use",
                a.tiara.NOTUSE = "no",
                a.tiara.ORIGIN = "origin",
                a.tiara.sendLog = function(a, f, g) {
                    setTimeout(function() {
                        b._tiq && b._tiq.push(["__event", {
                            url: e,
                            referer: e,
                            svcdomain: c,
                            te1: d,
                            te2: a,
                            te3: f,
                            te4: g
                        }])
                    }, 10)
                }
                ,
                a.addModule("Tiara", {
                    init: function(a, b, c) {
                        this.sandbox = a,
                            d = c.serviceName || "dev";
                        var e = this;
                        this.sandbox.on("window:load", function(a) {
                            e._initOnload()
                        })
                    },
                    _initOnload: function() {
                        "undefined" == typeof b._tiq && (b._tiq = [],
                            this._appendTiaraScript())
                    },
                    _appendTiaraScript: function() {
                        var a = document
                            , c = a.createElement("script");
                        c.type = "text/javascript",
                            c.async = !0,
                            c.src = b.location.protocol + "//m2.daumcdn.net/tiara/js/td.min.js";
                        var d = a.getElementsByTagName("head")[0];
                        d.appendChild(c)
                    }
                })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            a.addModule("ShortCut", {
                init: function(a, b, c) {
                    this.sandbox = a,
                        this.options = c,
                    this.options.shortCut && (this.shortCutMap = {},
                        this._matchKeyAndMethod(),
                        this._bindEvent())
                },
                _matchKeyAndMethod: function() {
                    var a = {
                        cancel: this._onEscKeyDown
                    }
                        , b = this.options.shortCut;
                    for (var c in b)
                        b.hasOwnProperty(c) && (this.shortCutMap[b[c]] = a[c])
                },
                _bindEvent: function() {
                    var b = document
                        , c = this._onKeyDownEvent.bind(this);
                    this.sandbox.on(["app:open", "app:open:list"], function() {
                        a.event.on(b, "keydown", c)
                    }),
                        this.sandbox.on("app:close", function() {
                            a.event.off(b, "keydown", c)
                        })
                },
                _onKeyDownEvent: function(a) {
                    var b = a.keyCode;
                    this.shortCutMap[b] && this.shortCutMap[b].bind(this)()
                },
                _onEscKeyDown: function() {
                    this.sandbox.emit("shortcut:cancel")
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            a.addModule("Screen", {
                init: function(b, c, d) {
                    this.frame = c,
                        this.viewport = d.viewport && d.viewport.preview || "flexible",
                        this.fixedFrame = a.$$p(".container_main")[0];
                    var e = this;
                    b.on("screen:set", function() {
                        e.frame.classList.contains(a.HIDE_CLASS) || (e.setFrameInfo(),
                            b.emit("frame:init", e.frameWidth, e.frameHeight, e.fixedWidth))
                    }),
                        b.on("screen:resize", function() {
                            e.frame.classList.contains(a.HIDE_CLASS) || (e.setFrameInfo(),
                                b.emit("frame:resize", e.frameWidth, e.frameHeight, e.fixedWidth))
                        }),
                        this.timeID = null ,
                        a.event.on(window, "resize", function() {
                            window.clearTimeout(e.timeID),
                                e.timeID = window.setTimeout(function() {
                                    (e.frame.clientWidth !== e.frameWidth || e.frame.clientHeight !== e.frameHeight) && b.emit("screen:resize")
                                }, 150)
                        })
                },
                setFrameInfo: function() {
                    this.frameWidth = this.frame.clientWidth,
                        this.frameHeight = this.frame.clientHeight,
                        this.fixedWidth = this.fixedFrame.clientWidth
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = "sub_open"
                , c = "select_"
                , d = "detail_open"
                , e = "sub_select_";
            a.addModule("Menu", {
                init: function(b, c, d) {
                    this.frame = c,
                        this.sandbox = b,
                        this.prefix = d.prefix || "",
                        this.menuFrame = a.$$p(".tool_main")[0],
                        this.mainMenus = a.$$p(".menu_main .list_main_menu button"),
                        this.selectMenu = "",
                        this.bindMainMenu(),
                        this.bindSubMenu(),
                        this.bindDetailMenu()
                },
                bindMainMenu: function() {
                    var a = this;
                    this.sandbox.on("mainmenu", function(b) {
                        a._toggleMainManu(b.args[0])
                    }),
                        this.sandbox.on(["menu:list"], function() {
                            a.selectMenu = "",
                                a._deselectSub()
                        }),
                        this.sandbox.on("editor:change", function() {
                            a._deselectSub(),
                                a._deselectDetail("back"),
                                a._mainMenusDisabled(!0)
                        }),
                        this.sandbox.on("mainmenu:select", function(b) {
                            a._selectSub(b),
                                a.sandbox.emit("mainmenu:" + b, {
                                    args: [],
                                    eventName: "mainmenu:filter",
                                    id: "mainmenu:filter",
                                    idList: "mainmenu:filter"
                                })
                        }),
                        this.sandbox.on("mainmenu:close", function() {
                            a._deselectSub()
                        }),
                        this.sandbox.on("preview:onload", function() {
                            a._mainMenusDisabled(!1)
                        })
                },
                bindSubMenu: function() {
                    var a = this;
                    this.detailMenuType = "",
                        this.sandbox.on("submenu", function(b) {
                            var c = b.args[0]
                                , d = b.args.slice(1)
                                , e = b.target;
                            c && a._selectDetail(c, d, e)
                        })
                },
                bindDetailMenu: function() {
                    var a = this;
                    this.sandbox.on("detailmenu", function(b) {
                        var c = b.args[0];
                        c && a._deselectDetail(c)
                    })
                },
                _mainMenusDisabled: function(a) {
                    for (var b = this.mainMenus.length - 1; b >= 0; b--)
                        this.mainMenus[b].disabled = a
                },
                _toggleMainManu: function(a, b) {
                    a !== this.selectMenu ? (this.selectMenu = a,
                        this._selectSub(a)) : (this.selectMenu = "",
                        this._deselectSub())
                },
                _selectSub: function(a) {
                    this._deselectSub(),
                        this.menuFrame.classList.add(this.prefix + b),
                        this.menuFrame.classList.add(this.prefix + c + a)
                },
                _deselectSub: function() {
                    var a, d;
                    for (this.menuFrame.classList.remove(this.prefix + b),
                             a = this.menuFrame.classList.length - 1; a >= 0; a--)
                        d = this.menuFrame.classList[a],
                        0 === d.indexOf(this.prefix + c) && this.menuFrame.classList.remove(d)
                },
                _selectDetail: function(a, b, c) {
                    this.detailMenuType !== a && ("text:watermark:sticker".indexOf(a) < 0 && this.sandbox.emit("decoOverlay:hide"),
                        this._deselectDetail("back"),
                        this.detailMenuType = a,
                        this._addDetailSelectClass(a, !0),
                        this.sandbox.emit(this.detailMenuType + ":enter", b),
                        this.sandbox.emit("animation", a, c))
                },
                _deselectDetail: function(a) {
                    this._removeDetailSelectClass(),
                    "" !== this.detailMenuType && (this.sandbox.emit(this.detailMenuType + ":" + a),
                        this.detailMenuType = "")
                },
                _addDetailSelectClass: function(a) {
                    this.menuFrame.classList.add(this.prefix + d),
                        this.menuFrame.classList.add(this.prefix + e + a)
                },
                _removeDetailSelectClass: function() {
                    var a, b;
                    for (this.menuFrame.classList.remove(this.prefix + d),
                             a = this.menuFrame.classList.length - 1; a >= 0; a--)
                        b = this.menuFrame.classList[a],
                        0 === b.indexOf(this.prefix + e) && this.menuFrame.classList.remove(b)
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = a.util.getPrefix(document.body, "transitionDuration")
                , c = ["brightness", "contrast", "saturation", "warmth", "shapness", "blur", "vignette"]
                , d = 15
                , e = 200
                , f = 200;
            a.addModule("MenuAnimation", {
                init: function(b, g, h) {
                    this.frame = g,
                        this.sandbox = b,
                        this.prefix = h.prefix || "",
                        this.menu = a.$$p(".menu_item", this.frame)[0],
                        this.icon = a.$$p(".icon_animation", this.frame)[0];
                    var i = this;
                    this.sandbox.on("animation", function(b, g) {
                        if (!(c.indexOf(b) < 0)) {
                            var h = i.prefix + "ani_ico_" + b
                                , j = a.$$p(".sub_detail_" + b, i.frame)[0]
                                , k = a.$$(".pp_slider_btn", j)[0]
                                , l = a.$$p(".ico_photos", g)[0];
                            if (k) {
                                var m = a.util.getOffset(i.menu)
                                    , n = a.util.getOffset(l)
                                    , o = a.util.getOffset(k)
                                    , p = {
                                    left: n.left - m.left,
                                    top: n.top - m.top - 32
                                }
                                    , q = {
                                    left: o.left - m.left,
                                    top: o.top - m.top - 80
                                };
                                i.flow && i.flow.stop(),
                                    i.flow = (new a.util.Flow).then(function(a) {
                                        i.startAnimationIcon(p, k, h),
                                            a(null )
                                    }).delay(d).then(function(a) {
                                        i.moveY(p, q),
                                            a(null )
                                    }).delay(f).then(function(a) {
                                        i.moveX(q),
                                            a(null )
                                    }).delay(e).end(function(a) {
                                        i.endAnimationIcon(k, h)
                                    })
                            }
                        }
                    })
                },
                startAnimationIcon: function(c, d, e) {
                    this.icon.style[b] = 0,
                        this.icon.style.top = c.top + "px",
                        this.icon.style.left = c.left + "px",
                        this.icon.classList.add(e),
                        this.icon.classList.remove(a.HIDE_CLASS),
                        d.classList.add(a.HIDE_CLASS)
                },
                moveY: function(a, c) {
                    this.icon.style[b] = f + "ms",
                        this.icon.style.top = c.top + "px"
                },
                moveX: function(a) {
                    this.icon.style[b] = e + "ms",
                        this.icon.style.left = a.left + "px"
                },
                endAnimationIcon: function(c, d) {
                    this.icon.style[b] = 0,
                        this.icon.classList.add(a.HIDE_CLASS),
                        this.icon.classList.remove(d),
                        c.classList.remove(a.HIDE_CLASS),
                        this.icon.style.top = 0,
                        this.icon.style.left = 0
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = ["filter", "edit", "effect", "deco"]
                , c = {
                edit: null ,
                effect: null ,
                deco: null
            }
                , d = ["crop", "size"]
                , e = ["auto", "brightness", "contrast", "saturation", "warmth", "focus", "vignette"]
                , f = ["text", "watermark"]
                , g = "btn_"
                , h = "list_"
                , i = "menu_btn_";
            a.addModule("MenuOption", {
                init: function(g, h, i) {
                    this.sandbox = g,
                        this.prefix = i.prefix,
                        this.option = i.menu || {},
                        this.option.main = this.option.main || b,
                        this.option.sub = this.option.sub || c,
                        this.option.sub.edit = this.option.sub.edit || d,
                        this.option.sub.effect = this.option.sub.effect || e,
                        this.option.sub.deco = this.option.sub.deco || f,
                        this.mainMenuPanel = a.$$p(".list_main_menu")[0],
                        this.mainMenus = a.$$p("li", this.mainMenuPanel),
                        this.subWrap = a.$$p(".wrap_menu_sub")[0],
                        this.initOption()
                },
                initOption: function() {
                    var b, c, d, e;
                    this.hideMenus(this.mainMenus),
                        this.arrangeMenu(this.mainMenuPanel, this.mainMenus, this.option.main, g);
                    for (b in this.option.sub)
                        c = this.option.sub[b],
                            d = a.$$p("." + h + b)[0],
                            e = a.$$p("li", d),
                            this.hideMenus(e),
                            this.arrangeMenu(d, e, c, i)
                },
                hideMenus: function(b) {
                    var c;
                    for (c = b.length - 1; c >= 0; c--)
                        b[c].classList.add(a.HIDE_CLASS)
                },
                arrangeMenu: function(b, c, d, e) {
                    var f, g, h;
                    for (f = 0,
                             g = d.length; g > f; f++)
                        h = this.findMenu(c, e + d[f]),
                        h && (h.classList.remove(a.HIDE_CLASS),
                            b.appendChild(h))
                },
                findMenu: function(b, c) {
                    var d, e;
                    for (d = b.length - 1; d >= 0; d--)
                        if (e = b[d],
                            a.$$p("." + c, e).length > 0)
                            return e;
                    return null
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = ":";
            a.addModule("ClickManager", {
                init: function(b, c, d) {
                    this.sandbox = b,
                        this.frame = c;
                    var e = this;
                    a.event.on(this.frame, "click", function(a) {
                        e.checkClickedNode(a)
                    })
                },
                checkClickedNode: function(b) {
                    var c = this.getClickedNode(a.event.getTarget(b));
                    c.id && this.sendEvent(c)
                },
                getClickedNode: function(a) {
                    for (var b = null ; this.isValidTarget(a); ) {
                        if (b = a.getAttribute("data-click"))
                            return {
                                id: b,
                                target: a,
                                idList: b
                            };
                        a = a.parentNode
                    }
                    return {
                        id: null ,
                        target: null ,
                        idList: null
                    }
                },
                isValidTarget: function(a) {
                    return a && !a.disabled && a !== this.frame.parentNode && a.tagName && "html" !== a.tagName.toLowerCase()
                },
                copyObj: function(a) {
                    var b = {};
                    for (var c in a)
                        a.hasOwnProperty(c) && (b[c] = a[c]);
                    return b
                },
                sendEvent: function(a) {
                    for (var c = a.id.split(b), d = 0, e = c.length; e > d; d += 1) {
                        var f = this.copyObj(a);
                        f.eventName = this.buildEvent(c, d + 1),
                            f.args = c.slice(d + 1),
                            this.sandbox.emit(f.eventName, f)
                    }
                },
                buildEvent: function(a, c) {
                    return a.slice(0, c).join(b)
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = 20
                , c = 10
                , d = "original";
            a.addModule("ImageManager", {
                init: function(d, e, f) {
                    this.sandbox = d,
                        this.host = a.util.getAPIHost(f.originType),
                        this.dataURI = null ,
                        this.currentMetaData = null ,
                    a.util.isIE10() && (b = c),
                        this.bindSandboxEvent(),
                        this.bindCacheEvent()
                },
                bindSandboxEvent: function() {
                    var a = this;
                    this.sandbox.on("editor:change", function(b) {
                        a.clearSession(),
                            a.initData(b)
                    }),
                        this.sandbox.on("imageManager:currentWithHistory", function(b) {
                            "function" == typeof b && a.sandbox.emit("history:current", function(c) {
                                b(c, a.dataURI, a.currentMetaData.sessionKey)
                            })
                        }),
                        this.sandbox.on("imageManager:session", function(b) {
                            a.currentMetaData.sessionKey = b
                        }),
                        this.sandbox.on("imageManager:setOriginal", function() {
                            a.setOriginal()
                        }),
                        this.sandbox.on("editor:clear", function() {
                            a.clearSession(),
                                a.initCache()
                        })
                },
                bindCacheEvent: function() {
                    var a = this;
                    this.sandbox.on("cache:init", function() {
                        a.initCache()
                    }),
                        this.sandbox.on("imageManager:add", function(b, c, d) {
                            a.dataURI = a.imageDataToDataURI(b, c),
                                a.addCache(a.currentMetaData.history.filter || "", a.dataURI, d)
                        }),
                        this.sandbox.on("imageManager:get", function(b, c) {
                            a.getCache(b, c)
                        }),
                        this.sandbox.on("imageManager:addBlur", function(b, c) {
                            a.cacheBlurURI.addItem({
                                key: b || d,
                                value: c
                            })
                        }),
                        this.sandbox.on("imageManager:getBlur", function(b, c) {
                            "function" == typeof c && c(a.cacheBlurURI.getValue(b || d))
                        }),
                        this.sandbox.on("imageManager:addSharp", function(b, c) {
                            a.cacheSharpURI.addItem({
                                key: b || d,
                                value: c
                            })
                        }),
                        this.sandbox.on("imageManager:getSharp", function(b, c) {
                            "function" == typeof c && c(a.cacheSharpURI.getValue(b || d))
                        })
                },
                imageDataToDataURI: function(a, b) {
                    var c = document.createElement("canvas");
                    return c.width = b.w,
                        c.height = b.h,
                        c.getContext("2d").drawImage(a, 0, 0, c.width, c.height),
                        c.toDataURL()
                },
                initData: function(a) {
                    this.currentMetaData = a,
                        this.initCache(),
                        this.sandbox.emit("history:init", this.currentMetaData),
                        this.sandbox.emit("filter:start", a)
                },
                setOriginal: function() {
                    var b = this
                        , c = a.filter.getFilterUrl(this.host, null , this.currentMetaData.sessionKey)
                        , d = this.currentMetaData.url;
                    this.sandbox.emit("filterRequest:get", c, function(c, e, f) {
                        c || a.util.isCurrentImageId(d) && (b.sandbox.emit("preview:reset", e, b.currentMetaData),
                            b.sandbox.emit("progressbar:hide"))
                    }, "origin", d)
                },
                loadImage: function(a, b) {
                    var c = new Image;
                    c.onload = function() {
                        b(null , c, [c.naturalWidth, c.naturalHeight]),
                            c.onload = null ,
                            c.onerror = null
                    }
                        ,
                        c.onerror = function(a) {
                            b(a),
                                c.onload = null ,
                                c.onerror = null
                        }
                        ,
                        c.src = a
                },
                initCache: function() {
                    this.cacheFilterURI && (this.cacheFilterURI.destroy(),
                        this.cacheFilterURI = null ),
                        this.cacheFilterURI = new a.util.StackCache(b),
                    this.cacheBlurURI && (this.cacheBlurURI.destroy(),
                        this.cacheBlurURI = null ),
                        this.cacheBlurURI = new a.util.StackCache(b),
                    this.cacheSharpURI && (this.cacheSharpURI.destroy(),
                        this.cacheSharpURI = null ),
                        this.cacheSharpURI = new a.util.StackCache(b)
                },
                addCache: function(a, b, c) {
                    var e = this;
                    if ((!a || this.cacheFilterURI.isEmpty()) && (a = d),
                            c = c || function() {}
                            ,
                        "string" == typeof b)
                        this.loadImage(b, function(b, d) {
                            if (b)
                                c(b);
                            else {
                                var f = e.imageToCanvas(d);
                                e.cacheFilterURI.addItem({
                                    key: a,
                                    value: f
                                }),
                                    c(null , f)
                            }
                        });
                    else if ("object" == typeof b && ("IMG" === b.tagName || "CANVAS" === b.tagName)) {
                        var f = this.imageToCanvas(b);
                        this.cacheFilterURI.addItem({
                            key: a,
                            value: f
                        }),
                            c(null , f)
                    }
                },
                getCache: function(a, b) {
                    if ("function" == typeof b) {
                        a = a || d;
                        var c = this.cacheFilterURI.getValue(a);
                        c ? b(this.capyCanvas(c)) : this.requestFilteredImage(a, b)
                    }
                },
                capyCanvas: function(a) {
                    var b = document.createElement("canvas");
                    b.width = a.width,
                        b.height = a.height;
                    var c = b.getContext("2d");
                    return c.drawImage(a, 0, 0, b.width, b.height),
                        b
                },
                imageToCanvas: function(a, b) {
                    var c = document.createElement("canvas");
                    c.width = a.naturalWidth || a.width,
                        c.height = a.naturalHeight || a.height;
                    var d = c.getContext("2d");
                    return d.drawImage(a, 0, 0, c.width, c.height),
                        c
                },
                requestFilteredImage: function(b, c) {
                    var e = this
                        , f = b === d ? "" : b;
                    this.sandbox.emit("filter:session", function(d) {
                        if (d) {
                            var g = e.currentMetaData.url;
                            e.sandbox.emit("filterRequest:get", a.filter.getFilterUrl(e.host, f, d), function(d, f, h) {
                                d || e.addCache(b, f, function(b, d) {
                                    a.util.isCurrentImageId(g) && c(e.capyCanvas(d))
                                })
                            }, "filter", g)
                        }
                    })
                },
                clearSession: function() {
                    if (this.currentMetaData && this.currentMetaData.sessionKey) {
                        var a = this
                            , b = this.currentMetaData.sessionKey;
                        a.sessionEndTid = setTimeout(function() {
                            a.sandbox.emit("imageManager:clear:session", b)
                        }, 3e4)
                    }
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = a.util.getPrefix(document.body, "transform-origin")
                , c = a.util.getPrefix(document.body, "transform")
                , d = 2
                , e = 20
                , f = 80
                , g = 2e3
                , h = "preview_transparent";
            a.addModule("Preview", {
                init: function(b, c, d) {
                    if (this.sandbox = b,
                            this.frame = c,
                            this.prefix = d.prefix,
                            this.noAnimation = d.noAnimation || !1,
                            this.viewport = d.viewport && d.viewport.preview || "flexible",
                        "fixed-width" === this.viewport) {
                        var e = a.$$p(".container_main")[0];
                        this.frame.classList.add(this.prefix + "fixed_width"),
                            this.frame = e
                    }
                    this.canvas = a.$$p(".preview_canvas")[0],
                        this.fakeCanvas = a.$$p(".preview_canvas_fake")[0],
                        this.previewWrap = a.$$p(".preview_wrapper")[0],
                        this.previewScaleWrap = a.$$p(".preview_scale_wrapper")[0],
                        this.previewNoscaleWrap = a.$$p(".preview_noscale_wrapper")[0],
                        this.frameWidth = 0,
                        this.frameHeight = 0,
                        this.alignEnable = !0,
                        this.scaleFixed = !1,
                        this.bindSandboxEvent(b)
                },
                bindSandboxEvent: function(a) {
                    var b = this;
                    a.on("preview:reset", function(c) {
                        b.optimizeCanvasSize(c),
                            a.emit("imageManager:add", c, b.orgCanvasSize, function() {
                                a.emit("preview:onload", b.orgCanvasSize),
                                    b.align()
                            })
                    }),
                        a.on("change:preview:scale", function(a, c) {
                            c = c || {};
                            var d, e;
                            "object" == typeof a ? (d = a.scaleX,
                                e = a.scaleY) : (d = a,
                                e = a),
                                c.animation ? b.transform(d, e) : b.zoom(d, e)
                        }),
                        a.on("frame:init", function(a, c, d) {
                            "fixed-width" === b.viewport ? b._setFrameSize(d, c) : b._setFrameSize(a, c)
                        }),
                        a.on("frame:resize", function(a, c, d) {
                            "fixed-width" === b.viewport ? b._setFrameSize(d, c) : b._setFrameSize(a, c),
                                b.align()
                        }),
                        a.on("preview:resize", function() {
                            b.syncWrapperSize(),
                                b.syncfakeCanvasSize(),
                                b.align()
                        }),
                        a.on("preview:setTransformOrigin", this.setTransformOrigin.bind(this)),
                        a.on("mode:change", function(a) {
                            a = a || {},
                            a.hasOwnProperty("scaleFix") && (b.scaleFixed = a.scaleFix),
                            a.hasOwnProperty("previewAlign") && (b.alignEnable = a.previewAlign,
                            b.alignEnable && (a.customPadding && 2 === a.customPadding.length ? b.align(a.customPadding[0], a.customPadding[1]) : b.align()))
                        }),
                        a.on(["editor:change", "editor:clear"], function() {
                            b._clear()
                        })
                },
                isDataURI: function(a) {
                    return /^data:image\/(jpe?g|png|gif|bmp);base64,/.test(a)
                },
                setTransparentBg: function(a) {
                    this.previewWrap.classList[a && this.isTransparentImage(a) ? "add" : "remove"](this.prefix + h)
                },
                isTransparentImage: function(a) {
                    var b, c, d, e, f, g;
                    for (e = document.createElement("canvas"),
                             e.width = a.width,
                             e.height = a.height,
                             f = e.getContext("2d"),
                             f.drawImage(a, 0, 0),
                             g = f.getImageData(0, 0, e.width, e.height).data,
                             b = 3,
                             c = g.length; c > b; b += 4)
                        if (d = g[b],
                            255 !== d)
                            return !0;
                    return !1
                },
                optimizeCanvasSize: function(a) {
                    if (a) {
                        this.orgCanvasSize = this.getCanvasSize(a.width, a.height);
                        var b = this.orgCanvasSize.w
                            , c = this.orgCanvasSize.h;
                        this.canvas.width = b,
                            this.canvas.height = c,
                            this.syncWrapperSize(),
                            this.syncfakeCanvasSize(),
                            this.setFakeCanvas(a, b, c),
                            this.center()
                    }
                },
                getCanvasSize: function(a, b) {
                    var c = g
                        , d = g;
                    if (a > c || b > d) {
                        var e = Math.min(c / a, d / b);
                        a *= e,
                            b *= e
                    }
                    return {
                        w: a,
                        h: b
                    }
                },
                setFakeCanvas: function(a) {
                    this.fakeCanvas.getContext("2d").drawImage(a, 0, 0, this.fakeCanvas.width, this.fakeCanvas.height),
                        this.fakeCanvas.style.position = "absolute",
                        this.fakeCanvas.style.left = "0px",
                        this.fakeCanvas.style.top = "0px"
                },
                align: function(a, b) {
                    if (this.alignEnable && this.orgCanvasSize) {
                        var c = -1;
                        if (!this.scaleFixed) {
                            var d = this.getScaleInfo(this.canvas.width, this.canvas.height, a, b);
                            this.previewScaleWrap.setAttribute("data-editing-scale", d.edtScale),
                                this.previewScaleWrap.setAttribute("data-optimize-scale", d.optScale),
                                this.previewScaleWrap.setAttribute("data-max-scale", d.maxScale),
                                c = d.optScale
                        }
                        this.noAnimation ? this.transform(c, c, !1) : this.transform(c, c)
                    }
                },
                getScale: function(a, b) {
                    var c = a / this.canvas.width
                        , d = b / this.canvas.height;
                    return Math.min(c, d)
                },
                getScaleInfo: function(a, b, c, d) {
                    var g = this.frameWidth - (c || 0)
                        , h = this.frameHeight - f - (d || 0);
                    "fixed-width" !== this.viewport && (g -= e,
                        h -= e);
                    var i = Math.min(g / a, h / b, g / b, h / a)
                        , j = Math.min(g / a, h / b)
                        , k = 1
                        , l = a
                        , m = b;
                    return (a > g || b > h) && (l = a * i,
                        m = b * i),
                    j > 1 && (k = j,
                        j = 1),
                    {
                        edtScale: this.getScale(l, m),
                        optScale: this.getScale(a * j, b * j),
                        maxScale: this.getScale(a * k, b * k)
                    }
                },
                transform: function(b, c, d) {
                    var e = this;
                    d === !1 ? (this.center(),
                    b > 0 && c > 0 && this.zoom(b, c),
                        this.sandbox.emit("preview:animate:end")) : (new a.util.Flow).then(function(a) {
                        e.center(),
                            e.sandbox.emit("preview:animate:start"),
                            a(null )
                    }).delay().then(function(a) {
                        e.previewWrap.classList.add(e.prefix + "animate"),
                            a(null )
                    }).delay().then(function(a) {
                        b > 0 && c > 0 && e.zoom(b, c),
                            a(null )
                    }).delay(500).end(function() {
                        e.previewWrap.classList.remove(e.prefix + "animate"),
                            e.sandbox.emit("preview:animate:end")
                    })
                },
                center: function() {
                    if (this.canvas) {
                        var b = Math.round((this.frame.offsetWidth - this.canvas.width) / 2)
                            , d = Math.round((this.frame.offsetHeight - this.canvas.height - f) / 2)
                            , e = a.util.Transform.parse(this.previewWrap.style[c]);
                        e.translateX = b,
                            e.translateY = d,
                            this.previewWrap.style[c] = a.util.Transform.stringify(e)
                    }
                },
                zoom: function(b, d) {
                    var e = a.util.Transform.parse(this.previewScaleWrap.style[c]);
                    e.scaleX = b,
                        e.scaleY = d,
                        this.previewScaleWrap.style[c] = a.util.Transform.stringify(e),
                        this.syncNoscaleWrapper(),
                        this.sandbox.emit("preview:scale:changed", b, d)
                },
                _clear: function() {
                    this.canvas.width = "0px",
                        this.canvas.height = "0px",
                        this.setTransparentBg(),
                        this.syncWrapperSize(),
                        this.syncfakeCanvasSize(),
                        this.zoom(.8, .8),
                        this.center(),
                        this.orgCanvasSize = null
                },
                _setFrameSize: function(a, b) {
                    this.frameWidth = a,
                        this.frameHeight = b
                },
                syncWrapperSize: function() {
                    var a = this.canvas.width
                        , b = this.canvas.height;
                    this.previewWrap.style.width = a + "px",
                        this.previewWrap.style.height = b + "px",
                        this.previewScaleWrap.style.width = a + "px",
                        this.previewScaleWrap.style.height = b + "px",
                        this.syncNoscaleWrapper()
                },
                syncNoscaleWrapper: function() {
                    this.syncNoscaleWrapperSize(),
                        this.syncNoscaleWrapperPosition()
                },
                syncNoscaleWrapperSize: function() {
                    var b = this.canvas.width
                        , d = this.canvas.height
                        , e = a.util.Transform.parse(this.previewScaleWrap.style[c])
                        , f = b * (e.scaleX || 1)
                        , g = d * (e.scaleY || 1);
                    this.previewNoscaleWrap.style.width = f + "px",
                        this.previewNoscaleWrap.style.height = g + "px"
                },
                syncNoscaleWrapperPosition: function() {
                    var d = this.canvas.width
                        , e = this.canvas.height
                        , f = a.util.Transform.parse(this.previewScaleWrap.style[c])
                        , g = a.util.Transform.parse(this.previewNoscaleWrap.style[c])
                        , h = (this.previewWrap.style[b] || "").split(" ")
                        , i = parseFloat(h[0] || d / 2)
                        , j = parseFloat(h[1] || e / 2);
                    g.translateX = i * (1 - f.scaleX),
                        g.translateY = j * (1 - f.scaleY),
                        this.previewNoscaleWrap.style[c] = a.util.Transform.stringify(g)
                },
                syncfakeCanvasSize: function() {
                    var a = this.canvas.width
                        , b = this.canvas.height;
                    this.fakeCanvas.width = Math.ceil(a / d),
                        this.fakeCanvas.height = Math.ceil(b / d),
                        this.fakeCanvas.style[c] = "translate(" + (this.canvas.width - this.fakeCanvas.width) / 2 + "px," + (this.canvas.height - this.fakeCanvas.height) / 2 + "px) scale(" + d + ")"
                },
                setTransformOrigin: function(a, b) {
                    b ? this._animationTransformOrigin(a, b) : this._setTransformOrigin(a)
                },
                _animationTransformOrigin: function(c, d) {
                    var e = this;
                    this.originAni && (this.originAni.abort = function() {
                            return !0
                        }
                    );
                    var f = this.previewWrap.style[b].split("px")
                        , g = parseFloat(f[0])
                        , h = parseFloat(f[1])
                        , i = c.split("px")
                        , j = parseFloat(i[0])
                        , k = parseFloat(i[1])
                        , l = j - g
                        , m = k - h;
                    this.originAni = {
                        duration: d.duration,
                        easing: a.util.animation[d.easing],
                        endValue: 1,
                        onChange: function(a) {
                            var b = g + l * a + "px " + (h + m * a) + "px 0";
                            e._setTransformOrigin(b)
                        },
                        onComplete: function() {
                            e._setTransformOrigin(c)
                        }
                    },
                        a.util.animation.animate(this.originAni)
                },
                _setTransformOrigin: function(a) {
                    this.previewWrap.style[b] = a,
                        this.previewScaleWrap.style[b] = a,
                        this.syncNoscaleWrapperPosition()
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = a.util.getPrefix(document.body, "transform")
                , c = a.util.getPrefix(document.body, "transition")
                , d = 200
                , e = 20
                , f = 80;
            a.addModule("PreviewDraggable", {
                init: function(b, c, d) {
                    this.frame = c,
                        this.viewport = d.viewport && d.viewport.preview || "flexible",
                    d.modules && d.modules.preview_draggable === !1 || (this.previewWrap = a.$$p(".preview_wrapper")[0],
                        this.scaleWrap = a.$$p(".preview_scale_wrapper")[0],
                        this.draggableArea = {
                            MAX_TOP: 0,
                            MAX_LEFT: 0,
                            MIN_BOTTOM: 0,
                            MIN_RIGHT: 0
                        },
                        this.dragEnable = !0,
                        this.bindEvent(b))
                },
                bindEvent: function(a) {
                    var b = this;
                    a.on("preview:onload", function() {
                        b.initDraggablePreview()
                    }),
                        a.on(["frame:init", "frame:resize"], function(a, c, d) {
                            "fixed-width" === b.viewport ? b.frameWidth = d : b.frameWidth = a,
                                b.frameHeight = c - f
                        }),
                        a.on("mode:change", function(a) {
                            a.hasOwnProperty("previewDraggable") && (b.dragEnable = a.previewDraggable)
                        })
                },
                initDraggablePreview: function() {
                    if (!this.draggablePreview) {
                        var b = this;
                        this.draggablePreview = new a.Draggable({
                            el: b.previewWrap,
                            eventBubbling: !0
                        }),
                            this.draggablePreview.on("start", function() {
                                b.startDrag()
                            }),
                            this.draggablePreview.on("move", function(a) {
                                b.moveDrag(a)
                            }),
                            this.draggablePreview.on("end", function(a) {
                                b.endDrag(a)
                            })
                    }
                },
                startDrag: function() {
                    if (this.dragEnable) {
                        this.currentPos = a.util.Transform.parse(this.previewWrap.style[b]),
                            this.startX = this.currentPos.translateX,
                            this.startY = this.currentPos.translateY;
                        var c = a.util.Transform.parse(this.scaleWrap.style[b]);
                        this.previewWidth = parseInt(this.previewWrap.style.width),
                            this.previewHeight = parseInt(this.previewWrap.style.height),
                            this.initDraggableArea(this.previewWidth, this.previewHeight, c.scaleX, c.scaleY)
                    }
                },
                moveDrag: function(c) {
                    if (this.dragEnable) {
                        var d = this.startX + c.dx
                            , e = d + this.previewWidth
                            , f = this.startY + c.dy
                            , g = f + this.previewHeight
                            , h = this.getPosition(d, e, f, g, !0);
                        this.currentPos.translateX = h.left,
                            this.currentPos.translateY = h.top,
                            this.previewWrap.style[b] = a.util.Transform.stringify(this.currentPos)
                    }
                },
                endDrag: function(b) {
                    if (this.dragEnable) {
                        var c = this.startX + b.dx
                            , e = c + this.previewWidth
                            , f = this.startY + b.dy
                            , g = f + this.previewHeight
                            , h = this.getPosition(c, e, f, g);
                        if (f !== h.top || c !== h.left) {
                            this.currentPos.translateX = h.left,
                                this.currentPos.translateY = h.top;
                            var i = this;
                            this.flow && this.flow.stop(),
                                this.flow = (new a.util.Flow).then(function(a) {
                                    i.startAnimation(i.currentPos),
                                        a(null )
                                }).delay(d).end(function(a) {
                                    i.endAnimation()
                                })
                        }
                    }
                },
                initDraggableArea: function(a, b, c, d) {
                    var f = a * c
                        , g = b * d
                        , h = this.frameHeight / 2
                        , i = this.frameWidth / 2
                        , j = a
                        , k = b;
                    f > this.frameWidth && (j = this.frameWidth + (a - f) - e),
                    g > this.frameHeight && (k = this.frameHeight + (b - g) - e),
                        this.draggableArea.MAX_TOP = h - k / 2,
                        this.draggableArea.MIN_BOTTOM = h + k / 2,
                        this.draggableArea.MAX_LEFT = i - j / 2,
                        this.draggableArea.MIN_RIGHT = i + j / 2
                },
                getPosition: function(b, c, d, e, f) {
                    var g = 0
                        , h = 0
                        , i = 1;
                    return d > this.draggableArea.MAX_TOP ? g = d - this.draggableArea.MAX_TOP : e < this.draggableArea.MIN_BOTTOM && (g = this.draggableArea.MIN_BOTTOM - e,
                        i = -1),
                    0 !== g && (f && (h = a.util.rubberBandValue(g, 600)),
                        d += i * (h - g)),
                        g = 0,
                        h = 0,
                        i = 1,
                        b > this.draggableArea.MAX_LEFT ? g = b - this.draggableArea.MAX_LEFT : c < this.draggableArea.MIN_RIGHT && (g = this.draggableArea.MIN_RIGHT - c,
                            i = -1),
                    0 !== g && (f && (h = a.util.rubberBandValue(g, 600)),
                        b += i * (h - g)),
                    {
                        left: b,
                        top: d
                    }
                },
                startAnimation: function(e) {
                    this.previewWrap.style[c] = b + " " + d + "ms ease-out",
                        this.previewWrap.style[b] = a.util.Transform.stringify(e)
                },
                endAnimation: function() {
                    this.previewWrap.style[c] = ""
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = 72;
            a.addModule("Paint", {
                init: function(a, b, c) {
                    this.frame = b,
                        this.sandbox = a,
                        this.currentFilter = "unknown",
                        this.selectCanvasElement(),
                        this.bindEvent()
                },
                selectCanvasElement: function() {
                    this.canvas = a.$$p(".preview_canvas")[0],
                        this.originCanvas = a.$$p(".preview_canvas_origin")[0],
                        this.fakeCanvas = a.$$p(".preview_canvas_fake")[0],
                        this.tcanvas = this._createCanvas(this.canvas.width, this.canvas.height),
                        this.tfakeCanvas = this._createCanvas(this.fakeCanvas.width, this.fakeCanvas.height),
                        this.blurCanvas = this._createCanvas(this.canvas.width, this.canvas.height)
                },
                _createCanvas: function(a, b) {
                    var c = document.createElement("canvas");
                    return c.width = a,
                        c.height = b,
                        c
                },
                bindEvent: function() {
                    var b = this;
                    this.sandbox.on("paint:showFake", function(a) {
                        b.showFakeCanvas(),
                            b.sandbox.emit("paint:fakeCanvas", a)
                    }),
                        this.sandbox.on("paint:fakeCanvas", function(a) {
                            b.paint(a, b.fakeCanvas, b.tfakeCanvas)
                        }),
                        this.sandbox.on("paint:preview", function(a) {
                            b.hideFakeCanvas(),
                                b.paint(a, b.canvas, b.tcanvas)
                        }),
                        this.sandbox.on("paint:origin", function(a) {
                            b.sandbox.emit("history:current", function(a) {
                                var c = {};
                                if (a)
                                    for (var d in a)
                                        a.hasOwnProperty(d) && ("crop" === d || "resize" === d) && (c[d] = a[d]);
                                b.sandbox.emit("imageManager:get", "original", function(a) {
                                    a && b.paint(c, b.originCanvas, a)
                                })
                            })
                        }),
                        this.sandbox.on("paint:filter", function(a) {
                            b.setImageDataForFilter(a, function() {
                                b.sandbox.emit("paint:preview", a)
                            })
                        }),
                        this.sandbox.on("history:init", function() {
                            b.resetable = !1
                        }),
                        this.sandbox.on("history:init:completed", function() {
                            b.resetable = !0
                        }),
                        this.sandbox.on(["detailmenu:back", "history:change"], function(c) {
                            a.edit.crop.resetMatrix(),
                            b.resetable && b.resetCanvas()
                        }),
                        this.sandbox.on("preview:onload", function(a) {
                            b.tcanvas.width = a.w,
                                b.tcanvas.height = a.h,
                                b.tfakeCanvas.width = b.fakeCanvas.width,
                                b.tfakeCanvas.height = b.fakeCanvas.height,
                                b.currentFilter = "unknown",
                                b.resetCanvas()
                        }),
                        this.sandbox.on("paint:thumbnail", function(a, c) {
                            b.paintThumbnail(a, c)
                        }),
                        this.sandbox.on(["editor:clear", "editor:change"], function() {
                            b.clear()
                        })
                },
                resetCanvas: function() {
                    var a = this;
                    this.sandbox.emit("history:current", function(b) {
                        a.sandbox.emit("paint:filter", b)
                    })
                },
                showFakeCanvas: function() {
                    this.fakeCanvas.classList.remove(a.HIDE_CLASS),
                        this.canvas.classList.add(a.HIDE_CLASS)
                },
                hideFakeCanvas: function() {
                    this.canvas.classList.remove(a.HIDE_CLASS),
                        this.fakeCanvas.classList.add(a.HIDE_CLASS)
                },
                paint: function(b, c, d) {
                    var e = c.getContext("2d")
                        , f = c.width
                        , g = c.height
                        , h = this.getOriginalImageData(d);
                    if (b.focus) {
                        var i = {};
                        for (var j in b.focus)
                            b.focus.hasOwnProperty(j) && (i[j] = b.focus[j]);
                        var k = this.blurImageData;
                        c === this.fakeCanvas && (i = {
                            cx: b.focus.cx / 2,
                            cy: b.focus.cy / 2,
                            radius: b.focus.radius / 2,
                            thickness: b.focus.thickness / 2,
                            angle: b.focus.angle,
                            degree: b.focus.degree,
                            type: b.focus.type,
                            ocx: b.focus.ocx / 2,
                            ocy: b.focus.ocy / 2,
                            oangle: b.focus.oangle,
                            odegree: b.focus.odegree
                        },
                            k = this.fakeBlurImageData),
                            h = a.effect.focus(h, k, i)
                    }
                    c.width = d.width,
                        c.height = d.height,
                        e.putImageData(h, 0, 0),
                    b.crop && a.edit && a.edit.crop && (a.edit.crop.paint(c, b.crop),
                        this.sandbox.emit("paint:crop")),
                    b.resize && a.edit && a.edit.size && (a.edit.size.paint(c, b.resize),
                        this.sandbox.emit("paint:resize")),
                        h = e.getImageData(0, 0, c.width, c.height),
                        h = a.effect && a.effect.paint(h, b) || h,
                        e.putImageData(h, 0, 0),
                    c !== this.canvas || f === c.width && g === c.height || this.sandbox.emit("preview:resize", {
                        w: c.width,
                        h: c.height
                    }),
                    c === this.canvas && this.sandbox.emit("paint:complete")
                },
                paintThumbnail: function(c, d) {
                    var e = d.getContext("2d")
                        , f = e.getImageData(0, 0, b, b);
                    f = a.effect.paint(f, c),
                        e.putImageData(f, 0, 0)
                },
                getOriginalImageData: function(a) {
                    var b = a.getContext("2d");
                    return b.getImageData(0, 0, a.width, a.height)
                },
                setImageDataForFilter: function(a, b) {
                    var c = this;
                    if (b = b || function() {}
                            ,
                        this.currentFilter !== a.filter) {
                        var d = a.filter;
                        this.sandbox.emit("imageManager:get", d, function(a) {
                            a && c.saveImageData(d, a),
                                b()
                        })
                    } else
                        b()
                },
                saveImageData: function(a, b) {
                    this.drawImage(b, this.tcanvas),
                        this.drawImage(b, this.tfakeCanvas);
                    var c = this;
                    this.drawBlurImage(a, this.tcanvas, function(a) {
                        c.blurImageData = a
                    }),
                        this.drawBlurImage(a + "_fake", this.tfakeCanvas, function(a) {
                            c.fakeBlurImageData = a
                        }),
                        this.currentFilter = a
                },
                drawImage: function(a, b) {
                    var c = b.getContext("2d");
                    c.clearRect(0, 0, b.width, b.height),
                        c.drawImage(a, 0, 0, b.width, b.height)
                },
                drawBlurImage: function(b, c, d) {
                    var e = this;
                    this.sandbox.emit("imageManager:getBlur", b, function(f) {
                        if (f)
                            d(f);
                        else {
                            var g = e.getOriginalImageData(c)
                                , h = a.effect && "function" == typeof a.effect.qblur && a.effect.qblur(g, 1);
                            e.sandbox.emit("imageManager:addBlur", b, h),
                                d(h)
                        }
                    })
                },
                clear: function() {
                    this.clearCanvas(this.canvas),
                        this.clearCanvas(this.fakeCanvas),
                        this.clearCanvas(this.tcanvas),
                        this.clearCanvas(this.tfakeCanvas)
                },
                clearCanvas: function(a) {
                    var b = a.getContext("2d");
                    b.clearRect(0, 0, a.width, a.height)
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = function(a) {
                    var b = document.createElement("canvas");
                    b.width = a.width,
                        b.height = a.height;
                    var c = b.getContext("2d");
                    return c.drawImage(a, 0, 0),
                        b
                }
                ;
            a.edit = {},
                a.edit.crop = {
                    paint: function(a, c) {
                        var d = b(a)
                            , e = a.getContext("2d");
                        e.clearRect(0, 0, a.width, a.height);
                        var f = this.getMatrix(c, a.width, a.height);
                        this.lastMatrix = this.getMatrix(c, a.width, a.height),
                            a.width = f.width,
                            a.height = f.height,
                            e.save(),
                            e.transform.apply(e, f.matrix.toArray()),
                            e.drawImage(d, 0, 0),
                            e.restore()
                    },
                    resetMatrix: function() {
                        this.lastMatrix = null
                    },
                    getMatrix: function(b, c, d) {
                        var e = 1 === b.rotate || 3 === b.rotate ? !0 : !1
                            , f = parseInt(c * b.width)
                            , g = parseInt(d * b.height);
                        if (e) {
                            var h = f;
                            f = g,
                                g = h
                        }
                        var i = 0 === b.flipV ? 0 : 180
                            , j = 0 === b.flipH ? 0 : 180
                            , k = 90 * b.rotate + b.angle
                            , l = c * b.centerX
                            , m = d * b.centerY
                            , n = new a.Matrix;
                        return n.translate(-l, -m),
                        0 !== k && n.rotateMatrix(-k),
                        0 !== j && n.reverseMatrix(n.REVERSE_LEFTRIGHT),
                        0 !== i && n.reverseMatrix(n.REVERSE_UPDOWN),
                            n.translate(f / 2, g / 2),
                        {
                            width: f,
                            height: g,
                            matrix: n
                        }
                    },
                    convertOtoE: function(a, b) {
                        var c = this.lastMatrix;
                        if (c) {
                            var d = c.matrix;
                            return d.pointMulti(a, b)
                        }
                        return {
                            x: a,
                            y: b
                        }
                    },
                    convertEtoO: function(a, b) {
                        var c = this.lastMatrix;
                        if (c) {
                            var d = c.matrix.getInverseMatrix();
                            return d.pointMulti(a, b)
                        }
                        return {
                            x: a,
                            y: b
                        }
                    }
                },
                a.edit.size = {
                    paint: function(a, c) {
                        var d = b(a)
                            , e = parseInt(a.width * c.scaleX)
                            , f = parseInt(a.height * c.scaleY)
                            , g = this.getMatrix(c)
                            , h = a.getContext("2d");
                        a.width = e,
                            a.height = f,
                            h.clearRect(0, 0, e, f),
                            h.save(),
                            h.transform.apply(h, g.toArray()),
                            h.drawImage(d, 0, 0),
                            h.restore()
                    },
                    resetMatrix: function() {
                        this.lastMatrix = null
                    },
                    getMatrix: function(b) {
                        var c = new a.Matrix;
                        return c.scaleMatrix(b.scaleX, b.scaleY),
                            this.lastMatrix = c,
                            c
                    },
                    convertOtoE: function(a, b) {
                        var c = this.lastMatrix;
                        return c ? c.pointMulti(a, b) : {
                            x: a,
                            y: b
                        }
                    },
                    convertEtoO: function(a, b) {
                        var c = this.lastMatrix;
                        return c ? c.getInverseMatrix().pointMulti(a, b) : {
                            x: a,
                            y: b
                        }
                    }
                }
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = a.effect = a.effect || {};
            b.paint = function(b, c) {
                var d, e, f, g, h, i = c.warmth || 0, j = c.saturation || 0, k = (c.contrast || 0) + 50, l = (c.brightness || 0) + 150, m = c.vignette || 0, n = b.data, o = [], p = [], q = [], r = a.effect.getTextureContrast2(k), s = a.effect.getTextureBrightness2(l);
                for (i > 0 ? (f = 1 + 353 * i / 1e5,
                    g = 1 - 94 * i / 1e5,
                    h = 1 - 549 * i / 1e5) : (f = 1 + 608 * i / 1e5,
                    g = 1 - 173 * i / 1e5,
                    h = 1 - 961 * i / 1e5),
                         d = 0; 256 > d; d += 1)
                    (o[d] = d * f | 0) < 0 ? o[d] = 0 : o[d] > 255 && (o[d] = 255),
                        (p[d] = d * g | 0) < 0 ? p[d] = 0 : p[d] > 255 && (p[d] = 255),
                        (q[d] = d * h | 0) < 0 ? q[d] = 0 : q[d] > 255 && (q[d] = 255),
                        o[d] = s[r[o[d]]],
                        p[d] = s[r[p[d]]],
                        q[d] = s[r[q[d]]];
                var t, u, v, w, x = (j + 100) / 100, y = .299 * (1 - x), z = .587 * (1 - x), A = .114 * (1 - x);
                for (d = 0,
                         e = n.length; e > d; d += 4)
                    u = n[d],
                        v = n[d + 1],
                        w = n[d + 2],
                        t = y * u + z * v + A * w | 0,
                        (u = t + x * u | 0) < 0 ? u = 0 : u > 255 && (u = 255),
                        (v = t + x * v | 0) < 0 ? v = 0 : v > 255 && (v = 255),
                        (w = t + x * w | 0) < 0 ? w = 0 : w > 255 && (w = 255),
                        n[d] = o[u],
                        n[d + 1] = p[v],
                        n[d + 2] = q[w];
                return a.effect.vignette(b, m),
                    b
            }
                ,
                b.vignette = function(a, b) {
                    if (0 !== b)
                        for (var c, d, e, f, g = 1 - .007 * Math.abs(b), h = .008 * b, i = a.data, j = a.width, k = a.height, l = i.length / (j * k), m = 0; k > m; m++)
                            for (var n = 0; j > n; n++) {
                                e = n * (1 / j),
                                    f = m * (1 / k),
                                    j > k ? (c = k / j,
                                        d = .5 * Math.sqrt(1 + c * c),
                                        f -= .5 * (1 - 1 / c),
                                        f *= c) : (c = j / k,
                                        d = .5 * Math.sqrt(1 + c * c),
                                        e -= .5 * (1 - 1 / c),
                                        e *= c);
                                var o = Math.sqrt((.5 - e) * (.5 - e) + (.5 - f) * (.5 - f))
                                    , p = (o - g * d) / (d - g * d);
                                p = Math.min(Math.max(p, 0), 1);
                                var q = p * p * p * (p * (6 * p - 15) + 10)
                                    , r = 1 - q * q
                                    , s = m * j * l + n * l;
                                0 > h ? (i[s] = 255 * (.00390625 * i[s] + (1 - r) * -h),
                                    i[s + 1] = 255 * (.00390625 * i[s + 1] + (1 - r) * -h),
                                    i[s + 2] = 255 * (.00390625 * i[s + 2] + (1 - r) * -h)) : (i[s] = 255 * (.00390625 * i[s] * (1 - h) + .00390625 * i[s] * r * h),
                                    i[s + 1] = 255 * (.00390625 * i[s + 1] * (1 - h) + .00390625 * i[s + 1] * r * h),
                                    i[s + 2] = 255 * (.00390625 * i[s + 2] * (1 - h) + .00390625 * i[s + 2] * r * h))
                            }
                    return a
                }
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = document.createElement("canvas")
                , c = b.getContext("2d");
            a.effect = a.effect || {},
                a.effect.t_brightness = [],
                a.effect.t_contrast = [],
                a.effect.loadLookupImage = function() {
                    var d = a.lookupDataUrl.tc_brightness
                        , e = a.lookupDataUrl.tc_contrast;
                    a.util.loadImage(d, function(d, e) {
                        if (d)
                            return void console.error(d);
                        var f = b.width = e.naturalWidth
                            , g = b.height = e.naturalHeight;
                        c.drawImage(e, 0, 0, f, g),
                            a.effect.tc_brightness = c.getImageData(0, 0, f, g)
                    }),
                        a.util.loadImage(e, function(d, e) {
                            if (d)
                                return void console.error(d);
                            var f = b.width = e.naturalWidth
                                , g = b.height = e.naturalHeight;
                            c.drawImage(e, 0, 0, f, g),
                                a.effect.tc_contrast = c.getImageData(0, 0, f, g)
                        })
                }
                ,
                a.effect.getTextureBrightness2 = function(b) {
                    for (var c = a.effect.tc_brightness.data, d = a.effect.tc_brightness.width, e = (a.effect.tc_brightness.height,
                    4 * d * b), f = e + 4 * d, g = []; f > e; e += 4)
                        g.push(c[e]),
                            g.push(c[e + 1]);
                    return g
                }
                ,
                a.effect.getTextureContrast2 = function(b) {
                    for (var c = a.effect.tc_contrast.data, d = a.effect.tc_contrast.width, e = (a.effect.tc_contrast.height,
                    4 * d * b), f = e + 4 * d, g = []; f > e; e += 4)
                        g.push(c[e]),
                            g.push(c[e + 1]);
                    return g
                }
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = (a.effect = a.effect || {},
                document.createElement("canvas"))
                , c = b.getContext("2d")
                , d = document.createElement("canvas");
            a.effect.qblur = function(e, f) {
                var g = e.width
                    , h = e.height;
                f = f || 0,
                    b.width = g,
                    b.height = h,
                    d.width = g >> 2,
                    d.height = h >> 2,
                    c = b.getContext("2d"),
                    c.putImageData(e, 0, 0);
                var i = d.getContext("2d");
                if (i.drawImage(b, 0, 0, d.width, d.height),
                    f > 0) {
                    var j = i.getImageData(0, 0, d.width, d.height);
                    j = a.effect.boxBlur(j, f),
                        i.putImageData(j, 0, 0)
                }
                return c.clearRect(0, 0, g, h),
                    c.drawImage(d, 0, 0, g, h),
                    c.getImageData(0, 0, g, h)
            }
                ,
                a.effect.boxBlur = function(a, b) {
                    var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x = a.data, y = a.width, z = a.height, A = y << 2, B = A << 1, C = y * z << 2, D = A - 4, E = A - 8, F = c.createImageData(y, z), G = F.data;
                    for (b = b || 2; b--; ) {
                        for (e = 0; z > e; e += 1)
                            for (g = e * A,
                                     f = 0; A > f; f += 4)
                                d = g + f,
                                    t = x[d],
                                    u = x[d + 1],
                                    v = x[d + 2],
                                    w = x[d + 3],
                                    p = t + t,
                                    q = u + u,
                                    r = v + v,
                                    s = w + w,
                                    h = d - A,
                                    i = d + A,
                                    h > -1 ? (p += x[h] << 1,
                                        q += x[h + 1] << 1,
                                        r += x[h + 2] << 1,
                                        s += x[h + 3] << 1) : (p += t << 1,
                                        q += u << 1,
                                        r += v << 1,
                                        s += w << 1),
                                    C > i ? (p += x[i] << 1,
                                        q += x[i + 1] << 1,
                                        r += x[i + 2] << 1,
                                        s += x[i + 3] << 1) : (p += t << 1,
                                        q += u << 1,
                                        r += v << 1,
                                        s += w << 1),
                                    l = d - B,
                                    m = d + B,
                                    l > -1 ? (p += x[l],
                                        q += x[l + 1],
                                        r += x[l + 2],
                                        s += x[l + 3]) : (p += t,
                                        q += u,
                                        r += v,
                                        s += w),
                                    C > m ? (p += x[m],
                                        q += x[m + 1],
                                        r += x[m + 2],
                                        s += x[m + 3]) : (p += t,
                                        q += u,
                                        r += v,
                                        s += w),
                                    G[d] = p >> 3,
                                    G[d + 1] = q >> 3,
                                    G[d + 2] = r >> 3,
                                    G[d + 3] = s >> 3;
                        for (e = 0; z > e; e += 1)
                            for (g = e * A,
                                     f = 0; A > f; f += 4)
                                d = g + f,
                                    t = G[d],
                                    u = G[d + 1],
                                    v = G[d + 2],
                                    w = G[d + 3],
                                    p = t + t,
                                    q = u + u,
                                    r = v + v,
                                    s = w + w,
                                    k = d + 4,
                                    j = d - 4,
                                    D > f ? (p += G[k] << 1,
                                        q += G[k + 1] << 1,
                                        r += G[k + 2] << 1,
                                        s += G[k + 3] << 1) : (p += t << 1,
                                        q += u << 1,
                                        r += v << 1,
                                        s += w << 1),
                                    f > 0 ? (p += G[j] << 1,
                                        q += G[j + 1] << 1,
                                        r += G[j + 2] << 1,
                                        s += G[j + 3] << 1) : (p += t << 1,
                                        q += u << 1,
                                        r += v << 1,
                                        s += w << 1),
                                    o = d + 8,
                                    n = d - 8,
                                    E > f ? (p += G[o],
                                        q += G[o + 1],
                                        r += G[o + 2],
                                        s += G[o + 3]) : (p += t,
                                        q += u,
                                        r += v,
                                        s += w),
                                    f > 4 ? (p += G[n],
                                        q += G[n + 1],
                                        r += G[n + 2],
                                        s += G[n + 3]) : (p += t,
                                        q += u,
                                        r += v,
                                        s += w),
                                    x[d] = p >> 3,
                                    x[d + 1] = q >> 3,
                                    x[d + 2] = r >> 3,
                                    x[d + 3] = s >> 3
                    }
                    return a
                }
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            a.effect = a.effect || {},
                a.effect.focus = function(a, b, c) {
                    var d, e, f, g, h, i = a.data, j = a.width, k = a.height, l = b.data, m = c.ocx, n = c.ocy, o = 2 * Math.PI - (c.oangle || 0), p = c.radius / 2 < c.thickness ? c.thickness : c.radius / 2, q = c.radius - (p - c.thickness), r = 100 * q | 0, s = 100 * (q + p) | 0;
                    if ("linear" === c.type) {
                        var t = -Math.sin(o)
                            , u = Math.cos(o);
                        for (f = 0,
                                 e = 0; k > e; e += 1)
                            for (d = 0; j > d; d += 1,
                                f += 4)
                                g = 100 * Math.abs(t * (m - d) + u * (e - n)) | 0,
                                r > g || (g > s ? (i[f] = l[f],
                                    i[f + 1] = l[f + 1],
                                    i[f + 2] = l[f + 2]) : (g = 255 * (g - r) / (s - r) + .5 | 0,
                                    i[f] = (g * l[f] + (255 - g) * i[f]) / 255 | 0,
                                    i[f + 1] = (g * l[f + 1] + (255 - g) * i[f + 1]) / 255 | 0,
                                    i[f + 2] = (g * l[f + 2] + (255 - g) * i[f + 2]) / 255 | 0))
                    } else
                        for (f = 0,
                                 e = 0; k > e; e += 1)
                            for (h = (e - n) * (e - n),
                                     d = 0; j > d; d += 1,
                                     f += 4)
                                g = 100 * Math.sqrt((d - m) * (d - m) + h) | 0,
                                r > g || (g > s ? (i[f] = l[f],
                                    i[f + 1] = l[f + 1],
                                    i[f + 2] = l[f + 2]) : (g = 255 * (g - r) / (s - r) + .5 | 0,
                                    i[f] = (g * l[f] + (255 - g) * i[f]) / 255 | 0,
                                    i[f + 1] = (g * l[f + 1] + (255 - g) * i[f + 1]) / 255 | 0,
                                    i[f + 2] = (g * l[f + 2] + (255 - g) * i[f + 2]) / 255 | 0));
                    return a
                }
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = "white_mode";
            a.addModule("Light", {
                init: function(a, b, c) {
                    this.options = c,
                        this.sandbox = a,
                        this.frame = b,
                        this.prefix = c.prefix || "",
                        this._initLight(),
                        this._bindEvent()
                },
                _initLight: function() {
                    this.options.lightOn && this.frame.classList.add(this.prefix + b)
                },
                _bindEvent: function() {
                    var a = this;
                    this.sandbox.on("light:switch", function() {
                        a.frame.classList.toggle(a.prefix + b),
                            a._sandCurrentLight()
                    }),
                        this.sandbox.on("light:get", function(b) {
                            "function" == typeof b ? b(a._isLightOn()) : a._sandCurrentLight()
                        })
                },
                _sandCurrentLight: function() {
                    this.sandbox.emit("light:change", this._isLightOn())
                },
                _isLightOn: function() {
                    return this.frame.classList.contains(this.prefix + b)
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = a.Slider.extend({
                _setInputValue: function(a) {
                    var b = this.options.max - (a - this.options.min)
                        , c = 100 * b;
                    this.emit("set:value", Math.round(c) + "%"),
                        this.inputEl.setAttribute("value", a)
                }
            })
                , c = a.util.getPrefix(document.body, "transform")
                , d = "magnifier_show";
            a.addModule("Magnifier", {
                init: function(b, c, d) {
                    this.frame = c,
                        this.sandbox = b,
                        this.previewScaleWrap = a.$$p(".preview_scale_wrapper")[0],
                        this.scaleArea = a.$$p(".magnifier_photo")[0],
                        this.prefix = d.prefix || "",
                        this.bindSandboxEvent(),
                        this.bindScaleOverEvent()
                },
                bindSandboxEvent: function() {
                    var b = this;
                    this.sandbox.on("mode:change", function(c) {
                        c.hasOwnProperty("magnifierEnable") && b.scaleArea.classList[c.magnifierEnable ? "remove" : "add"](a.HIDE_CLASS)
                    }),
                        this.sandbox.on("preview:animate:end", function() {
                            b.initSlider()
                        })
                },
                initSlider: function() {
                    var d = this
                        , e = a.util.Transform.parse(this.previewScaleWrap.style[c]).scaleX
                        , f = parseFloat(this.previewScaleWrap.getAttribute("data-max-scale"))
                        , g = .5 > e ? .1 : .4
                        , h = 1 > e ? 1.4 : f + .1
                        , i = h - (1 - g)
                        , j = h - (e - g)
                        , k = {
                        min: g,
                        max: h,
                        start: i,
                        current: j
                    };
                    if (this.slider)
                        this.slider.reset(k);
                    else {
                        var l = a.$$p(".slider_bar", this.scaleArea)[0];
                        this.slider = new b(l,k),
                            this.slider.on(["move", "end"], function(a) {
                                var b = this.options.max - (a - this.options.min);
                                d.editFlag || (d.editFlag = !0),
                                    d.sandbox.emit("change:preview:scale", b)
                            });
                        var m = a.$$(".pp_slider_wrap", l)[0].getAttribute("data-size");
                        l.style.cssText = "margin-top:" + -m / 2 + "px;top:50%",
                            setTimeout(function() {
                                d.hide()
                            }, 500)
                    }
                },
                bindScaleOverEvent: function() {
                    var b = this
                        , c = this.scaleArea
                        , d = this.frame;
                    a.event.on(c, "mouseenter", function(a) {
                        b.editFlag = !1,
                            b.show()
                    }),
                        a.event.on(c, "mouseleave", function(a) {
                            b.editFlag || b.hide()
                        }),
                        a.event.on(d, a.EVENT_NAME.START, function(c) {
                            for (var d = !1, e = a.event.getTarget(c); e && e.tagName && "html" !== e.tagName.toLowerCase(); ) {
                                if (e.className.toLowerCase().indexOf("magnifier_photo") > -1) {
                                    d = !0;
                                    break
                                }
                                e = e.parentNode
                            }
                            d || b.hide()
                        })
                },
                show: function() {
                    this.scaleArea.classList.add(this.prefix + d)
                },
                hide: function() {
                    this.scaleArea.classList.remove(this.prefix + d)
                },
                move: function(a) {
                    this.slider.setCurrent(a)
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            a.addModule("History", {
                init: function(b, c, d) {
                    this.sandbox = b,
                        this.preview = a.$$p(".preview_canvas")[0],
                        this.scaleWrapper = a.$$p(".preview_scale_wrapper")[0],
                        this.TRANSFORM_NAME = a.util.getPrefix(c, "transform"),
                        this.bindSandboxEvent()
                },
                bindSandboxEvent: function() {
                    var a = this;
                    this.sandbox.on("history:init", function(b) {
                        a.initHistory(b)
                    }),
                        this.sandbox.on("history:add", function(b) {
                            a.add(b)
                        }),
                        this.sandbox.on("history:current", function(b) {
                            "function" == typeof b && b(a.getCurrentEditData())
                        }),
                        this.sandbox.on("history:remove", function(b) {
                            a.remove(b)
                        }),
                        this.sandbox.on("paint:complete", function() {
                            a._updateImageData(),
                                a._setCurrentScale()
                        })
                },
                initHistory: function(a) {
                    this.metaData = a,
                        this.metaData.history = a.history || {},
                        this.sandbox.emit("history:change", this.getCurrentEditData()),
                        this.sandbox.emit("history:init:completed")
                },
                getCurrentEditData: function() {
                    return JSON.parse(JSON.stringify(this.metaData.history))
                },
                add: function(a) {
                    var b = this.metaData.history;
                    for (var c in a)
                        a.hasOwnProperty(c) && (null  === a[c] ? delete b[c] : b[c] = a[c]);
                    this.sandbox.emit("history:change", this.getCurrentEditData())
                },
                _updateImageData: function() {
                    this.metaData.imageData = this.preview.getContext("2d").getImageData(0, 0, this.preview.width, this.preview.height)
                },
                _setCurrentScale: function() {
                    this.metaData.currentScale = a.util.Transform.parse(this.scaleWrapper.style[this.TRANSFORM_NAME]).scaleX
                },
                remove: function(a) {
                    var b = this.metaData.history;
                    for (var c in b)
                        b.hasOwnProperty(c) && c === a && delete b[c];
                    this.sandbox.emit("history:change", this.getCurrentEditData())
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = Class.extend({
                init: function() {
                    return this
                },
                run: function(a, b, c, d) {
                    this._reset(),
                        this.canvas = this._makeTmpCanvas(a),
                        this.canvas.getContext("2d").putImageData(a, 0, 0),
                        this.currentScale = b,
                        this.tmpCanvas = this._makeTmpCanvas(a),
                        this._composite(c, d)
                },
                _reset: function() {
                    this.canvas = null ,
                        this.currentScale = null
                },
                _makeTmpCanvas: function(a) {
                    var b = document.createElement("canvas");
                    return b.width = a.width,
                        b.height = a.height,
                        b
                },
                _composite: function(a, b) {
                    var c = this
                        , d = [];
                    a.text && this._compositeText(a.text),
                    a.watermark && (d = d.concat(a.watermark)),
                    a.sticker && (d = d.concat(a.sticker)),
                        this._compositeImage(d, function() {
                            return b(c.canvas, a)
                        })
                },
                _compositeText: function(a) {
                    var b = this;
                    a.map(function(a) {
                        var c = 1 / b.currentScale
                            , d = a.left * c
                            , e = a.top * c
                            , f = a.width * c
                            , g = a.height * c
                            , h = a.angle
                            , i = a.color
                            , j = a.desc
                            , k = a.fontWeight
                            , l = a.fontSize * c
                            , m = a.fontFamily
                            , n = b._convertTextToCanvas(j, f, g, i, k, l, m);
                        b._drawOnPreview(n, d, e, f, g, h)
                    })
                },
                _convertTextToCanvas: function(a, b, c, d, e, f, g) {
                    var h = 2
                        , i = document.createElement("canvas");
                    i.width = b + h,
                        i.height = c + h;
                    var j = i.getContext("2d");
                    j.textAlign = "center",
                        j.font = e + " " + f + "px " + g,
                        j.fillStyle = d;
                    for (var k = a.split("↵"), l = i.width / 2, m = f - f / 7, n = 0; n < k.length; n++)
                        j.fillText(k[n], l, m),
                            m += f;
                    return i
                },
                _compositeImage: function(a, b) {
                    var c = this
                        , d = a.length
                        , e = 0;
                    return 0 === d ? b() : void a.map(function(a) {
                        var f = new Image;
                        f.onload = function() {
                            var g = 2
                                , h = 1 / c.currentScale
                                , i = a.left * h + g / 2
                                , j = a.top * h + g / 2
                                , k = a.width * h
                                , l = a.height * h
                                , m = a.angle
                                , n = a.alpha
                                , o = c._convertImageToCanvas(f, k, l, n);
                            return c._drawOnPreview(o, i, j, k, l, m),
                                e++,
                                d === e ? b() : void 0
                        }
                            ,
                            f.src = a.dataURL
                    })
                },
                _convertImageToCanvas: function(a, b, c, d) {
                    var e = document.createElement("canvas")
                        , f = e.getContext("2d");
                    return e.width = b,
                        e.height = c,
                        f.globalAlpha = d,
                        f.drawImage(a, 0, 0, a.width, a.height, 0, 0, b, c),
                        e
                },
                _drawOnPreview: function(a, b, c, d, e, f) {
                    var g = this.canvas
                        , h = this.tmpCanvas.getContext("2d");
                    h.clearRect(0, 0, this.tmpCanvas.width, this.tmpCanvas.height),
                        h.translate(b + d / 2, c + e / 2),
                        h.rotate(f * Math.PI / 180),
                        h.translate(-(b + d / 2), -(c + e / 2)),
                        h.drawImage(a, 0, 0, d, e, b, c, d, e);
                    var i = g.getContext("2d");
                    i.drawImage(this.tmpCanvas, 0, 0, g.width, g.height, 0, 0, g.width, g.height)
                }
            });
            a.addModule("Save", {
                init: function(a, b, c) {
                    this.sandbox = a,
                        this.frame = b,
                        this._bindEvent()
                },
                _bindEvent: function() {
                    var a = this;
                    this.sandbox.on("menu:save", function() {
                        a._save()
                    })
                },
                _save: function() {
                    var c = []
                        , d = this;
                    this.sandbox.emit("save:get:datalist", function(e) {
                        if (e) {
                            var f = e.length
                                , g = 0;
                            e.forEach(function(a, e) {
                                if (a.imageData)
                                    (new b).run(a.imageData, a.currentScale, a.history, function(a, b) {
                                        c.push(d._makeResultData(e, a.toDataURL(), b, a.width, a.height)),
                                            g++,
                                            d._complete(g, f, c)
                                    });
                                else {
                                    var h = {};
                                    a.history && a.history.editData && (h = a.history.editData),
                                        c.push(d._makeResultData(e, a.dataURI, h)),
                                        g++,
                                        d._complete(g, f, c)
                                }
                            })
                        } else
                            d.sandbox.emit("history:current", function(e) {
                                var f = a.$$p(".preview_canvas")[0]
                                    , g = f.getContext("2d").getImageData(0, 0, f.width, f.height)
                                    , h = a.$$p(".preview_scale_wrapper")[0]
                                    , i = a.util.getPrefix(d.frame, "transform")
                                    , j = a.util.Transform.parse(h.style[i]).scaleX;
                                (new b).run(g, j, e, function(a, b) {
                                    c.push(d._makeResultData(0, a.toDataURL(), b, a.width, a.height)),
                                        d._complete(1, 1, c)
                                })
                            })
                    })
                },
                _makeResultData: function(a, b, c, d, e) {
                    var f = {
                        index: a,
                        dataURL: b,
                        serializedData: null
                    };
                    return d && (f.width = d),
                    e && (f.height = e),
                    c && Object.keys(c).length > 0 && (f.serializedData = this._serialize(c)),
                        f
                },
                _serialize: function(a) {
                    return JSON.stringify({
                        editData: a
                    })
                },
                _complete: function(a, b, c) {
                    if (a === b) {
                        var d = [];
                        c.forEach(function(a) {
                            d[a.index] = a,
                                delete a.index
                        }),
                            this.sandbox.emit("save:complete", d)
                    }
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            a.addModule("Progressbar", {
                init: function(b, c, d) {
                    this.sandbox = b,
                        this.frame = c,
                        this.options = d,
                        this.progressbar = a.$$p(".progressbar")[0],
                        this._bindEvent()
                },
                _bindEvent: function() {
                    var b = this;
                    this.sandbox.on(["editor:change"], function() {
                        b.progressbar.classList.remove(a.HIDE_CLASS)
                    }),
                        this.sandbox.on(["progressbar:hide", "editor:clear"], function() {
                            b.progressbar.classList.add(a.HIDE_CLASS)
                        })
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = "filter"
                , c = "OR00"
                , d = "category"
                , e = "flat"
                , f = "state_item"
                , g = Class.extend({
                init: function(a) {
                    this.host = a,
                        this.sessions = {}
                },
                create: function(b, c, d, e) {
                    var f;
                    return this.sessions[b] ? (f = this.sessions[b],
                        f.reuseFlag = !0,
                        f.stopExtendSession(),
                        f.startExtendSession(b, d, e)) : (f = new a.filter.StaySession(this.host,b,c,d,e),
                        f.reuseFlag = !1,
                        this.add(b, f)),
                        f
                },
                add: function(a, b) {
                    this.sessions[a] = b
                },
                remove: function(b) {
                    if (this.sessions && this.sessions[b]) {
                        if (this.sessions[b].reuseFlag === !1)
                            return this.sessions[b].stopExtendSession(),
                                delete this.sessions[b],
                                a.filter.sessionEnd(this.host, b),
                                !0;
                        this.sessions[b].reuseFlag = !1
                    }
                    return !1
                },
                clear: function() {
                    var a = this;
                    for (var b in this.sessions)
                        this.sessions.hasOwnProperty(b) && a.remove(b);
                    this.sessions = {}
                }
            });
            a.addModule("Filter", {
                init: function(b, c, d) {
                    this.frame = c,
                        this.sandbox = b,
                        this.prefix = d.prefix || "",
                        this.viewport = d.viewport && d.viewport.preview || "flexible",
                        this.originType = d.originType,
                        this.host = a.util.getAPIHost(this.originType),
                        this.sessionManager = new g(this.host),
                        this.orgFilter = null ,
                        this.currentFilter = null ,
                        this.active = !1,
                        this.startOpen = "#filterOpen" === window.location.hash,
                        this.originalBtn = a.$$p(".sub_detail_filter .btn_origin", c)[0],
                        this.filterList = a.$$p(".list_filter", c)[0],
                        this.filterTool = a.$$p(".tools_filter", c)[0],
                        this.overlay = a.$$p(".filter_origin", c)[0],
                        this.originCanvas = a.$$p(".preview_canvas_origin", c)[0],
                        this.bindEvent()
                },
                bindEvent: function() {
                    var f = this;
                    this.sandbox.on("filter:initOptions", function(a) {
                        f.filters = a,
                            f.filterType = a.type === e ? e : d,
                            f.showTool = a.showTool || !1
                    }),
                        this.sandbox.on("filter:start", function(a) {
                            f.filterStart(a.dataURI, a.sessionKey)
                        }),
                        this.sandbox.on("filter:enter", function() {
                            f.sandbox.emit("paint:origin"),
                                f.activation()
                        }),
                        this.sandbox.on("filter:ok", function() {
                            f.applyChanges(),
                                f.reset()
                        }),
                        this.sandbox.on("filter:back", function() {
                            f.reset()
                        }),
                        this.sandbox.on("mainmenu:filter", function(a) {
                            f.filterType === e && f.activeFilterMenu()
                        }),
                        this.sandbox.on("filter:category", function(a) {
                            f.activeFilterMenu()
                        }),
                        this.sandbox.on("filter:apply", function(a) {
                            f.activeFilterMenu(),
                                f.applyFilter(a.args[0])
                        }),
                        this.sandbox.on("filter:" + c, function(a) {
                            f.applyFilter("" === f.historyData[b] ? f.currentFilter : c)
                        }),
                        this.sandbox.on("history:change", function(a) {
                            f.setState(a && a[b])
                        }),
                        this.sandbox.on("filter:session", function(a) {
                            a(f.session.getKey())
                        }),
                        this.sandbox.on("filter:prev", function() {
                            f.navFilter(!1)
                        }),
                        this.sandbox.on("filter:next", function() {
                            f.navFilter(!0)
                        }),
                        this.sandbox.on("editor:change", function() {}),
                        this.sandbox.on("editor:clear", function() {
                            f.clear()
                        }),
                        this.sandbox.on("imageManager:clear:session", function(a) {
                            var b = f.sessionManager.remove(a);
                            b && f.sandbox.emit("filter:removeSessionKey:quickList", a)
                        }),
                        this.sandbox.on("preview:onload", function() {
                            f.startOpen && (f.startOpen = !1,
                                f.sandbox.emit("mainmenu:select", "filter"))
                        }),
                        a.event.on(this.overlay, a.EVENT_NAME.START, this._onMouseDown.bind(this))
                },
                _onMouseDown: function(b) {
                    this.originCanvas.classList.remove(a.HIDE_CLASS),
                        a.event.on(window, a.EVENT_NAME.END, this._onMouseUp.bind(this))
                },
                _onMouseUp: function(b) {
                    this.originCanvas.classList.add(a.HIDE_CLASS),
                        a.event.off(window, a.EVENT_NAME.END, this._onMouseUp.bind(this))
                },
                filterStart: function(a, b) {
                    var c = this;
                    b ? this.createSession(b, null , function(a) {
                        c.sandbox.emit("imageManager:setOriginal"),
                            c.sandbox.emit("filter:thumbnail:draw")
                    }, function(b) {
                        c.startSession(a)
                    }) : this.startSession(a)
                },
                startSession: function(b) {
                    var c = this;
                    a.filter.sessionStart(this.originType, c.host, b, function(b) {
                        b && b.image_url && a.util.isCurrentImageId(b.image_url) && c.completeUpload(b)
                    })
                },
                completeUpload: function(a) {
                    "ok" === a.result.toLowerCase() ? (this.sandbox.emit("imageManager:session", a.session_key),
                        this.createSession(a.session_key, a.ttl),
                        this.sandbox.emit("imageManager:setOriginal"),
                        this.sandbox.emit("filter:thumbnail:draw")) : alert("조금 후에 다시 시도해주세요.")
                },
                activeFilterMenu: function() {
                    if (!this.active) {
                        var a = this;
                        setTimeout(function() {
                            a.sandbox.emit("mainmenu:close"),
                                a.sandbox.emit("submenu", {
                                    args: ["filter"],
                                    eventName: "submenu",
                                    id: "submenu:filter",
                                    idList: "submenu:filter"
                                })
                        }, 0)
                    }
                },
                setState: function(a) {
                    a = a || c,
                        this._setOriginalState(a),
                        this._setCategoryState(a),
                        this._setFilterState(a)
                },
                _setOriginalState: function(a) {
                    this.originalBtn.classList[a === c ? "add" : "remove"](this.prefix + "on")
                },
                _setCategoryState: function(b) {
                    for (var c = this.getCategoryOfFilter(b), d = a.$$p(".btn_category." + f, this.filterList), e = a.$$p('.btn_category[data-click="filter:category:' + c + '"]', this.filterList), g = d.length - 1; g >= 0; g--)
                        d[g].classList.remove(this.prefix + f);
                    for (g = e.length - 1; g >= 0; g--)
                        e[g].classList.add(this.prefix + f)
                },
                _setFilterState: function(b) {
                    for (var c = a.$$p(".menu_filter_item .btn_item." + f, this.filterList), d = a.$$p('.menu_filter_item .btn_item[data-click="filter:apply:' + b + '"]', this.filterList), e = c.length - 1; e >= 0; e--)
                        c[e].classList.remove(this.prefix + f);
                    for (e = d.length - 1; e >= 0; e--)
                        d[e].classList.add(this.prefix + f)
                },
                getCategoryOfFilter: function(a) {
                    var b, c, d, e = this.filters || {}, f = e.category || [];
                    for (b = f.length - 1; b >= 0; b--)
                        for (d = f[b],
                                 c = d.filter.length - 1; c >= 0; c--)
                            if (d.filter[c].id === a)
                                return d.id;
                    return null
                },
                navFilter: function(a) {
                    var d = this.historyData[b] || c
                        , e = this.getFilterPrevNNext(d)
                        , f = a ? e.next : e.prev;
                    this.applyFilter(f),
                        this.sandbox.emit("filterNav:moveToFilter", f, this.getCategoryOfFilter(f))
                },
                getFilterPrevNNext: function(a) {
                    var b, d, e, f, g, h, i = this.filters.filter || {};
                    for (a = a || c,
                             b = d = e = c,
                             g = 0,
                             h = i.length; h > g && (f = i[g],
                        b = d,
                        d = e,
                        e = f.id,
                    d === e || d !== a); g++)
                        ;
                    return e === a && (b = d),
                    {
                        prev: b,
                        next: e
                    }
                },
                activation: function() {
                    var b = this;
                    this.active = !0,
                    this.showTool && this.filterTool.classList.remove(a.HIDE_CLASS),
                        this.sandbox.emit("history:current", function(a) {
                            b.historyData = a,
                                b.currentFilter = a.filter || c,
                                b.orgFilter = b.currentFilter,
                            b.filterType === e && b.sandbox.emit("filterNav:moveToFilter", b.currentFilter),
                                b.setState(b.currentFilter)
                        })
                },
                applyFilter: function(d) {
                    d === c ? (this.historyData[b] = "",
                        a.tiara.sendLog("filter", a.tiara.ORIGIN)) : (this.historyData[b] = d,
                        this.currentFilter = d,
                        a.tiara.sendLog("filter", d)),
                        this.sandbox.emit("paint:filter", this.historyData),
                        this.setState(d)
                },
                applyChanges: function() {
                    this.orgFilter = this.historyData.filter,
                    (this.historyData.filter === c || "" === this.historyData.filter) && (this.historyData.filter = null ),
                        this.sandbox.emit("history:add", this.historyData),
                        a.tiara.sendLog(a.tiara.OK, b, this.historyData.filter || a.tiara.ORIGIN)
                },
                reset: function() {
                    this.active = !1,
                        this.setState(this.orgFilter),
                        this.filterTool.classList.add(a.HIDE_CLASS)
                },
                createSession: function(a, b, c, d) {
                    this.session = this.sessionManager.create(a, b, c, d)
                },
                clear: function() {
                    this.sessionManager.clear(),
                        this.session = null
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            a.filter = a.filter || {};
            var b = [{
                label: "Aqua",
                filter: [{
                    label: "AQ01",
                    id: "AQ01"
                }, {
                    label: "AQ02",
                    id: "AQ02"
                }, {
                    label: "AQ03",
                    id: "AQ03"
                }, {
                    label: "AQ04",
                    id: "AQ04"
                }, {
                    label: "AQ05",
                    id: "AQ05"
                }, {
                    label: "AQ06",
                    id: "AQ06"
                }, {
                    label: "AQ07",
                    id: "AQ07"
                }, {
                    label: "AQ08",
                    id: "AQ08"
                }, {
                    label: "AQ09",
                    id: "AQ09"
                }, {
                    label: "AQ10",
                    id: "AQ10"
                }]
            }, {
                label: "B&W",
                filter: [{
                    label: "BW01",
                    id: "BW01"
                }, {
                    label: "BW02",
                    id: "BW02"
                }, {
                    label: "BW03",
                    id: "BW03"
                }, {
                    label: "BW04",
                    id: "BW04"
                }, {
                    label: "BW05",
                    id: "BW05"
                }, {
                    label: "BW06",
                    id: "BW06"
                }, {
                    label: "BW07",
                    id: "BW07"
                }, {
                    label: "BW08",
                    id: "BW08"
                }, {
                    label: "BW09",
                    id: "BW09"
                }, {
                    label: "BW10",
                    id: "BW10"
                }]
            }, {
                label: "Clair",
                filter: [{
                    label: "CL01",
                    id: "CL01"
                }, {
                    label: "CL02",
                    id: "CL02"
                }, {
                    label: "CL03",
                    id: "CL03"
                }, {
                    label: "CL04",
                    id: "CL04"
                }, {
                    label: "CL05",
                    id: "CL05"
                }, {
                    label: "CL06",
                    id: "CL06"
                }, {
                    label: "CL07",
                    id: "CL07"
                }, {
                    label: "CL08",
                    id: "CL08"
                }, {
                    label: "CL09",
                    id: "CL09"
                }, {
                    label: "CL10",
                    id: "CL10"
                }]
            }, {
                label: "Pop",
                filter: [{
                    label: "PO01",
                    id: "PO01"
                }, {
                    label: "PO02",
                    id: "PO02"
                }, {
                    label: "PO03",
                    id: "PO03"
                }, {
                    label: "PO04",
                    id: "PO04"
                }, {
                    label: "PO05",
                    id: "PO05"
                }, {
                    label: "PO06",
                    id: "PO06"
                }, {
                    label: "PO07",
                    id: "PO07"
                }, {
                    label: "PO08",
                    id: "PO08"
                }, {
                    label: "PO09",
                    id: "PO09"
                }, {
                    label: "PO10",
                    id: "PO10"
                }]
            }, {
                label: "Retro",
                filter: [{
                    label: "RE01",
                    id: "RE01"
                }, {
                    label: "RE02",
                    id: "RE02"
                }, {
                    label: "RE03",
                    id: "RE03"
                }, {
                    label: "RE04",
                    id: "RE04"
                }, {
                    label: "RE05",
                    id: "RE05"
                }, {
                    label: "RE06",
                    id: "RE06"
                }, {
                    label: "RE07",
                    id: "RE07"
                }, {
                    label: "RE08",
                    id: "RE08"
                }, {
                    label: "RE09",
                    id: "RE09"
                }, {
                    label: "RE10",
                    id: "RE10"
                }]
            }, {
                label: "Solar",
                filter: [{
                    label: "SO01",
                    id: "SO01"
                }, {
                    label: "SO02",
                    id: "SO02"
                }, {
                    label: "SO03",
                    id: "SO03"
                }, {
                    label: "SO04",
                    id: "SO04"
                }, {
                    label: "SO05",
                    id: "SO05"
                }, {
                    label: "SO06",
                    id: "SO06"
                }, {
                    label: "SO07",
                    id: "SO07"
                }, {
                    label: "SO08",
                    id: "SO08"
                }, {
                    label: "SO09",
                    id: "SO09"
                }, {
                    label: "SO10",
                    id: "SO10"
                }, {
                    label: "SO11",
                    id: "SO11"
                }]
            }]
                , c = [{
                label: "Aqua",
                id: "AQ02"
            }, {
                label: "Mint",
                id: "AQ05"
            }, {
                label: "Firs",
                id: "AQ07"
            }, {
                label: "City",
                id: "AQ10"
            }, {
                label: "Analog",
                id: "RE01"
            }, {
                label: "Cine",
                id: "RE05"
            }, {
                label: "Maple",
                id: "RE08"
            }, {
                label: "Pillow",
                id: "RE09"
            }, {
                label: "Vanilla",
                id: "CL03"
            }, {
                label: "Cozy",
                id: "CL06"
            }, {
                label: "Breeze",
                id: "CL07"
            }, {
                label: "Morning",
                id: "CL09"
            }, {
                label: "Solar",
                id: "SO01"
            }, {
                label: "Mellow",
                id: "SO04"
            }, {
                label: "Kaman",
                id: "SO10"
            }, {
                label: "Mite",
                id: "SO11"
            }, {
                label: "Moon",
                id: "BW01"
            }, {
                label: "Label",
                id: "BW03"
            }, {
                label: "Stone",
                id: "BW06"
            }, {
                label: "Noir",
                id: "BW09"
            }, {
                label: "Pulse",
                id: "PO01"
            }, {
                label: "Andy",
                id: "PO03"
            }, {
                label: "Dream",
                id: "PO05"
            }, {
                label: "Vivid",
                id: "PO09"
            }];
            a.addModule("FilterOption", {
                init: function(b, c, d) {
                    this.sandbox = b,
                        this.option = d.filter || {
                                type: "category"
                            },
                        this.host = a.util.getAPIHost(d.originType),
                        this.initOptions(),
                        this.bindEvent()
                },
                initOptions: function() {
                    var b = this;
                    a.filter.getServerFilterList(this.host, function(a) {
                        a = b.arrangeServerList(a),
                            b.filterOption = b.validateOption(a);
                        for (var c in b.option)
                            b.option.hasOwnProperty(c) && !b.filterOption.hasOwnProperty(c) && (b.filterOption[c] = b.option[c]);
                        b.sandbox.emit("filter:initOptions", b.filterOption)
                    })
                },
                bindEvent: function() {
                    var a = this;
                    this.sandbox.on("filter:getFilterOption", function(b) {
                        b(a.filterOption)
                    })
                },
                arrangeServerList: function(a) {
                    var b, c = [];
                    c.push("OR00");
                    for (b in a)
                        a.hasOwnProperty(b) && c.push.apply(c, a[b]);
                    return c
                },
                validateOption: function(b) {
                    var c = this.option.type || a.filter.listType || ""
                        , d = {};
                    return "flat" === c ? (d.type = "flat",
                        d.filter = this.validateFilters(b, this.option.filter)) : (d.type = "category",
                        d.category = this.validateCategories(b, this.option.category),
                        d.filter = this.getCategoryFilter(d.category)),
                        d.itemWidth = this.option.itemWidth || 72,
                        d.itemHeight = this.option.itemHeight || 72,
                        d.categoryMargin = this.option.categoryMargin || 12,
                        d.filterMargin = this.option.filterMargin || 12,
                        d.wrapperMargin = this.option.wrapperMargin || 0,
                        d
                },
                validateCategories: function(c, d) {
                    d = d || a.filter.list || b;
                    var e, f, g, h = d.length, i = [];
                    for (g = 0; h > g; g++)
                        e = d[g],
                            f = this.validateFilters(c, e.filter || []),
                        f.length > 0 && (e.filter = f,
                            e.id = (e.label || "f" + g).replace(/[&<>"'`]/g, ""),
                            i.push(e));
                    return i
                },
                validateFilters: function(b, d) {
                    d = d || a.filter.list || c;
                    var e, f, g = d.length, h = [];
                    for (f = 0; g > f; f++)
                        e = d[f],
                        b.indexOf(e.id) > -1 && (e.label = "label" in e ? e.label : e.id,
                            h.push(e));
                    return h
                },
                getCategoryFilter: function(a) {
                    var b, c, d = a.length, e = [];
                    for (b = 0; d > b; b++)
                        c = a[b],
                            e = e.concat(c.filter);
                    return e
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = "/v2/util/image_proxy";
            a.addModule("FilterRequest", {
                init: function(b, c, d) {
                    this.sandbox = b,
                        this.frame = c,
                        this.options = d,
                        this.lastImage = {},
                        this.images = {},
                        this.onlyFlags = {},
                        this.callbacks = {},
                        this.filterProxyOrigin = a.util.getAPIHost(d.originType),
                    a.util.isIE10() && this._makeProxyIframe(),
                        this._bindEvent(),
                        this._bindWindowEvent()
                },
                _makeProxyIframe: function() {
                    this.connect = document.createElement("iframe"),
                        this.connect.src = this.filterProxyOrigin + b + "#" + (window.location.origin || window.location.protocol + "//" + window.location.host),
                        this.connect.className = a.HIDE_CLASS,
                        this.frame.appendChild(this.connect)
                },
                _bindEvent: function() {
                    var b = this;
                    this.sandbox.on("filterRequest:get", function(c, d, e, f) {
                        a.util.isIE10() ? b.requestImageByProxy(c, d, e) : b.requestImage(c, d, e, f)
                    }),
                        this.sandbox.on("window:message", this._getDataURI.bind(this))
                },
                requestImage: function(b, c, d, e) {
                    var f;
                    f = d ? this.images[d] = this.images[d] || new Image : new Image,
                        f.onload = function() {
                            c(null , f, [f.naturalWidth, f.naturalHeight]),
                                f.onload = null ,
                                f.onerror = null
                        }
                        ,
                        f.onerror = function(g) {
                            a.util.sendErrorLog("filter_error", "request filter image Error. url : " + b + (e ? ', originalUrl : "' + e + '"' : "") + (c && c.name ? ', callback: "' + c.name + '"' : "") + ", onlyFlag : " + d + ", caused by " + g.message),
                                c(g),
                                f.onload = null ,
                                f.onerror = null
                        }
                        ,
                        f.crossOrigin = "anonymous",
                        f.src = b
                },
                requestImageByProxy: function(a, b, c) {
                    var d = location.protocol + this.filterProxyOrigin;
                    this.onlyFlags[a] = c,
                        this.lastImage[c] = a,
                        this.callbacks[a] = b,
                        this.connect.contentWindow.postMessage(a, d)
                },
                _bindWindowEvent: function() {
                    var b = this;
                    a.event.on(window, "message", function(a) {
                        b.sandbox.emit("window:message", a)
                    })
                },
                _getDataURI: function(b) {
                    var c, d, e;
                    if (this.callbacks[b.data.url]) {
                        c = b.data.url,
                            d = this.callbacks[c],
                            e = this.onlyFlags[c],
                            delete this.callbacks[c],
                            delete this.onlyFlags[c];
                        var f = this
                            , g = location.protocol + this.filterProxyOrigin;
                        if (b.origin === g) {
                            var h = b.data;
                            if (h && h.url === c && (!e || f.lastImage[e] === c) && ("success" === h.state || "error" === h.state)) {
                                var i;
                                i = e ? f.images[e] = f.images[e] || new Image : new Image,
                                    i.onload = function() {
                                        d(null , i, [i.naturalWidth, i.naturalHeight]),
                                            i.onload = null ,
                                            i.onerror = null
                                    }
                                    ,
                                    i.onerror = function(b) {
                                        a.util.sendErrorLog("filter_error", "request filter image Error. url : " + c + (d && d.name ? ', callback: "' + d.name + '"' : "") + ", onlyFlag : " + e) + ", caused by " + b.message,
                                            d(b),
                                            i.onload = null ,
                                            i.onerror = null
                                    }
                                    ,
                                    i.src = h.dataURI
                            }
                        }
                    }
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            a.addModule("FilterList", {
                init: function(b, c, d) {
                    this.options = d,
                        this.prefix = this.options.prefix,
                        this.viewport = d.viewport && d.viewport.preview || "flexible",
                        this.filterListEl = a.$$p(".menu_sub_filter .list_filter")[0],
                        this.bindEvent(b)
                },
                bindEvent: function(a) {
                    var b = this;
                    a.on("filter:initOptions", function(a) {
                        b.filters = a,
                            b.itemWidth = a.itemWidth,
                            b.categoryMargin = a.categoryMargin,
                            b.filterMargin = a.filterMargin,
                            b.wrapperMargin = a.wrapperMargin,
                            b.createFilterList(a)
                    })
                },
                createFilterList: function(a) {
                    var b, c;
                    "category" === a.type ? (c = this.getCategoryListWidth(a.category.length),
                        b = this.getCategoryListHtmlStr(a.category)) : (c = "fixed-width" === this.viewport ? this.getFilterListWidth(a.filter.length) - this.filterMargin : this.getFilterListWidth(a.filter.length) + this.filterMargin,
                        b = this.getFilterListHtmlStr(a.filter)),
                        c += 2 * this.wrapperMargin,
                        this.filterListEl.style.width = c + "px",
                        this.filterListEl.setAttribute("initWidth", c),
                        this.filterListEl.innerHTML = b
                },
                getCategoryListHtmlStr: function(a) {
                    var b, c, d, e, f, g = "";
                    for (c = 0,
                             d = a.length; d > c; c++)
                        b = a[c],
                            e = this.getFilterListWidth(b.filter.length),
                            f = this.getCategoryLeft(c),
                            g += '<li class="' + this.prefix + 'menu_category_item" category="' + b.id + '" filterWidth="' + e + '" categoryLeft="' + f + '">' + this.getCategoryHtmlStr(b) + '<ul class="' + this.prefix + 'list_sub">' + this.getFilterListHtmlStr(b.filter, this.itemWidth + this.categoryMargin) + "</ul></li>";
                    return g
                },
                getFilterListHtmlStr: function(a, b) {
                    var c, d, e, f = "";
                    for (b = b || 0,
                             d = 0,
                             e = a.length; e > d; d++)
                        c = a[d],
                            f += this.getFilterHtmlStr(c, b + this.getFilterLeft(d));
                    return f
                },
                getCategoryLeft: function(a) {
                    return (this.itemWidth + this.categoryMargin) * a
                },
                getCategoryListWidth: function(a) {
                    return (this.itemWidth + this.categoryMargin) * a + this.categoryMargin
                },
                getFilterLeft: function(a) {
                    return (this.itemWidth + this.filterMargin) * a
                },
                getFilterListWidth: function(a) {
                    return (this.itemWidth + this.filterMargin) * a
                },
                getCategoryHtmlStr: function(b) {
                    var c = a.util.htmlEscape(b.label || "")
                        , d = b.id;
                    return '<button type="button" class="' + this.prefix + "btn_item " + this.prefix + 'btn_category" data-click="filter:category:' + d + '"><span class="' + this.prefix + 'inner_btn"><img src="//t1.daumcdn.net/fp/photos/img/icon_default/thumb_category_' + d.toLowerCase() + '.gif" srcset="//t1.daumcdn.net/fp/photos/img/icon_default/thumb_category_' + d.toLowerCase() + '_retina.gif 2x" width="' + this.itemWidth + '" height="' + this.itemWidth + '" class="' + this.prefix + 'img" alt="' + c + '"><span class="' + this.prefix + 'txt_item">' + c.toUpperCase() + '</span></span></button><strong class="' + this.prefix + 'screen_out">' + c + " 효과</strong>"
                },
                getFilterHtmlStr: function(b, c) {
                    var d = a.util.htmlEscape(b.label || "");
                    return '<li class="' + this.prefix + 'menu_filter_item"><button type="button" class="' + this.prefix + 'btn_item" data-click="filter:apply:' + b.id + '" filterLeft="' + c + '"><span class="' + this.prefix + 'inner_btn"><canvas class="' + this.prefix + 'filter_thumb" data-filter="' + b.id + '" width="' + this.itemWidth + '" height="' + this.itemWidth + '" alt="' + d + '"></canvas><span class="' + this.prefix + 'txt_item">' + d + "</span></span></button></li>"
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = a.util.getPrefix(document.body, "transform")
                , c = "unfold"
                , d = "menu_category_item"
                , e = "flexible"
                , f = "fixed-width"
                , g = 400;
            a.addModule("FilterNav", {
                init: function(b, c, d) {
                    this.sandbox = b,
                        this.prefix = d.prefix || "",
                        this.viewport = d.viewport && d.viewport.preview || e,
                        this.wrapper = a.$$p(".menu_sub_filter .list_wrapper")[0],
                        this.filterList = a.$$p(".list_filter")[0],
                        this.prevBtn = a.$$p(".menu_filter_prev")[0],
                        this.nextBtn = a.$$p(".menu_filter_next")[0],
                        this.position = 0,
                        this.filterMargin = 0,
                        this.moveValue = g,
                        this.bindEvent()
                },
                bindEvent: function() {
                    var a = this;
                    this.sandbox.on("filterNav:prev", this.moveToLeft.bind(this)),
                        this.sandbox.on("filterNav:next", this.moveToRight.bind(this)),
                        this.sandbox.on("filterNav:moveToFilter", this.moveToFilterItem.bind(this)),
                        this.sandbox.on("filter:initOptions", function(b) {
                            a.filterMargin = b.filterMargin,
                                a.viewport = "flat" === b.type ? a.viewport : e
                        }),
                        this.sandbox.on("filter:category", function(b) {
                            a.changeCategory("object" == typeof b ? b.args[0] : b)
                        }),
                        this.sandbox.on(["filter:ok", "filter:back"], function() {
                            a.changeCategory()
                        }),
                        this.sandbox.on("mainmenu:filter", function() {
                            a.toggleMoveBtn(),
                                a.move(0)
                        }),
                        this.sandbox.on("frame:resize", function() {
                            a.toggleMoveBtn(),
                                a.move(a.position)
                        })
                },
                moveToFilterItem: function(b, c) {
                    this.categoryFold(),
                        this.categoryUnfold(c);
                    var e = a.$$p("." + d + "[category=" + c + "]", this.filterList)[0]
                        , g = a.$$p('.menu_filter_item .btn_item[data-click="filter:apply:' + b + '"]', this.filterList)[0]
                        , h = 0;
                    if (e && (h += parseInt(e.getAttribute("categoryLeft"))),
                            g)
                        if (this.viewport === f)
                            h = parseInt(g.getAttribute("filterLeft")),
                                this.move(-h);
                        else {
                            h += parseInt(g.getAttribute("filterLeft"));
                            var i = (this.getWrapperWidth() - g.offsetWidth) / 2 - this.filterMargin;
                            this.move(-h + i)
                        }
                },
                moveToLeft: function() {
                    this.move(this.position + this.moveValue)
                },
                moveToRight: function() {
                    this.move(this.position - this.moveValue)
                },
                move: function(c) {
                    var d = parseInt(this.filterList.style.width)
                        , g = this.getWrapperWidth();
                    if (c > 0 || g > d)
                        c = 0;
                    else if (this.viewport === f) {
                        var h = Math.floor(c) % this.moveValue;
                        c -= h,
                        0 > d + c && (c = -1 * this.moveValue * Math.floor(d / this.moveValue))
                    } else
                        this.viewport === e && g > d + c && (c = g - d);
                    var i = a.util.Transform.parse(this.filterList.style[b]);
                    i.translateX = c,
                        i.translateY = 0,
                        this.filterList.style[b] = a.util.Transform.stringify(i),
                        this.position = c,
                        this.toggleMoveBtn()
                },
                changeCategory: function(a) {
                    var b = this.categoryFold();
                    b !== a && this.categoryUnfold(a),
                        this.toggleMoveBtn()
                },
                categoryFold: function() {
                    var b, e = a.$$p("." + d + "." + c, this.filterList)[0];
                    return e ? (e.classList.remove(this.prefix + c),
                        b = a.$$p(".list_sub", e)[0],
                        this.filterList.style.width = this.filterList.getAttribute("initWidth") + "px",
                        b.style.width = "0",
                        this.move(0),
                        e.getAttribute("category")) : ""
                },
                categoryUnfold: function(b) {
                    var e, f, g, h = a.$$p("." + d + "[category=" + b + "]", this.filterList)[0];
                    h && (h.classList.add(this.prefix + c),
                        e = a.$$p(".list_sub", h)[0],
                        f = parseInt(h.getAttribute("filterWidth")),
                        g = parseInt(h.getAttribute("categoryLeft")),
                        this.filterList.style.width = parseInt(this.filterList.getAttribute("initWidth")) + f + "px",
                        e.style.width = f + "px",
                        this.move(-1 * g))
                },
                toggleMoveBtn: function() {
                    var b = this.getWrapperWidth()
                        , c = parseInt(this.filterList.style.width);
                    this.moveValue = this.viewport === e ? g : this.getWrapperWidth() + this.filterMargin,
                        c > b ? (this.prevBtn.classList.remove(a.HIDE_CLASS),
                            this.nextBtn.classList.remove(a.HIDE_CLASS)) : (this.prevBtn.classList.add(a.HIDE_CLASS),
                            this.nextBtn.classList.add(a.HIDE_CLASS)),
                        this.prevBtn.disabled = !1,
                        this.nextBtn.disabled = !1,
                    this.position >= 0 && (this.prevBtn.disabled = !0),
                    this.position + c <= b && (this.nextBtn.disabled = !0)
                },
                getWrapperWidth: function() {
                    return this.wrapper.clientWidth
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = "200x200";
            a.addModule("FilterThumbnail", {
                init: function(b, c, d) {
                    this.sandbox = b,
                        this.prefix = d.prefix || "",
                        this.host = a.util.getAPIHost(d.originType),
                        this.sessionKey = "",
                        this.effectString = "",
                        this.bindEvent()
                },
                bindEvent: function() {
                    var a = this;
                    this.sandbox.on("filter:initOptions", function(b) {
                        a.itemWidth = b.itemWidth,
                            a.itemHeight = b.itemHeight
                    }),
                        this.sandbox.on(["filter:thumbnail:draw", "filter:enter"], function() {
                            a.sandbox.emit("imageManager:currentWithHistory", function(b, c, d) {
                                a.historyData = b;
                                var e = a.createEffectString(b);
                                (a.effectString !== e || a.sessionKey !== d) && (a.effectString = e,
                                    a.sessionKey = d,
                                    a.drawThumbnailAll())
                            })
                        })
                },
                createEffectString: function(a) {
                    return "" + a.brightness + ":" + a.contrast + ":" + a.saturation + ":" + a.warmth + ":" + a.vignette
                },
                drawThumbnailAll: function() {
                    var b, c, d = a.$$p(".list_filter .filter_thumb");
                    for (b = 0,
                             c = d.length; c > b; b++)
                        this.drawThumbnail(d[b], this.sessionKey)
                },
                drawThumbnail: function(c, d) {
                    var e, f, g = c.getAttribute("data-filter"), h = this, i = a.filter.getFilterUrl(this.host, g, d, b);
                    this.sandbox.emit("filterRequest:get", i, function(a, b, d) {
                        a || (e = h.getThumbnailOffset(d[0], d[1]),
                            f = c.getContext("2d"),
                            f.clearRect(0, 0, h.itemWidth, h.itemHeight),
                            f.drawImage(b, e.left, e.top, e.width, e.height, 0, 0, h.itemWidth, h.itemHeight),
                            h.sandbox.emit("paint:thumbnail", h.historyData, c))
                    })
                },
                getThumbnailOffset: function(a, b) {
                    return b >= a ? {
                        left: 0,
                        top: (b - a) / 2,
                        width: a,
                        height: a
                    } : {
                        left: (a - b) / 2,
                        top: 0,
                        width: b,
                        height: b
                    }
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            function b(b, c, d, e) {
                var f, g = 0 === d.status ? "ignore_error" : "filter_error", h = b + ". \nurl : " + c;
                d && (h += ", \nstatus : " + d.status + ", \nstatus_text : " + d.statusText + ", \nresponseURL : " + d.responseURL + ", \nresponse : " + d.responseText);
                for (f in e || {})
                    e.hasOwnProperty(f) && (h += ". \n" + f + " : " + e[f]);
                a.util.sendErrorLog(g, h)
            }
            "object" != typeof a.filter && (a.filter = {});
            var c = "2000x2000"
                , d = 6e4
                , e = 200
                , f = 404;
            a.filter.StaySession = Class.extend({
                init: function(a, b, c, e, f) {
                    this.extendAPIPath = a + "/v2/session/{{session_key}}/extend",
                        this.EXTEND_TIMEOUT = c ? c / 2 * 1e3 : d,
                    b && this.startExtendSession(b, e, f)
                },
                stopExtendSession: function() {
                    window.clearTimeout(this.timeId),
                        this.session_key = null
                },
                isExtendSession: function() {
                    return !!this.session_key
                },
                setKey: function(a) {
                    a && (this.session_key = a)
                },
                getKey: function() {
                    return this.session_key
                },
                delKey: function() {
                    this.session_key = null
                },
                startExtendSession: function(a, b, c) {
                    var d = this;
                    this.setKey(a),
                        this.requestExtendSession(b, c),
                        this.timeId = window.setTimeout(function() {
                            d.challengeCount = 0,
                                d.startExtendSession()
                        }, this.EXTEND_TIMEOUT)
                },
                restartExtendSession: function() {
                    var a = this;
                    this.stopExtendSession(),
                        this.challengeCount > 10 ? this.timeId = window.setTimeout(function() {
                            a.startExtendSession()
                        }, 2e3) : this.delKey()
                },
                requestExtendSession: function(c, g) {
                    if (this.session_key) {
                        var h = this
                            , i = h.extendAPIPath.replace("{{session_key}}", this.session_key);
                        this.challengeCount += 1,
                            this.ajax = new a.Ajax({
                                url: i,
                                header: {}
                            }).onSuccess(function(a) {
                                var f = a.responseText;
                                "string" == typeof f && (f = JSON.parse(f)),
                                    a.status === e ? (h.challengeCount = 0,
                                        h.EXTEND_TIMEOUT = f.ttl ? f.ttl / 2 * 1e3 : d,
                                    c && c(f)) : (b("extend session error : STATUS_NOT_OK", i, a, {
                                        session_key: h.session_key
                                    }),
                                        h.restartExtendSession())
                            }).onError(function(a) {
                                b("extend session error", i, a, {
                                    session_key: h.session_key
                                }),
                                    a.status === f ? (h.stopExtendSession(),
                                    g && g(a)) : (console.log("request extend session error", a),
                                        h.restartExtendSession())
                            }).send()
                    }
                }
            }),
                a.filter.getFilterUrl = function(a, b, d, e) {
                    var f = a + "/v2/session/{{session_key}}/filter"
                        , g = b && "OR00" !== b ? "?script=;S:" + b : "";
                    return f.replace("{{session_key}}", d) + "/" + (e || c) + g
                }
                ,
                a.filter.getServerFilterList = function(c, d) {
                    var f = c + "/v2/filters";
                    new a.Ajax({
                        url: f,
                        time: 5e3,
                        header: {}
                    }).onSuccess(function(a) {
                        var c = a.responseText;
                        "string" == typeof c && (c = JSON.parse(c)),
                            a.status === e ? d(c.filters) : (b("get server filter list error : STATUS_NOT_OK", f, a),
                                console.log(c))
                    }).onError(function(a) {
                        b("get server filter list error", f, a),
                            console.log("get server filter list error", a)
                    }).onTimeout(function(a) {
                        b("get server filter list timeout", f, a),
                            console.log("get server filter list timeout", a)
                    }).send()
                }
                ,
                a.filter.sessionStart = function(c, d, e, f) {
                    var g = "tenth2";
                    "kakao" === c && (g = "kage^http://up.api1.kage.kakao.com/up/story-img/^http://dn.api1.kage.kakao.com/dn/");
                    var h = a.util.getImageId(c, e)
                        , i = d + "/v2/session/start";
                    new a.Ajax({
                        url: i,
                        method: "get",
                        query: "type=" + encodeURIComponent(g) + "&image_id=" + encodeURIComponent(h),
                        time: 2e4,
                        header: {}
                    }).onSuccess(function(a) {
                        var b = a.responseText;
                        "string" == typeof b && (b = JSON.parse(b)),
                        "function" == typeof f && f(b)
                    }).onError(function(a) {
                        b("session start error", i, a, {
                            type: g,
                            image_id: h
                        }),
                            console.log("session start error", a)
                    }).onTimeout(function(a) {
                        b("session start timeout", i, a, {
                            type: g,
                            image_id: h
                        }),
                            console.log("session start timeout", a)
                    }).send()
                }
                ,
                a.filter.sessionEnd = function(b, c) {
                    c && new a.Ajax({
                        url: b + "/v2/session/" + c + "/end",
                        method: "get",
                        time: 2e3,
                        header: {}
                    }).onSuccess(function(a) {}).onError(function(a) {}).send()
                }
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = a.effect = a.effect || {};
            b.view = Class.extend({
                init: function(b, c, d) {
                    this.effectName = this.effectName || "effect",
                        this.offliveApply = this.offliveApply || !1,
                        this.sandbox = b,
                        this.prefix = d.prefix || "",
                        this.historyData = null ,
                        this.state = a.$$p(".menu_btn_" + this.effectName, c)[0],
                        this.bindEvent()
                },
                bindEvent: function() {
                    var b = this;
                    this.sandbox.on("editor:change", function() {
                        b.initValue()
                    }),
                        this.sandbox.on(this.effectName + ":enter", function() {
                            b.initSlider(),
                                b.initValue()
                        }),
                        this.sandbox.on("frame:resize", function(a, c) {
                            b.slider && b.slider.resize()
                        }),
                        this.sandbox.on(this.effectName + ":ok", function() {
                            a.tiara.sendLog(a.tiara.OK, b.effectName, b.historyData[b.effectName] ? a.tiara.USE : a.tiara.NOTUSE),
                            0 === b.historyData[b.effectName] && (b.historyData[b.effectName] = null ),
                                b.sandbox.emit("history:add", b.historyData),
                                b.historyData = null
                        }),
                        this.sandbox.on(this.effectName + ":back", function() {
                            b.historyData = null
                        }),
                        this.sandbox.on("history:change", function(a) {
                            b.setState(a && a[b.effectName])
                        })
                },
                initSlider: function() {
                    if (!this.slider) {
                        var b = this;
                        this.slider = new a.util.effectSlider(this.effectName).on("end", function(a) {
                            b.historyData && (b.historyData[b.effectName] = a,
                                b.sandbox.emit("paint:preview", b.historyData))
                        }),
                            this.slider.on("start", function() {
                                b.sandbox.emit("paint:showFake", b.historyData)
                            }).on("move", function(a) {
                                b.historyData && (b.historyData[b.effectName] = a,
                                    b.sandbox.emit("paint:fakeCanvas", b.historyData))
                            })
                    }
                },
                initValue: function() {
                    var a = this;
                    this.sandbox.emit("history:current", function(b) {
                        a.slider && a.slider.setCurrent(b[a.effectName]),
                            a.historyData = b
                    })
                },
                setState: function(a) {
                    a && 0 !== parseInt(a) ? this.state.classList.add(this.prefix + "state_item") : this.state.classList.remove(this.prefix + "state_item")
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            a.effect = a.effect || {};
            var b = "brightness";
            a.addModule("Brightness", a.effect.view.extend({
                init: function(a, c, d) {
                    this.effectName = b,
                        this._super(a, c, d)
                }
            }))
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            a.effect = a.effect || {};
            var b = "contrast";
            a.addModule("Contrast", a.effect.view.extend({
                init: function(a, c, d) {
                    this.effectName = b,
                        this._super(a, c, d)
                },
                initSlider: function() {
                    if (!this.slider) {
                        var b = this;
                        this.slider = new a.util.effectSlider(this.effectName).on("end", function(a) {
                            var c = 0 > a ? Math.floor(a / 2) : a;
                            b.historyData && (b.historyData[b.effectName] = c,
                                b.sandbox.emit("paint:preview", b.historyData))
                        }),
                            this.slider.on("start", function() {
                                b.sandbox.emit("paint:showFake", b.historyData)
                            }).on("move", function(a) {
                                var c = 0 > a ? Math.floor(a / 2) : a;
                                b.historyData && (b.historyData[b.effectName] = c,
                                    b.sandbox.emit("paint:fakeCanvas", b.historyData))
                            })
                    }
                }
            }))
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            a.effect = a.effect || {};
            var b = "saturation";
            a.addModule("Saturation", a.effect.view.extend({
                init: function(a, c, d) {
                    this.effectName = b,
                        this._super(a, c, d)
                }
            }))
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            a.effect = a.effect || {};
            var b = "warmth";
            a.addModule("Warmth", a.effect.view.extend({
                init: function(a, c, d) {
                    this.effectName = b,
                        this._super(a, c, d)
                }
            }))
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = 75
                , c = 75
                , d = 0
                , e = "state_item";
            a.addModule("Focus", {
                init: function(b, c, d) {
                    this.effectName = "focus",
                        this.sandbox = b,
                        this.frame = c,
                        this.options = d,
                        this.prefix = d.prefix || "",
                        this.state = a.$$p(".menu_sub_effect .menu_btn_focus")[0],
                        this.noScaleWrapper = a.$$p(".preview_noscale_wrapper")[0],
                        this.container = a.$$p(".preview_focus_layer")[0],
                        this.canvas = a.$$p(".preview_canvas")[0],
                        this.originalBtn = a.$$p(".sub_detail_focus .btn_origin")[0],
                        this.circleBtn = a.$$p(".sub_detail_focus .btn_circle")[0],
                        this.linearBtn = a.$$p(".sub_detail_focus .btn_line")[0],
                        this.resized = !1,
                        this.bindEvent(),
                        this.bindExternalEvent()
                },
                bindEvent: function() {
                    var b = this;
                    this.sandbox.on("focus:enter", function() {
                        b.sandbox.emit("history:current", function(c) {
                            b.initFocusData(c),
                                b.changePreviewScale(),
                                b.selectTypeBtn(b.historyData.focus.type),
                                b.sandbox.on("preview:animate:end", function d() {
                                    b.sandbox.off("preview:animate:end", d),
                                        b.initFocusView(),
                                        b.container.classList.remove(a.HIDE_CLASS)
                                })
                        }),
                            b.noScaleWrapper.classList.add(a.HIDE_CLASS)
                    }),
                        this.sandbox.on("focus:back", this.cancel.bind(this)),
                        this.sandbox.on("focus:ok", this.apply.bind(this)),
                        this.sandbox.on("focus:circle", this.onClickTypeBtn.bind(this, "circle")),
                        this.sandbox.on("focus:linear", this.onClickTypeBtn.bind(this, "linear")),
                        this.sandbox.on("focus:original", function() {
                            b.selectTypeBtn("original"),
                                b.historyData.focus = null ,
                                b.focusView.clear(),
                                b.render()
                        })
                },
                bindExternalEvent: function() {
                    var b = this;
                    this.sandbox.on("frame:resize", function() {
                        b.focusView && !b.container.classList.contains(a.HIDE_CLASS) && b.sandbox.on("preview:animate:end", function c() {
                            b.sandbox.off("preview:animate:end", c),
                                b.focusView.onResize(),
                                b.focusView.render(b.historyData.focus)
                        })
                    }),
                        this.sandbox.on("history:change", function(a) {
                            b.setState(a && a[b.effectName])
                        }),
                        this.sandbox.on("paint:resize", function() {
                            b.resized = !0
                        }),
                        this.sandbox.on("preview:onload", function(a) {
                            b.orgCanvasSize = a
                        })
                },
                initFocusView: function() {
                    var b = this;
                    this.focusView || (this.focusView = new a.effect.FocusView({
                        wrapper: a.$$p(".preview_wrapper")[0],
                        preview: this.canvas,
                        container: this.container,
                        imagePath: a.util.getImagePath(this.options.originType)
                    }),
                        this.focusView.on("start", function(a) {
                            b.historyData.focus = null ,
                                b.changePosEtoO(),
                                b.render()
                        }),
                        this.focusView.on("end", function(a) {
                            b.historyData.focus = a,
                                b.changePosEtoO(),
                                b.render()
                        })),
                        this.focusView.onResize(),
                        this.focusView.render(b.historyData.focus),
                        this.render()
                },
                initFocusData: function(a) {
                    this.historyData = a || {},
                        this.historyData.focus ? this.resized && (this.resized = !1) : this.resetFocusData("circle"),
                        this.changePosOtoE()
                },
                resetFocusData: function(a) {
                    this.historyData.focus = {
                        cx: this.canvas.width / 2,
                        cy: this.canvas.height / 2,
                        radius: c,
                        thickness: b,
                        angle: d,
                        degree: d,
                        type: a,
                        ocx: this.orgCanvasSize.w / 2,
                        ocy: this.orgCanvasSize.h / 2,
                        oangle: d,
                        odegree: d
                    }
                },
                changePreviewScale: function() {
                    this.sandbox.emit("mode:change", {
                        previewAlign: !0,
                        magnifierEnable: !1,
                        previewDraggable: !1,
                        customPadding: [0, 160]
                    })
                },
                onClickTypeBtn: function(a) {
                    this.selectTypeBtn(a),
                        this.resetFocusData(a),
                        this.focusView.render(this.historyData.focus),
                        this.changePosEtoO(),
                        this.render()
                },
                selectTypeBtn: function(a) {
                    var b = this.prefix + "on";
                    this.circleBtn.classList.remove(b),
                        this.linearBtn.classList.remove(b),
                        this.originalBtn.classList.remove(b),
                        "original" === a ? this.originalBtn.classList.add(b) : "linear" === a ? this.linearBtn.classList.add(b) : this.circleBtn.classList.add(b)
                },
                render: function() {
                    this.sandbox.emit("paint:preview", this.historyData)
                },
                cancel: function() {
                    this.clear()
                },
                apply: function() {
                    a.tiara.sendLog(a.tiara.OK, "focus", this.historyData.focus ? this.historyData.focus.type : a.tiara.NOTUSE),
                        this.changePosEtoO(),
                        this.sandbox.emit("history:add", this.historyData),
                        this.clear()
                },
                clear: function() {
                    this.historyData = null ,
                        this.container.classList.add(a.HIDE_CLASS),
                        this.noScaleWrapper.classList.remove(a.HIDE_CLASS),
                        this.sandbox.emit("mode:change", {
                            previewAlign: !0,
                            magnifierEnable: !0,
                            previewDraggable: !0
                        })
                },
                setState: function(a) {
                    this.state.classList[a ? "add" : "remove"](this.prefix + e)
                },
                changePosEtoO: function() {
                    if (this.historyData.focus) {
                        var b = this.historyData.focus.degree || d
                            , c = this.historyData.focus.cx
                            , e = this.historyData.focus.cy
                            , f = a.edit.size.convertEtoO(c, e);
                        if (f = a.edit.crop.convertEtoO(f.x, f.y),
                                this.historyData.focus.ocx = f.x,
                                this.historyData.focus.ocy = f.y,
                                this.historyData.crop) {
                            var g = this.getCropAngle(this.historyData.crop);
                            this.isReversed(this.historyData.crop) && (b = this.reverse(b)),
                                this.historyData.focus.odegree = b - g
                        } else
                            this.historyData.focus.odegree = b;
                        this.historyData.focus.oangle = a.util.degree2radian(this.historyData.focus.odegree)
                    }
                },
                changePosOtoE: function() {
                    if (this.historyData.focus) {
                        var b = this.historyData.focus.odegree || d
                            , c = this.historyData.focus.ocx
                            , e = this.historyData.focus.ocy
                            , f = a.edit.crop.convertOtoE(c, e);
                        if (f = a.edit.size.convertOtoE(f.x, f.y),
                                this.historyData.focus.cx = f.x,
                                this.historyData.focus.cy = f.y,
                            this.historyData.crop && a.util.isNumeric(this.historyData.focus.degree)) {
                            var g = this.getCropAngle(this.historyData.crop);
                            this.isReversed(this.historyData.crop) && (b = this.reverse(b),
                                g = -1 * g),
                                this.historyData.focus.degree = b + g
                        } else
                            this.historyData.focus.degree = b;
                        this.historyData.focus.angle = a.util.degree2radian(this.historyData.focus.degree)
                    }
                },
                isReversed: function(a) {
                    return a.flipV + a.flipH === 1
                },
                reverse: function(a) {
                    var b = Math.floor(a / 180)
                        , c = a % 180;
                    return 180 * b + (180 - c)
                },
                getCropAngle: function(a) {
                    return 90 * a.rotate + a.angle % 360
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = 6e3
                , c = 50;
            a.effect || (a.effect = {});
            a.effect.FocusView = Observer.extend({
                init: function(b) {
                    this.wrapper = b.wrapper,
                        this.preview = b.preview,
                        this.container = b.container,
                        this.TRANSFORM_NAME = a.util.getPrefix(this.preview, "transform"),
                        this.RADIUS_DEFAULT = 75,
                        this.defineMouseEvent(),
                        this.definePoints(b.imagePath),
                        this.offset = this.getOffsetOfPreview()
                },
                onResize: function() {
                    this.offset = this.getOffsetOfPreview()
                },
                drawFocusArea: function() {
                    var a = this.preview.width
                        , b = this.preview.height;
                    this.container.width = a,
                        this.container.height = b;
                    this.container.getContext("2d");
                    this.getScale(),
                        this.drawBackground(a, b),
                        this.clearfocusArea()
                },
                drawBackground: function(a, b, c) {
                    var d = this.container.getContext("2d");
                    d.clearRect(0, 0, a, b),
                    c || (d.save(),
                        d.rect(0, 0, a, b),
                        d.fillStyle = "rgba(26,26,26,0.1)",
                        d.fill(),
                        d.restore(),
                        d.save(),
                        d.rect(0, 0, a, b),
                        d.fillStyle = "rgba(255,255,255,0.1)",
                        d.fill(),
                        d.restore())
                },
                clearfocusArea: function() {
                    var a = this.data;
                    "linear" === a.type ? this.clearLinearFocusArea() : this.clearCircleFocusArea()
                },
                clearLinearFocusArea: function() {
                    var a = this.data
                        , c = this.container.getContext("2d")
                        , d = b
                        , e = 2 * a.radius + a.thickness
                        , f = a.cx - (d >> 1)
                        , g = a.cy - (e >> 1);
                    c.save(),
                        c.translate(a.cx, a.cy),
                        c.rotate(a.angle),
                        c.translate(-a.cx, -a.cy),
                        c.clearRect(f, g, d, e),
                        c.restore()
                },
                clearCircleFocusArea: function() {
                    var a = this.data
                        , b = this.container.getContext("2d")
                        , c = a.radius + a.thickness / 2;
                    b.save(),
                        b.globalCompositeOperation = "destination-out",
                        b.beginPath(),
                        b.arc(a.cx, a.cy, c, 0, 2 * Math.PI, !1),
                        b.fillStyle = "#ffffff",
                        b.fill(),
                        b.restore()
                },
                drawFocusBorder: function() {
                    var a = this.data;
                    "linear" === a.type ? this.drawLinearBorderFocusArea() : this.drawCircleBorderFocusArea()
                },
                drawLinearBorderFocusArea: function() {
                    var a = this.data
                        , c = this.container.getContext("2d")
                        , d = this.scale
                        , e = b
                        , f = 2 * a.radius + a.thickness
                        , g = a.cx - (e >> 1)
                        , h = a.cy - (f >> 1);
                    c.save(),
                        c.translate(a.cx, a.cy),
                        c.rotate(a.angle),
                        c.translate(-a.cx, -a.cy),
                        c.beginPath(),
                        c.rect(g, h, e, f),
                        c.strokeStyle = "#ffffff",
                        c.lineWidth = 2 / d,
                        c.stroke(),
                        c.restore()
                },
                drawCircleBorderFocusArea: function() {
                    var a = this.data
                        , b = this.container.getContext("2d")
                        , c = a.radius + a.thickness / 2
                        , d = this.scale;
                    b.save(),
                        b.beginPath(),
                        b.arc(a.cx, a.cy, c, 0, 2 * Math.PI, !1),
                        b.strokeStyle = "#ffffff",
                        b.lineWidth = 2 / d,
                        b.stroke(),
                        b.restore()
                },
                render: function(a) {
                    this.data = a,
                        this.drawFocusArea(),
                        this.drawFocusBorder(),
                        this.offMouseEvent(),
                        this.onMouseEvent()
                },
                clear: function() {
                    this.data = null ,
                        this.removeFocusBackground(),
                        this.offMouseEvent()
                },
                removeFocusBackground: function() {
                    var a = this.container.getContext("2d");
                    a.clearRect(0, 0, this.container.width, this.container.height)
                },
                definePoints: function(a) {
                    this.movePoint = document.createElement("canvas"),
                        this.getImage(a + "icon_default/cursor_move_shdw.png", this.movePoint),
                        this.resizePoint = document.createElement("canvas"),
                        this.getImage(a + "icon_default/cursor_tb_shdw.png", this.resizePoint),
                        this.rotatePoint = document.createElement("canvas"),
                        this.getImage(a + "icon_default/cursor_out_b_shdw.png", this.rotatePoint)
                },
                getImage: function(b, c) {
                    a.util.loadImage(b, function(a, b, d) {
                        if (a)
                            return void console.error(a);
                        c.width = d[0],
                            c.height = d[1];
                        var e = c.getContext("2d");
                        e.drawImage(b, 0, 0, c.width, c.height)
                    })
                },
                defineMouseEvent: function() {
                    var b = this;
                    this.onmousedown = function(c) {
                        b.startCoord = b.getCoordInfo(c),
                            b.startData = {},
                            b.startData.cx = b.data.cx,
                            b.startData.cy = b.data.cy,
                            b.startData.radius = b.data.radius,
                            b.startData.degree = b.data.degree,
                            a.event.off(b.container, a.EVENT_NAME.MOVE, b.onrefreshicon),
                            a.event.on(document, a.EVENT_NAME.MOVE, b.onmousemove),
                            a.event.on(document, a.EVENT_NAME.END, b.onmouseup),
                            b.emit("start", b.data),
                        b.removeTimer && (clearTimeout(b.removeTimer),
                            b.removeTimer = null )
                    }
                        ,
                        this.onmouseup = function(c) {
                            b.startCoord = null ,
                                b.startData = null ,
                                a.event.off(document, a.EVENT_NAME.MOVE, b.onmousemove),
                                a.event.off(document, a.EVENT_NAME.END, b.onmouseup),
                                a.event.on(b.container, a.EVENT_NAME.MOVE, b.onrefreshicon),
                                b.emit("end", b.data),
                            b.removeTimer || (b.removeTimer = setTimeout(function() {
                                var a = b.getCoordInfo(c);
                                b.redrawNoBorderFocus(a)
                            }, 1e3))
                        }
                        ,
                        this.onmousemove = function(a) {
                            var c = b.getCoordInfo(a);
                            0 === b.offsetType ? b.moveFocus(c) : 1 === b.offsetType ? b.resizeFocus(c) : "linear" === b.data.type && b.rotateFocus(c),
                                b.emit("move", b.data),
                            b.removeTimer && (clearTimeout(b.removeTimer),
                                b.removeTimer = null )
                        }
                        ,
                        this.offsetType = 2,
                        this.onrefreshicon = function(a) {
                            var c = b.getCoordInfo(a);
                            b.offsetType = b.getIntersection(c),
                                b.changePointIcon(b.offsetType, c)
                        }
                },
                getScale: function() {
                    this.scale = this.container.parentNode.getAttribute("data-optimize-scale")
                },
                onMouseEvent: function() {
                    this.getScale(),
                        a.event.on(this.container, a.EVENT_NAME.MOVE, this.onrefreshicon),
                        a.event.on(this.container, a.EVENT_NAME.START, this.onmousedown)
                },
                offMouseEvent: function() {
                    a.event.off(this.container, a.EVENT_NAME.MOVE, this.onrefreshicon),
                        a.event.off(this.container, a.EVENT_NAME.START, this.onmousedown)
                },
                getMousePosition: function(a) {
                    var b = (this.getX(a),
                        this.getY(a),
                        this.correctOffset());
                    return {
                        x: this.getX(a) - b.left,
                        y: this.getY(a) - b.top
                    }
                },
                correctCoord: function(a) {
                    return {
                        x: a.x / this.scale,
                        y: a.y / this.scale
                    }
                },
                correctOffset: function() {
                    var a = this.container.width
                        , b = this.container.height
                        , c = this.offset.left + a / 2
                        , d = this.offset.top + b / 2;
                    return {
                        left: c - a / 2 * this.scale,
                        top: d - b / 2 * this.scale
                    }
                },
                getOffsetOfPreview: function() {
                    var b = a.util.getOffset(this.wrapper)
                        , c = a.util.Transform.parse(this.wrapper.style[this.TRANSFORM_NAME]);
                    return {
                        left: b.left + c.translateX,
                        top: b.top + c.translateY
                    }
                },
                getX: function(a) {
                    var b = a.touches ? a.touches[0] : a;
                    return TouchEvent && b instanceof TouchEvent && (b = b.changedTouches[0]),
                    b.pageX || b.clientX
                },
                getY: function(a) {
                    var b = a.touches ? a.touches[0] : a;
                    return TouchEvent && b instanceof TouchEvent && (b = b.changedTouches[0]),
                    b.pageY || b.clientY
                },
                getCoordInfo: function(b) {
                    var c = this.correctCoord(this.getMousePosition(b))
                        , d = c.x - this.data.cx
                        , e = c.y - this.data.cy
                        , f = Math.atan(d / e)
                        , g = a.util.radian2degree(f);
                    return g = 0 > e ? 270 - g : 90 - g,
                        c.degree = g,
                        c
                },
                getIntersection: function(a) {
                    var b, c = a.x, d = a.y, e = this.data, f = e.radius + e.thickness / 2, g = 10 / this.scale;
                    if ("linear" === e.type) {
                        var h = 2 * Math.PI - e.angle;
                        return b = 0 | Math.abs(-Math.sin(h) * (e.cx - c) + Math.cos(h) * (d - e.cy)),
                            f - g > b ? 0 : b > f + g ? 2 : 1
                    }
                    return b = (e.cx - c) * (e.cx - c) + (e.cy - d) * (e.cy - d),
                        (f - g) * (f - g) > b ? 0 : b > (f + g) * (f + g) ? 2 : 1
                },
                changePointIcon: function(a, b) {
                    this.drawBackground(this.container.width, this.container.height),
                        this.clearfocusArea(),
                        this.drawFocusBorder(),
                        0 === a ? this.drawMovePoint() : 1 === a ? this.drawResizePoint(b) : "linear" === this.data.type && this.drawRotatePoint(b)
                },
                drawMovePoint: function() {
                    var a = this.container.getContext("2d")
                        , b = this.data.cx - this.movePoint.width / (2 * this.scale)
                        , c = this.data.cy - this.movePoint.height / (2 * this.scale)
                        , d = this.movePoint.width / this.scale
                        , e = this.movePoint.height / this.scale;
                    a.drawImage(this.movePoint, b, c, d, e)
                },
                drawResizePoint: function(a) {
                    var b, c, d, e, f, g = this.data, h = this.container.getContext("2d"), i = g.radius + g.thickness / 2, j = this.resizePoint.width / this.scale, k = this.resizePoint.height / this.scale;
                    if ("linear" === g.type) {
                        f = g.angle;
                        var l = 2 * Math.PI - f
                            , m = -Math.sin(l) * (g.cx - a.x) + Math.cos(l) * (a.y - g.cy) | 0;
                        0 > m ? (d = i * Math.cos(f + 1.5 * Math.PI) + g.cx,
                            e = i * Math.sin(f + 1.5 * Math.PI) + g.cy) : (d = i * Math.cos(f + .5 * Math.PI) + g.cx,
                            e = i * Math.sin(f + .5 * Math.PI) + g.cy),
                            b = d - j / 2,
                            c = e - k / 2
                    } else
                        d = i * Math.cos(Math.PI / 180 * a.degree) + g.cx,
                            e = i * Math.sin(Math.PI / 180 * a.degree) + g.cy,
                            b = d - j / 2,
                            c = e - k / 2,
                            f = Math.PI / 180 * (a.degree + 90);
                    h.save(),
                        h.translate(d, e),
                        h.rotate(f),
                        h.translate(-d, -e),
                        h.drawImage(this.resizePoint, b, c, j, k),
                        h.restore()
                },
                drawRotatePoint: function(a) {
                    var b, c, d, e, f, g = this.data, h = this.container.getContext("2d"), i = this.rotatePoint.width / this.scale, j = this.rotatePoint.height / this.scale, k = 100, l = g.radius + g.thickness / 2 + k, m = g.angle, n = 2 * Math.PI - m, o = -Math.sin(n) * (g.cx - a.x) + Math.cos(n) * (a.y - g.cy) | 0;
                    h.save(),
                        0 > o ? (b = l * Math.cos(m + 1.5 * Math.PI) + g.cx,
                            c = l * Math.sin(m + 1.5 * Math.PI) + g.cy,
                            f = m + Math.PI) : (b = l * Math.cos(m + .5 * Math.PI) + g.cx,
                            c = l * Math.sin(m + .5 * Math.PI) + g.cy,
                            f = m),
                        d = b - i / 2,
                        e = c - j / 2,
                        h.translate(b, c),
                        h.rotate(f),
                        h.translate(-b, -c),
                        h.drawImage(this.rotatePoint, d, e, i, j),
                        h.restore()
                },
                moveFocus: function(a) {
                    var b = this.startData.cx + a.x - this.startCoord.x
                        , c = this.startData.cy + a.y - this.startCoord.y;
                    this.data.cx = b,
                        this.data.cy = c,
                        this.drawBackground(this.container.width, this.container.height),
                        this.clearfocusArea(),
                        this.drawFocusBorder(),
                        this.drawMovePoint()
                },
                resizeFocus: function(a) {
                    var b = this.data
                        , d = (a.x - this.startCoord.x,
                    a.y - this.startCoord.y,
                        Math.sqrt((this.startCoord.x - b.cx) * (this.startCoord.x - b.cx) + (this.startCoord.y - b.cy) * (this.startCoord.y - b.cy)))
                        , e = Math.sqrt((a.x - b.cx) * (a.x - b.cx) + (a.y - b.cy) * (a.y - b.cy));
                    this.data.radius = Math.max(this.startData.radius + e - d, c),
                        this.drawBackground(this.container.width, this.container.height),
                        this.clearfocusArea(),
                        this.drawFocusBorder(),
                        this.drawResizePoint(a)
                },
                rotateFocus: function(b) {
                    var c = (this.startData.degree + b.degree - this.startCoord.degree + 360) % 360
                        , d = a.util.degree2radian(c);
                    this.data.angle = d,
                        this.data.degree = c,
                        this.drawBackground(this.container.width, this.container.height),
                        this.clearfocusArea(),
                        this.drawFocusBorder(),
                        this.drawRotatePoint(b)
                },
                redrawNoBorderFocus: function(a) {
                    this.drawBackground(this.container.width, this.container.height, !0),
                        this.clearfocusArea()
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            a.effect = a.effect || {};
            var b = "vignette";
            a.addModule("Vignette", a.effect.view.extend({
                init: function(a, c, d) {
                    this.effectName = b,
                        this._super(a, c, d)
                }
            }))
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = ["brightness", "contrast", "saturation", "warmth", "focus"]
                , c = "select_"
                , d = "state_item";
            a.addModule("EffectAll", {
                init: function(b, c, d) {
                    this.sandbox = b,
                        this.options = d,
                        this.prefix = d.prefix || "",
                        this.effectFrame = a.$$p(".sub_detail_effect_all")[0],
                        this.selectEffect = "",
                        this.overlay = a.$$p(".tools_effect_all", c)[0],
                        this.originCanvas = a.$$p(".preview_canvas_origin", c)[0],
                        this.initEffectButton(),
                        this.bindSandboxEvent()
                },
                initEffectButton: function() {
                    var c, d, e;
                    for (this.effectButton = {},
                             c = 0,
                             d = b.length; d > c; c++)
                        e = b[c],
                            this.effectButton[e] = a.$$p(".list_effect_all .menu_btn_" + e)[0]
                },
                bindSandboxEvent: function() {
                    var b = this;
                    this.sandbox.on("editor:change", function() {
                        b.initValue()
                    }),
                        this.sandbox.on("effectAll:enter", function() {
                            b.initSlider(),
                                b.initValue(),
                                b.sandbox.emit("paint:origin"),
                                b.overlay.classList.remove(a.HIDE_CLASS)
                        }),
                        this.sandbox.on("effectAll:ok", function() {
                            b.applyChanges(),
                                b.reset(),
                                b.overlay.classList.add(a.HIDE_CLASS)
                        }),
                        this.sandbox.on("effectAll:back", function() {
                            b.reset(),
                                b.overlay.classList.add(a.HIDE_CLASS)
                        }),
                        this.sandbox.on("effect", function(a) {
                            b.toggleEffect(a.args[0])
                        }),
                        this.sandbox.on("frame:resize", function(a, c) {
                            if (b.slider)
                                for (var d in b.slider || {})
                                    b.slider[d].resize()
                        }),
                        this.sandbox.on("history:change", function(a) {
                            b.setState(a)
                        }),
                        a.event.on(this.overlay, a.EVENT_NAME.START, this._onMouseDown.bind(this))
                },
                _onMouseDown: function(b) {
                    this.originCanvas.classList.remove(a.HIDE_CLASS),
                        a.event.on(window, a.EVENT_NAME.END, this._onMouseUp.bind(this))
                },
                _onMouseUp: function(b) {
                    this.originCanvas.classList.add(a.HIDE_CLASS),
                        a.event.off(window, a.EVENT_NAME.END, this._onMouseUp.bind(this))
                },
                initSlider: function() {
                    if (!this.slider) {
                        var a, c, d;
                        for (this.slider = {},
                                 a = 0,
                                 c = b.length; c > a; a++)
                            d = b[a],
                                this.slider[d] = this.getEffectSlider(d)
                    }
                },
                getEffectSlider: function(b) {
                    var c = a.$$p(".sub_detail_effect_all .effect_slider .slider_" + b)[0]
                        , d = this
                        , e = {
                        brightness: "밝기",
                        contrast: "대비",
                        saturation: "채도",
                        warmth: "색온도",
                        blur: "블러"
                    }
                        , f = a.Slider.extend({
                        _setInputValue: function(a) {
                            a > 0 && (a = "+" + a),
                                this.emit("set:value", e[b] + " " + a),
                                this.inputEl.setAttribute("value", a)
                        }
                    })
                        , g = new f(c).on("start", function() {
                        d.sliderStart(b)
                    }).on("move", function(a) {
                        d.sliderMove(b, a)
                    }).on("end", function(a) {
                        d.sliderEnd(b, a)
                    });
                    return g
                },
                sliderStart: function(a) {
                    this.sandbox.emit("paint:showFake", this.historyData)
                },
                sliderMove: function(a, b) {
                    this.historyData && ("contrast" === a && (b = 0 > b ? Math.floor(b / 2) : b),
                        this.historyData[a] = b,
                        this.sandbox.emit("paint:fakeCanvas", this.historyData),
                        this.setState(this.historyData))
                },
                sliderEnd: function(a, b) {
                    this.historyData && ("contrast" === a && (b = 0 > b ? Math.floor(b / 2) : b),
                        this.historyData[a] = b,
                        this.sandbox.emit("paint:preview", this.historyData),
                        this.setState(this.historyData))
                },
                initValue: function() {
                    var a, b = this;
                    this.sandbox.emit("history:current", function(c) {
                        b.historyData = c;
                        for (a in b.slider || {})
                            b.slider[a].setCurrent(c[a]);
                        b.setState(c)
                    })
                },
                toggleEffect: function(a, b) {
                    this.effectFrame.classList.remove(this.prefix + c + this.selectEffect),
                        a && (b || a !== this.selectEffect) ? (this.effectFrame.classList.add(this.prefix + c + a),
                            this.selectEffect = a) : this.selectEffect = ""
                },
                setState: function(a) {
                    var c, e, f, g;
                    for (c = 0,
                             e = b.length; e > c; c++)
                        f = b[c],
                            g = this.effectButton[f],
                        g && (a[f] && 0 !== a[f] ? g.classList.add(this.prefix + d) : g.classList.remove(this.prefix + d))
                },
                applyChanges: function() {
                    var a, c, d, e = "";
                    for (a = 0,
                             c = b.length; c > a; a++)
                        d = b[a],
                        0 === this.historyData[d] && (this.historyData[d] = null ),
                            e += this.historyData[d] ? d.charAt(0) : "";
                    this.sandbox.emit("history:add", this.historyData),
                        this.historyData = null
                },
                reset: function() {
                    this.toggleEffect(null )
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            function b(a) {
                var b = []
                    , d = a.data
                    , e = a.width
                    , f = a.height
                    , g = d.length / (e * f)
                    , l = c(d, e, f, g);
                return b[0] = h(l, e, f),
                    b[1] = j(d, l, e, f, g),
                    b[2] = i(d, e, f, g),
                    b[3] = k(d, l, e, f, g),
                    b
            }
            function c(a, b, c, d) {
                var e, f, g = b * c * d, h = [];
                for (e = 0,
                         f = 0; g > e; e += d,
                         f++)
                    h[f] = 4897 * a[e] + 9617 * a[e + 1] + 1868 * a[e + 2] >> 14;
                return h
            }
            function d(a, b, c) {
                var d, e = [], f = b * c;
                for (d = 0; 256 > d; d++)
                    e[d] = 0;
                for (d = 0; f > d; d++)
                    e[a[d]]++;
                return e
            }
            function e(a, b, c) {
                return c >= b ? b >= a ? a : b : c >= a ? a : c
            }
            function f(a, b, c) {
                return b >= c ? a >= b ? a : b : a >= c ? a : c
            }
            function g(a, b, c, d) {
                var g, h, i, j, k = b * c * d, l = [];
                for (i = 0,
                         j = 0; k > i; i += d,
                         j++)
                    g = e(a[i], a[i + 1], a[i + 2]),
                        h = f(a[i], a[i + 1], a[i + 2]),
                        0 === h || 255 !== a[i + 3] ? l[j] = 0 : l[j] = (h - g) / h;
                return l
            }
            function h(a, b, c) {
                var e, f, g, h, i = 0, j = 0, k = 0, l = 0, m = 0, n = !1, o = 0, p = d(a, b, c);
                for (e = 0; 256 > e; e++) {
                    var q = p[e];
                    q > i && 128 >= e && (i = q,
                        k = e),
                    q > j && e > 128 && (j = q,
                        l = e),
                        m += q / (b * c),
                    m >= .68 && n === !1 && (n = !0,
                        o = e)
                }
                return f = o,
                    g = .68 * (l - k),
                    h = g > f ? f - g : f - g,
                    h /= 2,
                -50 > h && (h = -50),
                h > 150 && (h = 150),
                10 * Math.round(h / 10)
            }
            function i(a, b, c, d) {
                var e, f, h, i, j = b * c;
                e = g(a, b, c, d),
                    h = 0;
                for (var k = 0; j > k; k++)
                    h += e[k];
                return i = h / j,
                    f = i > .5 ? 100 * (i - .5) : 100 * (.5 - i),
                10 * Math.round(f / 10)
            }
            function j(a, b, c, d, e) {
                var f, g, h, i, j = 0, k = 0, l = c * d * e;
                for (h = 0,
                         i = 0; l > h; h += e,
                         i++)
                    255 === a[h + 3] && (g = Math.exp(-12.5 * Math.pow(.00390625 * a[h] - .5, 2)) * Math.exp(-12.5 * Math.pow(.00390625 * a[h + 1] - .5, 2)) * Math.exp(-12.5 * Math.pow(.00390625 * a[h + 2] - .5, 2)),
                    .2 > g && (j += b[i],
                        k++));
                return 0 === k ? 0 : (f = .00390625 * j / k,
                    g = f > .5 ? 300 * (f - .5) : 300 * (.5 - f),
                10 * Math.round(g / 10))
            }
            function k(a, b, c, d, e) {
                var f, g, h = c * d;
                if (4 === e)
                    for (f = 0; h > f; f++)
                        if (g = f * e + 3,
                            255 !== a[g])
                            return 0;
                var i, j, k = !1, l = !1, m = .1 * h, n = 0, o = 0, p = 0, q = 0;
                for (f = 0; 5 * c > f; f++)
                    o += b[f],
                        p += b[f] * b[f],
                        q++;
                for (f = h - 5 * c; h > f; f++)
                    o += b[f],
                        p += b[f] * b[f],
                        q++;
                i = o / q,
                    j = Math.abs(p / q - i * i),
                5 > j && (10 > i || i > 245) && (k = !0);
                var r = [];
                for (f = 0; h > f; f++) {
                    g = f * e;
                    var s = -(9699 * a[g] >> 16) - (19070 * a[g + 1] >> 16) + (28770 * a[g + 2] >> 16) + 128
                        , t = (28770 * a[g] >> 16) - (24117 * a[g + 1] >> 16) - (4653 * a[g + 2] >> 16) + 128;
                    r[2 * f] = Math.min(Math.max(s, 0), 255),
                        r[2 * f + 1] = Math.min(Math.max(t, 0), 255)
                }
                for (f = 0; h > f; f++) {
                    g = 2 * f;
                    var u = a[f * e]
                        , v = a[f * e + 1]
                        , w = a[f * e + 2]
                        , x = u > 50 && v > 40 && w > 20 && Math.max(Math.max(u, v), w) - Math.min(Math.min(u, v), w) > 10 && u - v >= 10 && u > v && u > w
                        , y = u > 220 && v > 210 && w > 170 && Math.abs(u - v) <= 15 && u > w && v > w;
                    x === !0 | y === !0 && r[g] >= 75 && r[g] <= 135 && r[g + 1] >= 135 && r[g + 1] <= 160 && r[g + 1] > r[g] && r[g + 1] - r[g] > 15 && n++
                }
                return n > m && (l = !0),
                    l ? k ? 0 : 50 : 35
            }
            a.addModule("Auto", {
                init: function(b, c, d) {
                    this.sandbox = b,
                        this.autoFlag = !1,
                        this.text = a.$$p(".menu_btn_auto .txt_item", c)[0],
                        this._bindEvent()
                },
                _bindEvent: function() {
                    var c = this;
                    this.sandbox.on("mainmenu:effect", function() {
                        c.sandbox.emit("paint:origin")
                    }),
                        this.sandbox.on("editor:change", function() {
                            c.autoFlag = !1,
                                c.text.innerHTML = "자동조정"
                        }),
                        this.sandbox.on("effect:auto", function() {
                            a.isAvangers && a.printIronMan("I have a plan: Auto adjustment!");
                            var d = [0, 0, 0];
                            if (c.autoFlag === !1) {
                                var e = a.$$p(".preview_canvas_origin")[0]
                                    , f = e.getContext("2d")
                                    , g = f.getImageData(0, 0, e.width, e.height);
                                d = b(g),
                                    c.autoFlag = !0,
                                    c.text.innerHTML = "재설정",
                                    a.tiara.sendLog("auto", a.tiara.USE)
                            } else
                                c.autoFlag = !1,
                                    c.text.innerHTML = "자동조정",
                                    a.tiara.sendLog("auto", a.tiara.NOTUSE);
                            c.sandbox.emit("history:current", function(a) {
                                a.contrast = d[0],
                                    a.brightness = d[1],
                                    a.saturation = d[2],
                                    a.vignette = d[3],
                                    c.sandbox.emit("history:add", a)
                            })
                        })
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = "crop"
                , c = "vignette"
                , d = "state_item"
                , e = 80
                , f = 84
                , g = 200
                , h = "ease-in-out";
            a.addModule("Crop", {
                init: function(c, d, e) {
                    this.sandbox = c,
                        this.frame = d,
                        this.viewport = e.viewport && e.viewport.preview || "flexible",
                        this.active = !1,
                        this.prefix = e.prefix || "",
                        this.state = a.$$p(".menu_sub_edit .menu_btn_crop")[0],
                        this.option = e[b] || {},
                        this.initDataManager(this.option.ratioRotateMode),
                        this.initCropView(this.option.list),
                        this.initCropPreviewControl(),
                        this.initCropBoxControl(),
                        this.initOrientationControl(),
                        this.bindSandboxEvent()
                },
                initDataManager: function(b) {
                    var c = this;
                    this.dataManager = new a.crop.dataManager(b),
                        this.dataManager.on("change", this.render.bind(this)),
                        this.dataManager.on("dragCropBox", function(a, b, d) {
                            c.cropView && c.cropView.render(a),
                            c.boxControl && c.boxControl.renderForDragCropBox(a, c.data, b, d)
                        })
                },
                initCropView: function(b) {
                    if ("view" in a.crop) {
                        var c = a.$$p(".tools_crop")[0]
                            , d = a.$$p(".crop_dimmed")[0];
                        this.cropView = new a.crop.view({
                            prefix: this.prefix,
                            ratios: b,
                            tools: c,
                            dimmedLayer: d,
                            dimmedTop: a.$$p(".crop_dimmed_top", d)[0],
                            dimmedBottom: a.$$p(".crop_dimmed_bottom", d)[0],
                            dimmedLeft: a.$$p(".crop_dimmed_left", d)[0],
                            dimmedRight: a.$$p(".crop_dimmed_right", d)[0],
                            ratioMenu: a.$$p(".list_crop", this.frame)[0]
                        })
                    }
                },
                initCropPreviewControl: function() {
                    if ("previewControl" in a.crop) {
                        var b = this;
                        this.previewControl = new a.crop.previewControl({
                            previewWrap: a.$$p(".preview_wrapper")[0],
                            draggableArea: a.$$p(".crop_draggable")[0]
                        }),
                            this.previewControl.on("drag:start", function() {
                                b.cropView && b.cropView.cropEditStart(),
                                b.boxControl && b.boxControl.showMoveGrid(),
                                b.boxControl && b.boxControl.setDragEnable(!1),
                                    b.dataManager.previewDragStart()
                            }),
                            this.previewControl.on("drag:move", function(a, c) {
                                b.dataManager.previewDragMove(a, c)
                            }),
                            this.previewControl.on("drag:end", function(a, c) {
                                b.cropView && b.cropView.cropEditEnd(),
                                b.boxControl && b.boxControl.hideMoveGrid(),
                                b.boxControl && b.boxControl.setDragEnable(!0),
                                    b.dataManager.previewDragEnd(a, c)
                            })
                    }
                },
                initCropBoxControl: function() {
                    if ("boxControl" in a.crop) {
                        var b = this
                            , c = a.$$p(".tools_crop")[0];
                        this.boxControl = new a.crop.boxControl({
                            prefix: this.prefix,
                            tools: c,
                            cropBox: a.$$p(".box_area", c)[0]
                        }),
                            this.boxControl.on("drag:start", function(a) {
                                b.cropView && b.cropView.cropEditStart(),
                                b.orientationControl && b.orientationControl.hideControl(),
                                b.previewControl && b.previewControl.setDragEnable(!1),
                                    b.dataManager.cropBoxDragStart(a)
                            }),
                            this.boxControl.on("drag:move", function(a, c, d) {
                                b.dataManager.cropBoxDragMove(a, c, d)
                            }),
                            this.boxControl.on("drag:end", function(a, c, d) {
                                b.cropView && b.cropView.cropEditEnd(),
                                b.orientationControl && b.orientationControl.showControl(),
                                b.previewControl && b.previewControl.setDragEnable(!0),
                                    b.dataManager.cropBoxDragEnd(a, c, d)
                            }),
                            this.boxControl.on("changed", function(a, c) {
                                "scale" in a && (b.dataManager.setPreviewScale(a.scale),
                                    b.sandbox.emit("change:preview:scale", a.scale)),
                                b.cropView && b.cropView.alignDimmedLayer(a, c),
                                b.orientationControl && b.orientationControl.align(a, c)
                            })
                    }
                },
                initOrientationControl: function() {
                    if ("orientationControl" in a.crop) {
                        var b = this
                            , c = a.$$p(".tools_wrapper .tools_crop")[0];
                        this.orientationControl = new a.crop.orientationControl({
                            tools: c,
                            orientationTool: a.$$p(".info_rotate", c)[0],
                            protractorWrapper: a.$$p(".wrap_protractor", c)[0],
                            protractor: a.$$p(".protractor", c)[0],
                            input: a.$$p(".inp_photos", c)[0]
                        }),
                            this.orientationControl.on("protractor:start", function() {
                                b.cropView && b.cropView.cropEditStart(),
                                b.boxControl && b.boxControl.showRotateGrid()
                            }),
                            this.orientationControl.on("protractor:move", function(a, c) {
                                b.dataManager.rotateByAngle(a, c)
                            }),
                            this.orientationControl.on("protractor:end", function() {
                                b.cropView && b.cropView.cropEditEnd(),
                                b.boxControl && b.boxControl.hideRotateGrid()
                            })
                    }
                },
                bindSandboxEvent: function() {
                    var a = this;
                    this.sandbox.on("crop:enter", function() {
                        a.activation()
                    }),
                        this.sandbox.on("crop:ok", function() {
                            a.applyChanges(),
                                a.reset()
                        }),
                        this.sandbox.on("crop:back", function() {
                            a.reset()
                        }),
                        this.sandbox.on("crop:ratio", function(b) {
                            "toggle" === b.args[0] ? a.dataManager.toggleRatioRotate() : a.dataManager.setRatio(b.args[0])
                        }),
                        this.sandbox.on("orientation:type", function(b) {
                            var c = b.args[0];
                            a.dataManager.rotateByType(c)
                        }),
                        this.sandbox.on("history:change", function(c) {
                            a.setState(c && c[b])
                        }),
                        this.sandbox.on(["preview:onload", "preview:resize"], function(b) {
                            var c = b.w
                                , d = b.h;
                            a.dataManager.setPreviewSize(c, d)
                        }),
                        this.sandbox.on(["frame:init", "frame:resize"], function(b, c, d) {
                            c -= e,
                                "fixed-width" === a.viewport ? a.previewControl && a.previewControl.setFrameSize(d, c, a.data) : a.previewControl && a.previewControl.setFrameSize(b, c, a.data),
                            a.cropView && a.cropView.setFrameSize(b, c),
                            a.boxControl && a.boxControl.setFrameSize(b, c, 0, 2 * f, a.data)
                        }),
                        this.sandbox.on("light:change", function(b) {
                            a.orientationControl && a.orientationControl.changeProtractorColor(b)
                        })
                },
                setState: function(a) {
                    this.state.classList[a ? "add" : "remove"](this.prefix + d)
                },
                activation: function() {
                    var a = this;
                    this.active = !0,
                        this.sandbox.emit("light:get"),
                    this.cropView && this.cropView.activation(),
                    this.boxControl && this.boxControl.activation(),
                    this.orientationControl && this.orientationControl.activation(),
                        this.sandbox.emit("mode:change", {
                            previewAlign: !1,
                            magnifierEnable: !1,
                            previewDraggable: !1
                        }),
                        this.sandbox.emit("history:current", function(d) {
                            var e = d[b];
                            delete d[b],
                                delete d[c],
                                a.sandbox.emit("paint:preview", d),
                                a.dataManager.initData(e),
                                a.sandbox.emit("decoOverlay:check", d)
                        })
                },
                render: function(a, b) {
                    if (this.active) {
                        var c = b ? {
                            duration: g,
                            easing: h
                        } : null ;
                        this.sandbox.emit("preview:setTransformOrigin", a.centerX + "px " + a.centerY + "px", c),
                        this.cropView && this.cropView.render(a, c),
                        this.previewControl && this.previewControl.render(a, c),
                        this.boxControl && this.boxControl.render(a, c),
                        this.orientationControl && this.orientationControl.render(a, c),
                            this.data = a
                    }
                },
                applyChanges: function() {
                    var c = this.dataManager.getHistoryData()
                        , d = {};
                    d[b] = c,
                        this.sandbox.emit("history:add", d),
                        this.sandbox.emit("reset:deco"),
                        a.tiara.sendLog(a.tiara.OK, b, c ? a.tiara.USE : a.tiara.NOTUSE)
                },
                reset: function() {
                    this.active = !1,
                        this.data = null ,
                        this.dataManager.reset(),
                    this.cropView && this.cropView.reset(),
                    this.previewControl && this.previewControl.reset(),
                    this.boxControl && this.boxControl.reset(),
                    this.orientationControl && this.orientationControl.reset(),
                        this.sandbox.emit("preview:setTransformOrigin", ""),
                        this.sandbox.emit("mode:change", {
                            previewAlign: !0,
                            magnifierEnable: !0,
                            previewDraggable: !0
                        })
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = 100
                , c = 100
                , d = "toggle"
                , e = "box_ratio"
                , f = "none"
                , g = "free"
                , h = "origin"
                , i = "origin_r"
                , j = a.crop = a.crop || {};
            j.dataManager = Observer.extend({
                init: function(a) {
                    this.ratioRotateMode = a || e,
                        this.editData = null
                },
                setPreviewSize: function(a, d) {
                    this.minWidth = Math.min(b, a),
                        this.minHeight = Math.min(c, d),
                        this.previewWidth = a,
                        this.previewHeight = d,
                        this.emitChange(!1)
                },
                setPreviewScale: function(a) {
                    this.previewScale = a
                },
                initData: function(a, b) {
                    a = a || {},
                        this.editData = {
                            flipV: a.flipV || 0,
                            flipH: a.flipH || 0,
                            rotate: a.rotate || 0,
                            angle: a.angle || 0,
                            centerX: (a.centerX || .5) * this.previewWidth,
                            centerY: (a.centerY || .5) * this.previewHeight,
                            width: (a.width || 1) * this.previewWidth,
                            height: (a.height || 1) * this.previewHeight,
                            ratioType: a.ratioType || "free",
                            ratioRotate: a.ratioRotate || !1
                        },
                        this.syncOrgSize(),
                        this.syncOrgArea(),
                        this.syncRatio(),
                        this.emitChange(b)
                },
                syncOrgSize: function() {
                    this.orgWidth = this.editData.width,
                        this.orgHeight = this.editData.height
                },
                syncOrgArea: function() {
                    this.orgArea = this.editData.width * this.editData.height
                },
                syncRatio: function() {
                    var b, c, d = this.editData.ratioType;
                    if ("free" === d)
                        b = 0,
                            c = 0;
                    else if ("origin" === d && this.previewWidth > this.previewHeight || "origin_r" === d && this.previewWidth < this.previewHeight)
                        b = this.previewWidth,
                            c = this.previewHeight;
                    else if ("origin" === d && this.previewWidth < this.previewHeight || "origin_r" === d && this.previewWidth > this.previewHeight)
                        b = this.previewHeight,
                            c = this.previewWidth;
                    else {
                        var e = d.split("_");
                        b = parseInt(e[0]),
                            c = parseInt(e[1])
                    }
                    this.ratio = a.util.crop.division(b, c)
                },
                rotateByType: function(a) {
                    var b = 1;
                    1 === this.editData.flipV && (b *= -1),
                    1 === this.editData.flipH && (b *= -1),
                        "left" === a ? this.editData.rotate -= b : "right" === a ? this.editData.rotate += b : "vertical" === a ? this.editData.flipV = 0 === this.editData.flipV ? 1 : 0 : "horizontal" === a && (this.editData.flipH = 0 === this.editData.flipH ? 1 : 0),
                        this.emitChange(!0)
                },
                rotateByAngle: function(a, b) {
                    this.editData.angle = a,
                        this.setSize(this.orgWidth, this.orgHeight),
                        this._adjustSizeForCenterFix(),
                    (this.editData.width <= this.minWidth || this.editData.height <= this.minHeight) && this._adjustAngleForSizeFix(),
                        this.syncOrgArea(),
                        this.emitChange(b)
                },
                _adjustSizeForCenterFix: function() {
                    var b = a.util.crop.getBoundHalfSize(this.editData.width, this.editData.height, this.editData.angle)
                        , c = Math.min(Math.min(this.previewWidth - this.editData.centerX, this.editData.centerX) / b.width, 1)
                        , d = Math.min(Math.min(this.previewHeight - this.editData.centerY, this.editData.centerY) / b.height, 1)
                        , e = Math.min(c, d);
                    this.setSize(this.editData.width * e, this.editData.height * e, !1, !0)
                },
                _adjustAngleForSizeFix: function() {
                    var b = a.util.crop.getAngleInBound(this.editData.width, this.editData.height, Math.min(this.editData.centerX, this.previewWidth - this.editData.centerX), Math.min(this.editData.centerY, this.previewHeight - this.editData.centerY));
                    Math.abs(this.editData.angle) > b && (this.editData.angle = b * (this.editData.angle > 0 ? 1 : -1))
                },
                previewDragStart: function() {
                    this.startCenterX = this.editData.centerX,
                        this.startCenterY = this.editData.centerY
                },
                previewDragMove: function(a, b) {
                    this._previewMove(a, b, !0),
                        this.emitChange(!1)
                },
                previewDragEnd: function(a, b) {
                    this._previewMove(a, b, !1),
                        this.syncOrgSize(),
                        this.syncOrgArea(),
                        this.emitChange(!0)
                },
                _previewMove: function(b, c, d) {
                    var e = {
                        dx: b,
                        dy: c
                    };
                    a.util.crop.adjustDp(e, {
                        flipV: this.editData.flipV,
                        flipH: this.editData.flipH,
                        rotate: this.editData.rotate,
                        angle: this.editData.angle,
                        scale: this.previewScale
                    }),
                        this.setCenter(this.startCenterX - e.dx, this.startCenterY - e.dy),
                        this._adjustPosition(d)
                },
                _syncRatioRotateForBoxRatio: function() {
                    this.ratioRotateMode === e && this.editData.ratioType === g && (this.editData.width > this.editData.height ? this.editData.ratioRotate && this.toggleRatioRotate() : this.editData.width < this.editData.height && !this.editData.ratioRotate && this.toggleRatioRotate())
                },
                toggleRatioRotate: function(a) {
                    if (this.editData.ratioRotate !== a && (a = "undefined" == typeof a ? !this.editData.ratioRotate : a,
                            this.editData.ratioRotate = a,
                        this.editData.ratioType !== g)) {
                        var b = this.editData.width;
                        this.editData.width = this.editData.height,
                            this.editData.height = b,
                            this._setRatio(this._reverseRatioType(this.editData.ratioType))
                    }
                },
                setRatio: function(a) {
                    return a = this._getRatioRotated() === (this.editData.rotate % 2 === 1) ? a : this._reverseRatioType(a),
                        this.ratioRotateMode === d && this.editData.ratioType === a ? void this.toggleRatioRotate() : void this._setRatio(a)
                },
                _setRatio: function(b) {
                    this.editData.ratioType = b,
                        this.syncRatio(),
                        a.util.crop.sizeAspectSameArea(this.editData, this.ratio, this.orgArea),
                        this._adjustSize(),
                        this._adjustPosition(!1),
                        this.syncOrgSize(),
                        this.emitChange(!0)
                },
                _reverseRatioType: function(a) {
                    if (a === g || !a)
                        return a;
                    if (a === h)
                        return i;
                    if (a === i)
                        return h;
                    var b = "_"
                        , c = a.split(b);
                    return c.reverse(),
                        c.join(b)
                },
                _adjustSize: function() {
                    var b = a.util.crop.getBoundHalfSize(this.editData.width, this.editData.height, this.editData.angle)
                        , c = Math.min(this.previewWidth / (2 * b.width), 1)
                        , d = Math.min(this.previewHeight / (2 * b.height), 1)
                        , e = Math.min(c, d);
                    this.setSize(this.editData.width * e, this.editData.height * e)
                },
                cropBoxDragStart: function(a) {
                    this.startCenterX = this.editData.centerX,
                        this.startCenterY = this.editData.centerY,
                        this.startWidth = this.editData.width,
                        this.startHeight = this.editData.height,
                        this.dragPosition = this._getDragPosition(a)
                },
                cropBoxDragMove: function(a, b, c) {
                    this._cropBoxDrag(this.dragPosition, b, c, !0),
                        this.emit("dragCropBox", this.getEditData(), a, this.previewScale)
                },
                cropBoxDragEnd: function(a, b, c) {
                    this._cropBoxDrag(this.dragPosition, b, c, !1),
                        this.syncOrgSize(),
                        this.syncOrgArea(),
                        this.emitChange(!0)
                },
                _getDragPosition: function(b) {
                    var c = {
                        dx: b.indexOf("e") >= 0 ? 1 : b.indexOf("w") >= 0 ? -1 : 0,
                        dy: b.indexOf("s") >= 0 ? 1 : b.indexOf("n") >= 0 ? -1 : 0
                    };
                    return a.util.crop.adjustDp(c, {
                        flipV: this.editData.flipV,
                        flipH: this.editData.flipH,
                        rotate: this.editData.rotate
                    }),
                        c.dx = a.util.crop.adjustNumber(c.dx),
                        c.dy = a.util.crop.adjustNumber(c.dy),
                        c
                },
                _cropBoxDrag: function(b, c, d, e) {
                    var f = {
                        dx: c,
                        dy: d
                    };
                    a.util.crop.adjustDp(f, {
                        flipV: this.editData.flipV,
                        flipH: this.editData.flipH,
                        rotate: this.editData.rotate,
                        scale: this.previewScale
                    }),
                        this._setSizeForDp(b, f.dx, f.dy),
                        this._adjustSizeForCropBox(b, e),
                        a.util.crop.sizeAspectFit(this.editData, this.ratio),
                        this._adjustPositionForSize(b)
                },
                _setSizeForDp: function(a, b, c) {
                    a.dx < 0 && (b *= -1),
                    a.dy < 0 && (c *= -1),
                        0 === a.dx ? b = 0 === this.ratio ? 0 : c * this.ratio : 0 === a.dy ? c = 0 === this.ratio ? 0 : b / this.ratio : 0 !== this.ratio && (b = (b + c * this.ratio) / 2,
                            c = b / this.ratio),
                        this.setSize(this.startWidth + b, this.startHeight + c, !0),
                        this._adjustPositionForSize(a)
                },
                _adjustSizeForCropBox: function(a, b) {
                    var c = this._getBoundOverForAngle()
                        , d = {
                        width: 0,
                        height: 0
                    };
                    if (0 === this.editData.angle) {
                        var e, f;
                        d.width = Math.max(c.right, c.left),
                            d.height = Math.max(c.bottom, c.top),
                        this.ratio && (d.width *= 0 === a.dx ? 2 : 1,
                            d.height *= 0 === a.dy ? 2 : 1,
                            e = d.height * this.ratio,
                            f = d.width / this.ratio,
                            e > d.width ? d.width = e : f > d.height && (d.height = f))
                    } else
                        0 === a.dx ? this._getOverForAngleLineH(a, c, d) : 0 === a.dy ? this._getOverForAngleLineW(a, c, d) : this._getOverForAngleDot(a, c, d);
                    this.setSize(this.editData.width - this._adjustOverValue(d.width, 0, b), this.editData.height - this._adjustOverValue(d.height, 0, b), !0)
                },
                _getOverForAngleLineH: function(a, b, c) {
                    var d, e, f, g, h, i;
                    a.dy > 0 ? (d = "bottom",
                        e = "top",
                        f = 2,
                        g = 1) : a.dy < 0 && (d = "top",
                        e = "bottom",
                        f = 2,
                        g = 1),
                        0 === this.ratio ? c.height = Math.max(b[d + "-left-h"], b[d + "-right-h"]) : (c.width = 2 * Math.max(b[e + "-left-w"], b[e + "-right-w"]),
                            c.height = c.width / this.ratio,
                            h = this._getAdjustSize(b[d + "-left-w"], b[d + "-left-h"], c.width, c.height, f, g),
                            i = this._getAdjustSize(b[d + "-right-w"], b[d + "-right-h"], c.width, c.height, f, g),
                            c.width += h.width > i.width ? h.width : i.width,
                            c.height += h.height > i.height ? h.height : i.height)
                },
                _getOverForAngleLineW: function(a, b, c) {
                    var d, e, f, g, h, i;
                    a.dx > 0 ? (d = "right",
                        e = "left",
                        f = 1,
                        g = 2) : a.dx < 0 && (d = "left",
                        e = "right",
                        f = 1,
                        g = 2),
                        0 === this.ratio ? c.width = Math.max(b["top-" + d + "-w"], b["bottom-" + d + "-w"]) : (c.height = Math.max(b["top-" + e + "-h"], b["bottom-" + e + "-h"]) * g,
                            c.width = c.height * this.ratio * f,
                            h = this._getAdjustSize(b["top-" + d + "-w"], b["top-" + d + "-h"], c.width, c.height, f, g),
                            i = this._getAdjustSize(b["bottom-" + d + "-w"], b["bottom-" + d + "-h"], c.width, c.height, f, g),
                            c.width += h.width > i.width ? h.width : i.width,
                            c.height += h.height > i.height ? h.height : i.height)
                },
                _getAdjustSize: function(b, c, d, e, f, g) {
                    var h = this.ratio * g / f
                        , i = a.util.crop.calTriangleResize(b, c, d / f, e / g);
                    return i.height = a.util.crop.division(i.width * i.height, i.width + h * i.height),
                        i.width = i.height * h,
                        i.width *= f,
                        i.height *= g,
                        i
                },
                _getOverForAngleDot: function(b, c, d) {
                    var e, f, g, h = (b.dy > 0 ? "bottom" : "top") + "-" + (b.dx > 0 ? "right" : "left"), i = (b.dy > 0 ? "top" : "bottom") + "-" + (b.dx > 0 ? "right" : "left"), j = (b.dy > 0 ? "bottom" : "top") + "-" + (b.dx > 0 ? "left" : "right");
                    d.width = c[i + "-w"],
                        d.height = c[j + "-h"],
                    this.ratio && (f = d.height * this.ratio,
                        g = d.width / this.ratio,
                        f > d.width ? d.width = f : g > d.height && (d.height = g)),
                        e = a.util.crop.calTriangleResize(c[h + "-w"], c[h + "-h"], d.width, d.height),
                        this.ratio ? (e.height = a.util.crop.division(e.width * e.height, e.width + this.ratio * e.height),
                            e.width = e.height * this.ratio) : (e.width *= .5,
                            e.height *= .5),
                        d.width += e.width,
                        d.height += e.height
                },
                _adjustPositionForSize: function(b) {
                    var c = {
                        dx: 0,
                        dy: 0
                    };
                    b.dx < 0 ? c.dx = (this.startWidth - this.editData.width) / 2 : b.dx > 0 && (c.dx = -(this.startWidth - this.editData.width) / 2),
                        b.dy < 0 ? c.dy = (this.startHeight - this.editData.height) / 2 : b.dy > 0 && (c.dy = -(this.startHeight - this.editData.height) / 2),
                        a.util.crop.adjustDpForAngle(c, this.editData.angle),
                        this.setCenter(this.startCenterX + c.dx, this.startCenterY + c.dy)
                },
                _adjustPosition: function(a) {
                    var b = this._getBoundOver();
                    this.setCenter(this.editData.centerX - this._adjustOverValue(b.right, b.left, a), this.editData.centerY - this._adjustOverValue(b.bottom, b.top, a))
                },
                _getBoundOver: function() {
                    var b = a.util.crop.getBoundHalfSize(this.editData.width, this.editData.height, this.editData.angle);
                    return {
                        left: Math.max(0, b.width - this.editData.centerX),
                        right: Math.max(0, b.width - this.previewWidth + this.editData.centerX),
                        top: Math.max(0, b.height - this.editData.centerY),
                        bottom: Math.max(0, b.height - this.previewHeight + this.editData.centerY)
                    }
                },
                _getBoundOverForAngle: function() {
                    var b, c, d = this._getBoundOver(), e = a.util.degree2radian(Math.abs(this.editData.angle)), f = Math.sin(e), g = Math.cos(e), h = {};
                    h[this._getDirectionForAngle({
                        dx: -1,
                        dy: -1
                    })] = "top-left",
                        h[this._getDirectionForAngle({
                            dx: 1,
                            dy: -1
                        })] = "top-right",
                        h[this._getDirectionForAngle({
                            dx: -1,
                            dy: 1
                        })] = "bottom-left",
                        h[this._getDirectionForAngle({
                            dx: 1,
                            dy: 1
                        })] = "bottom-right";
                    for (c in d)
                        b = d[c],
                            "left" === c || "right" === c ? (d[h[c] + "-w"] = a.util.crop.division(b, g),
                                d[h[c] + "-h"] = a.util.crop.division(b, f)) : (d[h[c] + "-w"] = a.util.crop.division(b, f),
                                d[h[c] + "-h"] = a.util.crop.division(b, g));
                    return d
                },
                _getDirectionForAngle: function(b) {
                    var c = {
                        dx: b.dx,
                        dy: b.dy
                    };
                    return a.util.crop.adjustDpForAngle(c, this.editData.angle),
                        Math.abs(c.dx) > Math.abs(c.dy) ? c.dx > 0 ? "right" : "left" : c.dy > 0 ? "bottom" : "top"
                },
                _adjustOverValue: function(b, c, d) {
                    var e = 0
                        , f = 0
                        , g = 1;
                    if (b > 0 ? (e = b,
                            g = -1) : c > 0 && (e = c),
                            d) {
                        var h = (this.editData.width + this.editData.height) / 30;
                        f = e > 0 ? a.util.rubberBandValue(e, h) : 0
                    }
                    return g * (f - e)
                },
                _getRotate: function() {
                    var a = Math.round(this.editData.rotate % 4);
                    return a += 0 > a ? 4 : 0
                },
                _getRatioRotated: function() {
                    return this.ratioRotateMode !== f ? this.editData.rotate % 2 === 0 ? this.editData.ratioRotate : !this.editData.ratioRotate : this.editData.ratioRotate
                },
                setCenter: function(b, c) {
                    this.editData.centerX = a.util.crop.adjustNumberForInt(b, !0),
                        this.editData.centerY = a.util.crop.adjustNumberForInt(c, !0)
                },
                setSize: function(a, b, c, d) {
                    var e = d ? a / b : this.ratio;
                    b < this.minHeight && (b = this.minHeight,
                        a = 0 === e ? a : b * e),
                    a < this.minWidth && (a = this.minWidth,
                        b = 0 === e ? b : a / e),
                    !c && b > this.previewHeight && (b = this.previewHeight,
                        a = 0 === e ? a : b * e),
                    !c && a > this.previewWidth && (a = this.previewWidth,
                        b = 0 === e ? b : a / e),
                        this.editData.width = a,
                        this.editData.height = b,
                        this._syncRatioRotateForBoxRatio()
                },
                emitChange: function(a) {
                    this.editData && (a = a || !1,
                        this.emit("change", this.getEditData(), a))
                },
                getEditData: function() {
                    var b = JSON.parse(JSON.stringify(this.editData));
                    return b.radianAngle = a.util.degree2radian(b.angle),
                        b.ratioRotate = this._getRatioRotated(),
                        b.ratioType = b.ratioRotate === (b.rotate % 2 === 1) ? b.ratioType : this._reverseRatioType(b.ratioType),
                        b
                },
                getHistoryData: function() {
                    var b = {
                        flipV: this.editData.flipV,
                        flipH: this.editData.flipH,
                        rotate: this._getRotate(),
                        angle: this.editData.angle,
                        centerX: a.util.crop.adjustNumber(this.editData.centerX / this.previewWidth),
                        centerY: a.util.crop.adjustNumber(this.editData.centerY / this.previewHeight),
                        width: a.util.crop.adjustNumber(this.editData.width / this.previewWidth),
                        height: a.util.crop.adjustNumber(this.editData.height / this.previewHeight),
                        ratioType: this.editData.ratioType
                    };
                    return 0 !== b.flipV || 0 !== b.flipH || 0 !== b.rotate || 0 !== b.angle || .5 !== b.centerX || .5 !== b.centerY || 1 !== b.width || 1 !== b.height ? b : null
                },
                reset: function() {
                    this.initData({}, !1)
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = a.util.getPrefix(document.body, "transition")
                , c = "ratio_r"
                , d = "on"
                , e = "editing"
                , f = 10
                , g = a.crop = a.crop || {};
            g.view = Observer.extend({
                init: function(a) {
                    this.prefix = a.prefix,
                        this.tools = a.tools,
                        this.dimmedLayer = a.dimmedLayer,
                        this.dimmedTop = a.dimmedTop,
                        this.dimmedBottom = a.dimmedBottom,
                        this.dimmedLeft = a.dimmedLeft,
                        this.dimmedRight = a.dimmedRight,
                        this.ratioMenu = a.ratioMenu,
                        this.initRatioBtn(a.ratios)
                },
                initRatioBtn: function(a) {
                    var b, c, d, e = "";
                    for (a = a || [{
                            type: "Free"
                        }, {
                            type: "Origin"
                        }, {
                            type: "number",
                            width: 1,
                            height: 1
                        }, {
                            type: "number",
                            width: 4,
                            height: 3
                        }, {
                            type: "number",
                            width: 3,
                            height: 2
                        }, {
                            type: "number",
                            width: 16,
                            height: 9
                        }],
                         a.length > f && a.splice(f),
                             d = a.length,
                             c = 0; d > c; c++)
                        b = a[c],
                            e += this.getRatioBrnHtmlStr(b.type, b.width, b.height, b.label, b.rotateLabel);
                    this.ratioMenu.innerHTML = e
                },
                getRatioBrnHtmlStr: function(a, b, c, d, e) {
                    var f, g, h = a;
                    return a = a.toLowerCase(),
                        g = "number" === a,
                        a = g ? b + "_" + c : a,
                        h = d || (g ? b + ":" + c : h),
                        f = e || d || (g ? c + ":" + b : h),
                    '<li><button type="button" class="' + this.prefix + "btn_info " + this.prefix + "ratio_" + a + '" data-click="crop:ratio:' + a + '"><span class="' + this.prefix + 'inner_btn"><span class="' + this.prefix + 'txt_vertical">' + h + '</span><span class="' + this.prefix + "txt_vertical " + this.prefix + 'rotate">' + f + "</span></span></button></li>"
                },
                setFrameSize: function(a, b) {
                    this.frameWidth = a,
                        this.frameHeight = b,
                        this.dimmedLayer.style.width = a + "px",
                        this.dimmedLayer.style.height = b + "px"
                },
                cropEditStart: function() {
                    this.dimmedLayer.classList.add(this.prefix + e)
                },
                cropEditEnd: function() {
                    this.dimmedLayer.classList.remove(this.prefix + e)
                },
                activation: function() {
                    this.tools.classList.remove(a.HIDE_CLASS)
                },
                alignDimmedLayer: function(a, b) {
                    b ? this._animation(a, b) : this._alignDimmedLayer(a)
                },
                _animation: function(c, d) {
                    var e = this;
                    this.flow && this.flow.stop(),
                        this.flow = new a.util.Flow,
                        this.flow.then(function(a) {
                            var f = "all " + d.duration + "ms " + d.easing;
                            e.dimmedTop.style[b] = f,
                                e.dimmedBottom.style[b] = f,
                                e.dimmedLeft.style[b] = f,
                                e.dimmedRight.style[b] = f,
                                e._alignDimmedLayer(c),
                                a(null )
                        }).delay(d.duration).end(function() {
                            e.dimmedTop.style[b] = "",
                                e.dimmedBottom.style[b] = "",
                                e.dimmedLeft.style[b] = "",
                                e.dimmedRight.style[b] = "",
                                e.flow = null
                        })
                },
                _alignDimmedLayer: function(a) {
                    this._setStyle(this.dimmedTop, {
                        width: a.width,
                        height: a.y,
                        left: a.x
                    }),
                        this._setStyle(this.dimmedBottom, {
                            width: a.width,
                            height: 2 * this.frameHeight,
                            left: a.x,
                            top: a.y + a.height
                        }),
                        this._setStyle(this.dimmedLeft, {
                            width: a.x,
                            height: 2 * this.frameHeight
                        }),
                        this._setStyle(this.dimmedRight, {
                            width: 2 * this.frameWidth,
                            height: 2 * this.frameHeight,
                            left: a.x + a.width
                        })
                },
                _setStyle: function(a, b) {
                    for (var c in b)
                        b.hasOwnProperty(c) && (a.style[c] = Math.max(0, b[c]) + "px")
                },
                render: function(a, b) {
                    this._checkRatioRotate(a.ratioRotate),
                        this._selectRatioBtn(a.ratioType),
                    b && this._animationOpacity(b)
                },
                _checkRatioRotate: function(a) {
                    a ? this.ratioMenu.classList.add(this.prefix + c) : this.ratioMenu.classList.remove(this.prefix + c)
                },
                _selectRatioBtn: function(b) {
                    var c, e = a.$$p("." + d, this.ratioMenu), f = a.$$p(".ratio_" + b, this.ratioMenu) || a.$$p(".ratio_free", this.ratioMenu);
                    for (c = e.length - 1; c >= 0; c--)
                        e[c].classList.remove(this.prefix + d);
                    for (c = f.length - 1; c >= 0; c--)
                        f[c].classList.add(this.prefix + d)
                },
                _animationOpacity: function(b) {
                    var c = this;
                    this.opacityFlow && this.opacityFlow.stop(),
                        this.opacityFlow = new a.util.Flow,
                        this.opacityFlow.then(function(a) {
                            c.cropEditStart(),
                                a(null )
                        }).delay(b.duration).end(function() {
                            c.cropEditEnd(),
                                c.opacityFlow = null
                        })
                },
                reset: function() {
                    this.tools.classList.add(a.HIDE_CLASS)
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = a.util.getPrefix(document.body, "transform")
                , c = a.util.getPrefix(document.body, "transition")
                , d = "preview_move"
                , e = "preview_rotate"
                , f = 100
                , g = 0
                , h = a.crop = a.crop || {};
            h.boxControl = Observer.extend({
                init: function(a) {
                    this.prefix = a.prefix,
                        this.tools = a.tools,
                        this.cropBox = a.cropBox,
                        this.dragEnable = !0,
                        this.initCropBox()
                },
                initCropBox: function() {
                    var b = this
                        , c = ""
                        , d = new a.Draggable({
                        el: this.cropBox
                    });
                    d.on("start", function(a) {
                        var d = (a.target.getAttribute("data-click") || "").split(":");
                        c = d.pop(),
                        c && b.dragEnable && b.emit("drag:start", c)
                    }),
                        d.on("move", function(a) {
                            c && b.dragEnable && b.emit("drag:move", c, a.dx, a.dy)
                        }),
                        d.on("end", function(a) {
                            c && b.dragEnable && b.emit("drag:end", c, a.dx, a.dy)
                        })
                },
                activation: function() {
                    this.tools.classList.remove(a.HIDE_CLASS)
                },
                showMoveGrid: function() {
                    this.cropBox.classList.add(this.prefix + d)
                },
                hideMoveGrid: function() {
                    this.cropBox.classList.remove(this.prefix + d)
                },
                showRotateGrid: function() {
                    this.cropBox.classList.add(this.prefix + e)
                },
                hideRotateGrid: function() {
                    this.cropBox.classList.remove(this.prefix + e)
                },
                setDragEnable: function(a) {
                    this.dragEnable = a
                },
                setFrameSize: function(a, b, c, d, e) {
                    this.frameWidth = a,
                        this.frameHeight = b,
                        this.marginWidth = c,
                        this.marginHeight = d,
                    e && this.render(e, !0)
                },
                renderForDragCropBox: function(a, b, c, d) {
                    var e = a.rotate % 2 !== 0
                        , f = this._getSize(a, d, e)
                        , g = this._getSize(b, d, e)
                        , h = {
                        width: f.width,
                        height: f.height,
                        x: (this.frameWidth - f.width) / 2,
                        y: (this.frameHeight - f.height) / 2
                    };
                    c.indexOf("w") >= 0 ? h.x = (this.frameWidth - g.width) / 2 + (g.width - f.width) : c.indexOf("e") >= 0 && (h.x = (this.frameWidth - g.width) / 2),
                        c.indexOf("n") >= 0 ? h.y = (this.frameHeight - g.height) / 2 + (g.height - f.height) : c.indexOf("s") >= 0 && (h.y = (this.frameHeight - g.height) / 2),
                        this._transformCropBox(h),
                        this.emit("changed", h, 0)
                },
                _getSize: function(a, b, c) {
                    var d = Math.round(a.width * b)
                        , e = Math.round(a.height * b);
                    return {
                        width: c ? e : d,
                        height: c ? d : e
                    }
                },
                render: function(a, b) {
                    var c, d;
                    a.rotate % 2 === 0 ? (c = a.width,
                        d = a.height) : (c = a.height,
                        d = a.width);
                    var e = this._getScale(c, d);
                    this._cropBoxZoom(c, d, e, b)
                },
                _getScale: function(a, b) {
                    var c = (this.frameWidth - f - this.marginWidth) / a
                        , d = (this.frameHeight - g - this.marginHeight) / b;
                    return Math.min(c, d)
                },
                _cropBoxZoom: function(a, b, c, d) {
                    a = Math.round(a * c),
                        b = Math.round(b * c);
                    var e = {
                        width: a,
                        height: b,
                        x: (this.frameWidth - a) / 2,
                        y: (this.frameHeight - b) / 2,
                        scale: c
                    };
                    d ? this._animation(e, d) : this._transformCropBox(e),
                        this.emit("changed", e, d)
                },
                _animation: function(d, e) {
                    var f = this;
                    this.flow && this.flow.stop(),
                        this.flow = new a.util.Flow,
                        this.flow.then(function(a) {
                            f.cropBox.style[c] = b + " " + e.duration + "ms " + e.easing + ", width " + e.duration + "ms " + e.easing + ", height " + e.duration + "ms " + e.easing,
                                f._transformCropBox(d),
                                a(null )
                        }).delay(e.duration).end(function(a) {
                            f.cropBox.style[c] = "",
                                f.flow = null
                        })
                },
                _transformCropBox: function(c) {
                    var d = a.util.Transform.parse(this.cropBox.style[b]);
                    for (var e in c)
                        c.hasOwnProperty(e) && ("width" === e || "height" === e ? this.cropBox.style[e] = c[e] + "px" : ("x" === e || "y" === e) && (d["translate" + e.toUpperCase()] = c[e]));
                    this.cropBox.style[b] = a.util.Transform.stringify(d)
                },
                reset: function() {
                    this.tools.classList.add(a.HIDE_CLASS)
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = a.util.getPrefix(document.body, "transform")
                , c = a.util.getPrefix(document.body, "transition")
                , d = a.crop = a.crop || {};
            d.previewControl = Observer.extend({
                init: function(a) {
                    this.previewWrap = a.previewWrap,
                        this.draggableArea = a.draggableArea,
                        this.dragEnable = !0,
                        this.initPreviewDrag()
                },
                initPreviewDrag: function() {
                    var b = this
                        , c = new a.Draggable({
                        el: this.draggableArea
                    });
                    c.on("start", function() {
                        b.dragEnable && b.emit("drag:start")
                    }),
                        c.on("move", function(a) {
                            b.dragEnable && b.emit("drag:move", a.dx, a.dy)
                        }),
                        c.on("end", function(a) {
                            b.dragEnable && b.emit("drag:end", a.dx, a.dy)
                        })
                },
                setDragEnable: function(a) {
                    this.dragEnable = a
                },
                setFrameSize: function(a, b, c) {
                    this.frameWidth = a,
                        this.frameHeight = b,
                    c && this.render(c, !1)
                },
                render: function(c, d) {
                    if (null  != c) {
                        var e = a.util.Transform.parse(this.previewWrap.style[b]);
                        this._translate(e, c),
                            this._rotate(e, c),
                            d ? this._animation(e, d) : this.previewWrap.style[b] = a.util.Transform.stringify(e)
                    }
                },
                _translate: function(a, b) {
                    a.translateX = this.frameWidth / 2 - b.centerX,
                        a.translateY = this.frameHeight / 2 - b.centerY
                },
                _rotate: function(a, b) {
                    a.rotateX = 0 === b.flipV ? 0 : 180,
                        a.rotateY = 0 === b.flipH ? 0 : 180,
                        a.rotateZ = 90 * b.rotate + b.angle
                },
                _animation: function(d, e) {
                    var f = this;
                    this.flow && this.flow.stop(),
                        this.flow = new a.util.Flow,
                        this.flow.then(function(g) {
                            f.previewWrap.style[c] = b + " " + e.duration + "ms " + e.easing,
                                f.previewWrap.style[b] = a.util.Transform.stringify(d),
                                g(null )
                        }).delay(e.duration).end(function() {
                            f.previewWrap.style[c] = "",
                                f.flow = null
                        })
                },
                reset: function() {
                    this.render({
                        centerX: 0,
                        centerY: 0,
                        flipV: 0,
                        flipH: 0,
                        rotate: 0,
                        angle: 0
                    }, !1)
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = a.util.getPrefix(document.body, "transform")
                , c = a.util.getPrefix(document.body, "transition")
                , d = 5
                , e = "rgb(0, 0, 0)"
                , f = "rgb(255, 255, 255)"
                , g = a.crop = a.crop || {};
            g.orientationControl = Observer.extend({
                init: function(a) {
                    this.protractorColor = e,
                        this.tools = a.tools,
                        this.orientationTool = a.orientationTool,
                        this.protractorWrapper = a.protractorWrapper,
                        this.protractor = a.protractor,
                        this.input = a.input,
                        this.isFlip = !1,
                        this.initProtractor(),
                        this.initInput()
                },
                initProtractor: function() {
                    var c, d = this;
                    this.drawProtractor();
                    var e = new a.Draggable({
                        el: this.protractorWrapper
                    });
                    e.on("start", function() {
                        var e = a.util.Transform.parse(d.protractor.style[b]);
                        c = e.rotateZ || 0,
                            d.emit("protractor:start")
                    }),
                        e.on("move", function(a) {
                            var b = c - a.dx / 5;
                            b > 45 ? b = 45 : -45 > b ? b = -45 : 1 > b && b > -1 && (b = 0),
                                b *= d.isFlip ? -1 : 1,
                                d.emit("protractor:move", b)
                        }),
                        e.on("end", function() {
                            d.emit("protractor:end")
                        })
                },
                initInput: function() {
                    var b = this
                        , c = "";
                    a.event.on(this.input, "keydown", function(c) {
                        c = c || window.event;
                        var e = c.which || c.keyCode;
                        if (c.ctrlKey || c.altKey || c.shiftKey || c.metaKey || 37 === e || 39 === e)
                            return !0;
                        if (e >= 48 && 57 >= e || e >= 96 && 105 >= e || 189 === e || 109 === e || 8 === e || 46 === e || 38 === e || 40 === e) {
                            var f = 38 === e ? 1 : 40 === e ? -1 : 0;
                            return 0 !== f && (d(),
                                b._changeInput(f)),
                                !0
                        }
                        return a.event.preventDefault(c),
                            !1
                    }),
                        a.event.on(this.input, "keyup", function(a) {
                            a = a || window.event;
                            var c = a.which || a.keyCode;
                            (c >= 48 && 57 >= c || c >= 96 && 105 >= c || 189 === c || 109 === c || 8 === c) && b._changeInput()
                        }),
                        a.event.on(this.input, "focus", function(a) {
                            c = b.input.value,
                                b.input.value = ""
                        }),
                        a.event.on(this.input, "blur", function(a) {
                            d()
                        });
                    var d = function() {
                        "" === b.input.value && (b.input.value = c)
                    }
                },
                _changeInput: function(a) {
                    var b = parseInt(this.input.value);
                    a = a || 0,
                    isNaN(b) || "-0" === this.input.value && 0 === a || (b += a,
                        b > 45 ? b = 45 : -45 > b && (b = -45),
                        this.emit("protractor:move", b, !0))
                },
                activation: function() {
                    this.tools.classList.remove(a.HIDE_CLASS)
                },
                changeProtractorColor: function(a) {
                    var b = this.protractor;
                    this.protractorColor = a ? e : f,
                    b !== this.protractorColor && this.drawProtractor()
                },
                drawProtractor: function() {
                    var b = this.protractor.width
                        , c = this.protractor.height
                        , e = Math.floor(b / 2)
                        , f = Math.floor(c / 2)
                        , g = this.protractor.getContext("2d");
                    g.save(),
                        g.clearRect(0, 0, this.protractor.width, this.protractor.height),
                        g.translate(e, f),
                        g.fillStyle = this.protractorColor;
                    for (var h = 2, i = a.util.degree2radian(d), j = -f + 2, k = 360 / d; k > 0; k--)
                        h = k % 6 === 0 ? 2 : 1,
                            27 > k || k > 45 ? g.globalAlpha = .3 : g.globalAlpha = 1,
                            g.beginPath(),
                            g.arc(-h, j, h, 0, 2 * Math.PI, !0),
                            g.fill(),
                            g.closePath(),
                            g.rotate(i);
                    g.restore()
                },
                showControl: function() {
                    this.orientationTool.classList.remove(a.HIDE_CLASS)
                },
                hideControl: function() {
                    this.orientationTool.classList.add(a.HIDE_CLASS)
                },
                render: function(a, b) {
                    var c = a.angle;
                    this.isFlip = !1,
                    (a.flipH + 1) * (a.flipV + 1) === 2 && (this.isFlip = !0,
                        c *= -1),
                        this._setInputValue(c),
                        b ? this._animation(c, b) : this._setProtractorRotate(c)
                },
                _animation: function(b, d) {
                    var e = this;
                    this.flow && this.flow.stop(),
                        this.flow = new a.util.Flow,
                        this.flow.then(function(a) {
                            e.protractor.style[c] = "transform " + d.duration + "ms " + d.easing,
                                e._setProtractorRotate(b),
                                a(null )
                        }).delay(d.duration).end(function(a) {
                            e.protractor.style[c] = "",
                                e.flow = null
                        })
                },
                _setProtractorRotate: function(c) {
                    var d = a.util.Transform.parse(this.protractor.style[b]);
                    d.rotateX = d.rotateX || 0,
                        d.rotateY = d.rotateY || 0,
                        d.rotateZ = c,
                        this.protractor.style[b] = a.util.Transform.stringify(d)
                },
                _setInputValue: function(a) {
                    a = Math.round(a),
                    this.input.value !== a && (this.input.value = a)
                },
                align: function(a, b) {
                    b ? this._animationAlign(a, b) : this._translateTool(a)
                },
                _animationAlign: function(d, e) {
                    var f = this;
                    this.flow && this.alignFlow.stop(),
                        this.alignFlow = new a.util.Flow,
                        this.alignFlow.then(function(a) {
                            f.orientationTool.style[c] = b + " " + e.duration + "ms " + e.easing,
                                f._translateTool(d),
                                a(null )
                        }).delay(e.duration).end(function(a) {
                            f.orientationTool.style[c] = "",
                                f.flow = null
                        })
                },
                _translateTool: function(c) {
                    var d = Math.max(c.width, 552)
                        , e = Math.floor(c.x + c.width / 2)
                        , f = Math.floor(c.y + c.height);
                    this.orientationTool.style.width = d + "px",
                        this.orientationTool.style["margin-left"] = -d / 2 + "px";
                    var g = a.util.Transform.parse(this.orientationTool.style[b]);
                    g.translateX = e,
                        g.translateY = f,
                        this.orientationTool.style[b] = a.util.Transform.stringify(g)
                },
                reset: function() {
                    this.tools.classList.add(a.HIDE_CLASS)
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = 100
                , c = 100
                , d = 1e3
                , e = "state_item"
                , f = "info_locked"
                , g = "on"
                , h = "w"
                , i = "h"
                , j = "resize"
                , k = "vignette"
                , l = 6
                , m = !0
                , n = Observer.extend({
                init: function() {
                    this.editData = {}
                },
                previewResize: function(a, b) {
                    this.previewWidth = a,
                        this.previewHeight = b,
                        this._emitUpdateLimit()
                },
                initData: function(a, b) {
                    a = a || {},
                        this.editData = {
                            scaleX: a.scaleX || 1,
                            scaleY: a.scaleY || 1
                        },
                        this.editData.width = this.previewWidth * this.editData.scaleX,
                        this.editData.height = this.previewHeight * this.editData.scaleY,
                        this.emit("change", this.getEditData(), !!b)
                },
                resize: function(a, b, c) {
                    var d = this.ratioLock;
                    c = c || !1,
                        this.setLock(c),
                        "origin" === a ? this._setSize(this.previewWidth, this.previewHeight) : a === h ? this.resizeWidth(b) : this.resizeHeight(b),
                        this.setLock(d);
                },
                resizeWidth: function(a, d) {
                    var e = !1;
                    a > this.previewWidth ? (e = !0,
                        a = this.previewWidth) : b > a && (e = !0,
                        a = b);
                    var f = this.editData.height;
                    this.ratio && (f = a / this.ratio,
                        f > this.previewHeight ? (e = !0,
                            f = this.previewHeight) : c > f && (e = !0,
                            f = c),
                        a = f * this.ratio),
                    (!e || d) && this._setSize(a, f)
                },
                resizeHeight: function(a, b) {
                    var d = !1;
                    a > this.previewHeight ? (d = !0,
                        a = this.previewHeight) : c > a && (d = !0,
                        a = c);
                    var e = this.editData.width;
                    this.ratio && (e = a * this.ratio,
                        e > this.previewWidth ? (d = !0,
                            e = this.previewWidth) : c > e && (d = !0,
                            e = c),
                        a = e / this.ratio),
                    (!d || b) && this._setSize(e, a)
                },
                _setSize: function(a, b) {
                    a = Math.round(a),
                        b = Math.round(b),
                        this.editData.width = a,
                        this.editData.height = b,
                        this.editData.scaleX = a / this.previewWidth,
                        this.editData.scaleY = b / this.previewHeight,
                        this._emitUpdateLimit(),
                        this.emit("change", this.getEditData(), !0)
                },
                setLock: function(a) {
                    this.ratioLock = a,
                        this.ratio = a ? this.editData.width / this.editData.height : 0,
                        this._emitUpdateLimit()
                },
                _emitUpdateLimit: function() {
                    this.emit("updateLimit", this.previewWidth, this.previewHeight, this.editData.width / this.editData.height)
                },
                getEditData: function() {
                    return JSON.parse(JSON.stringify(this.editData))
                },
                getChanges: function() {
                    var a = {
                        scaleX: this.editData.scaleX,
                        scaleY: this.editData.scaleY
                    };
                    return 1 !== a.scaleX || 1 !== a.scaleY ? a : null
                },
                reset: function() {
                    this.initData({}, !1)
                }
            })
                , o = Observer.extend({
                init: function(a) {
                    this.prefix = a.prefix,
                        this.tool = a.tool,
                        this.heightInput = a.heightInput,
                        this.widthInput = a.widthInput,
                        this.lock = a.lock,
                        this.controlWrap = a.controlWrap,
                        this.control = a.control,
                        this.outline = a.outline,
                        this.resizeBtns = a.resizeBtns,
                        this.initSizeValue()
                },
                initSizeValue: function() {
                    var b = this
                        , c = null
                        , d = ""
                        , e = function(d) {
                            d = d || window.event;
                            var e = d.which || d.keyCode;
                            if (d.ctrlKey || d.altKey || d.shiftKey || d.metaKey || 37 === e || 39 === e)
                                return !0;
                            if (e >= 48 && 57 >= e || e >= 96 && 105 >= e || 8 === e || 46 === e || 38 === e || 40 === e) {
                                var f = 0;
                                return 38 === e ? f = 1 : 40 === e && (f = -1),
                                0 !== f && (i(),
                                    b.checkInput(c, f, !1)),
                                    !0
                            }
                            return a.event.preventDefault(d),
                                !1
                        }
                        , f = function(a) {
                            a = a || window.event;
                            var d = a.which || a.keyCode;
                            (d >= 48 && 57 >= d || d >= 96 && 105 >= d) && b.checkInput(c, 0, !1)
                        }
                        , g = function(b) {
                            c = a.event.getTarget(b),
                                d = c.value,
                                c.value = ""
                        }
                        , h = function(a) {
                            i(),
                                b.checkInput(c, 0, !0),
                                c = null
                        }
                        , i = function() {
                            c && "" === c.value && (c.value = d)
                        }
                        ;
                    a.event.on(this.widthInput, "keydown", e),
                        a.event.on(this.heightInput, "keydown", e),
                        a.event.on(this.widthInput, "keyup", f),
                        a.event.on(this.heightInput, "keyup", f),
                        a.event.on(this.widthInput, "focus", g),
                        a.event.on(this.heightInput, "focus", g),
                        a.event.on(this.widthInput, "blur", h),
                        a.event.on(this.heightInput, "blur", h)
                },
                checkInput: function(a, b, c) {
                    if (a) {
                        var d = parseInt(a.value)
                            , e = a === this.widthInput;
                        isNaN(d) || (b = b || 0,
                            d += b,
                            this.emit("value:change", d, e, c))
                    }
                },
                previewResize: function(a, b) {
                    this.previewWidth = a,
                        this.previewHeight = b
                },
                disabledResizeBtns: function(a, b, c, d) {
                    for (var e, f, g = this.resizeBtns.length - 1; g >= 0; g--)
                        e = this.resizeBtns[g],
                            f = (e.getAttribute("data-click") || "").split(":"),
                            e.disabled = f.length > 3 && (parseInt(f[3]) > (f[2] === h ? a : b) || parseInt(f[3]) < (f[2] === h ? c : d))
                },
                render: function(a, b) {
                    var c = parseInt(this.widthInput.value)
                        , d = parseInt(this.heightInput.value)
                        , e = Math.round(a.width)
                        , f = Math.round(a.height);
                    this.widthInput.value = e,
                        this.heightInput.value = f,
                        this.animateControl(c !== e, d !== f),
                        this.selectResizeBtns(a.width, a.height)
                },
                animateControl: function(b, c) {
                    var e = this
                        , f = this.prefix + "size_outline_width"
                        , g = this.prefix + "size_outline_height";
                    this.controlFlow && this.controlFlow.stop(),
                        this.controlFlow = (new a.util.Flow).then(function(a) {
                            b && e.outline.classList.add(f),
                            c && e.outline.classList.add(g),
                                a(null )
                        }).delay(d).end(function(a) {
                            e.outline.classList.remove(f),
                                e.outline.classList.remove(g)
                        })
                },
                selectResizeBtns: function(a, b) {
                    for (var c, d, e = this.resizeBtns.length - 1; e >= 0; e--)
                        c = this.resizeBtns[e],
                            d = (c.getAttribute("data-click") || "").split(":"),
                            c.classList["origin" === d[2] && this.previewWidth === a && this.previewHeight === b || d[2] === h && parseInt(d[3]) === a || d[2] !== h && parseInt(d[3]) === b ? "add" : "remove"](this.prefix + g)
                },
                toggleLock: function(a) {
                    "undefined" == typeof a && (a = !this.tool.classList.contains(this.prefix + f)),
                        a ? this.tool.classList.add(this.prefix + f) : this.tool.classList.remove(this.prefix + f),
                        this.emit("lock:change", a)
                },
                showTool: function() {
                    this.control.classList.remove(a.HIDE_CLASS)
                },
                hideTool: function() {
                    this.control.classList.add(a.HIDE_CLASS)
                },
                reset: function() {
                    this.data = null ,
                        this.toggleLock(m)
                }
            });
            a.addModule("Resize", {
                init: function(b, c, d) {
                    this.sandbox = b,
                        this.frame = c,
                        this.prefix = d.prefix || "",
                        this.state = a.$$p(".menu_sub_edit .menu_btn_size")[0],
                        this.initResizeBtn(d),
                        this.initEditDataManager(),
                        this.initView(),
                        this.bindSandboxEvent()
                },
                initResizeBtn: function(b) {
                    var c, d, e = a.$$p(".sub_detail_size .list_size")[0], f = "", g = b[j] || [{
                            type: "w",
                            size: "320"
                        }, {
                            type: "w",
                            size: "400"
                        }, {
                            type: "w",
                            size: "580"
                        }, {
                            type: "w",
                            size: "640"
                        }, {
                            type: "w",
                            size: "700"
                        }, {
                            type: "w",
                            size: "1024"
                        }];
                    g.length > l && g.splice(l),
                        d = g.length;
                    for (var h = 0; d > h; h++)
                        c = g[h],
                            f += this.getResizeBtnHtmlStr(c.type, c.size, c.label);
                    e.innerHTML = f
                },
                getResizeBtnHtmlStr: function(a, b, c) {
                    var d = a === h || a === i
                        , e = d ? a + ":" + b : a
                        , f = c || (d ? b : a);
                    return '<li><button type="button" class="' + this.prefix + 'btn_info" data-click="size:type:' + e + '"><span class="' + this.prefix + "bg_photos " + this.prefix + "size_" + a + '"><span class="' + this.prefix + 'txt_vertical">' + f + "</span></span></button></li>"
                },
                initEditDataManager: function() {
                    var a = this;
                    this.sizeDataManager = new n,
                        this.sizeDataManager.on("change", function(b, c) {
                            a.sandbox.emit("change:preview:scale", b, {
                                animation: c
                            }),
                                a.tool.render(b, c),
                                a.sandbox.emit("mode:change", {
                                    previewAlign: !0
                                })
                        }),
                        this.sizeDataManager.on("updateLimit", function(d, e, f) {
                            var g = d
                                , h = e
                                , i = b
                                , j = c;
                            if (f) {
                                var k = h * f
                                    , l = g / f;
                                g > k ? g = k : h > l && (h = l),
                                    k = j * f,
                                    l = i / f,
                                    k > i ? i = k : l > j && (j = l)
                            }
                            a.tool.disabledResizeBtns(g, h, i, j)
                        })
                },
                initView: function() {
                    var b = this
                        , c = a.$$p(".preview_wrapper")[0]
                        , d = a.$$p(".sub_detail_size .info_size")[0]
                        , e = a.$$p(".preview_noscale_wrapper")[0]
                        , f = a.$$p(".controls_size", e)[0];
                    this.preview = a.$$p(".preview_canvas", c)[0],
                        this.tool = new o({
                            prefix: this.prefix,
                            tool: d,
                            widthInput: a.$$p(".size_width .inp_photos", d)[0],
                            heightInput: a.$$p(".size_height .inp_photos", d)[0],
                            lock: a.$$p(".btn_lock", d)[0],
                            controlWrap: e,
                            control: f,
                            outline: a.$$p(".size_outline", f)[0],
                            resizeBtns: a.$$p(".list_size button", this.frame)
                        }),
                        this.tool.on("value:change", function(a, c, d) {
                            b.sizeDataManager["resize" + (c ? "Width" : "Height")](a, d)
                        }),
                        this.tool.on("lock:change", function(a) {
                            b.sizeDataManager.setLock(a)
                        })
                },
                bindSandboxEvent: function() {
                    var a = this;
                    this.sandbox.on("size:enter", function(b, c) {
                        a.activation()
                    }),
                        this.sandbox.on("size:ok", function() {
                            a.applyChanges(),
                                a.reset()
                        }),
                        this.sandbox.on("size:back", function() {
                            a.reset()
                        }),
                        this.sandbox.on("size:type", function(b) {
                            var c = b.args[0]
                                , d = parseInt(b.args[1]);
                            a.sizeDataManager.resize(c, d, !0)
                        }),
                        this.sandbox.on("size:lock", function(b) {
                            a.tool.toggleLock()
                        }),
                        this.sandbox.on("history:change", function(b) {
                            a.setState(b && b[j])
                        }),
                        this.sandbox.on(["preview:onload", "preview:resize"], this.setPreviewSize.bind(this))
                },
                setState: function(a) {
                    this.state.classList[a ? "add" : "remove"](this.prefix + e)
                },
                activation: function() {
                    var a = this;
                    this.tool.showTool(),
                        this.sandbox.emit("mode:change", {
                            scaleFix: !0
                        }),
                        this.sandbox.emit("history:current", function(b) {
                            var c = b[j];
                            delete b[j],
                                delete b[k],
                                a.sandbox.emit("paint:preview", b),
                                a.sizeDataManager.initData(c),
                                a.tool.toggleLock(m),
                                a.sandbox.emit("decoOverlay:check", b)
                        })
                },
                setPreviewSize: function(a) {
                    var b = a.w
                        , c = a.h;
                    this.sizeDataManager.previewResize(b, c),
                        this.tool.previewResize(b, c)
                },
                applyChanges: function() {
                    var b = this.sizeDataManager.getChanges()
                        , c = {};
                    c[j] = b,
                        this.sandbox.emit("history:add", c),
                        this.sandbox.emit("reset:deco"),
                        a.tiara.sendLog(a.tiara.OK, j, b ? a.tiara.USE : a.tiara.NOTUSE)
                },
                reset: function() {
                    this.sizeDataManager.reset(),
                        this.tool.hideTool(),
                        this.tool.reset(),
                        this.sandbox.emit("mode:change", {
                            scaleFix: !1,
                            previewAlign: !0
                        })
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = a.Resizable.BoxView.extend({
                color: "#fff",
                fontWeight: "normal",
                init: function(a, b, c) {
                    this._super(a, b, c),
                        this._bindInputEvent()
                },
                changeScale: function(a) {
                    var b = a ? a : 1
                        , c = b / this.currentScale;
                    this.lastUpdatedInfo && (this._saveCurrentInfo({
                        left: this.lastUpdatedInfo.left * c,
                        top: this.lastUpdatedInfo.top * c,
                        width: this.lastUpdatedInfo.width * c,
                        height: this.lastUpdatedInfo.height * c
                    }),
                        this._update(this.lastUpdatedInfo)),
                        this.currentScale = b;
                    var d = (this.lastUpdatedInfo.fontSize || this.fontSize) * c;
                    this.textarea.style.fontSize = d + "px",
                        this._saveCurrentInfo({
                            fontSize: d
                        })
                },
                toggleColor: function() {
                    "#fff" === this.color ? this.color = "#000" : this.color = "#fff",
                        this.textarea.style.color = this.color,
                        this._saveCurrentInfo({
                            color: this.color
                        }),
                        this.queue.emit("update:menu", this.toJson())
                },
                toggleBold: function() {
                    "normal" === this.fontWeight ? this.fontWeight = "bold" : this.fontWeight = "normal",
                        this.textarea.style.fontWeight = this.fontWeight,
                        this._saveCurrentInfo({
                            fontWeight: this.fontWeight
                        }),
                        this.queue.emit("update:menu", this.toJson())
                },
                _bindEvent: function() {
                    var b = this;
                    this._onmousedown = function(a) {
                        if ("edit" !== b.mode) {
                            var c = window.event || a;
                            b._preventEvent(a),
                                b.onmousedown(c)
                        }
                    }
                        ,
                        this._onmouseup = function(a) {
                            if ("edit" !== b.mode) {
                                var c = window.event || a;
                                b._preventEvent(a),
                                    b.onmouseup(c)
                            }
                        }
                        ,
                        this._onmousemove = function(a) {
                            if ("edit" !== b.mode) {
                                var c = window.event || a;
                                b._preventEvent(a),
                                    b.onmousemove(c)
                            }
                        }
                        ,
                        a.event.on(this.el, this.EVENT_NAME.START, function(a) {
                            b._onmousedown(a)
                        })
                },
                _render: function() {
                    this._super();
                    var a = document;
                    this.textarea = a.createElement("textarea"),
                        this.textarea.placeholder = "텍스트는 여기에",
                        this.el.appendChild(this.textarea)
                },
                _setBoxInfo: function() {
                    this._super(),
                        this.fontSize = this._getAttr("font-size", this.textarea)
                },
                _saveCurrentInfo: function(a) {
                    if (this.lastUpdatedInfo || (this.lastUpdatedInfo = {}),
                            a)
                        for (var b in a)
                            a.hasOwnProperty(b) && (this.lastUpdatedInfo[b] = a[b]);
                    else
                        this.lastUpdatedInfo = {
                            left: this._getAttr("left"),
                            top: this._getAttr("top"),
                            width: this._getAttr("width"),
                            height: this._getAttr("height"),
                            angle: this._getCurrentAngle(),
                            fontSize: this._getAttr("font-size", this.textarea)
                        }
                },
                _bindExternalEvent: function() {
                    var b = this;
                    a.event.on(this.el, "click", function(a) {
                        b.queue.emit("click:boxView")
                    }),
                        this.queue.on("resize:box:start", function() {
                            b._setBoxInfo()
                        }),
                        this.queue.on("rotate:box:start", function(a) {
                            b._setBoxInfo(),
                                b.rotateStartX = a.x,
                                b.rotateStartY = a.y
                        }),
                        this.queue.on("resize:box", function(a) {
                            b._resize(a)
                        }),
                        this.queue.on("rotate:box", function(a) {
                            b._rotate(a)
                        }),
                        this.queue.on("change:mode", function(a) {
                            b.mode = a,
                                "select" === a ? b.isDraggable = !1 : b.isDraggable = !0,
                                "edit" === a ? (b.textarea.disabled = "",
                                    b.textarea.focus()) : (b.textarea.disabled = "disabled",
                                    b.textarea.blur())
                        })
                },
                _resize: function(a) {
                    this._super(a),
                        this._setFontSize()
                },
                _setFontSize: function() {
                    var a = this._getAttr("width")
                        , b = this.fontSize / this.width
                        , c = Math.round(a * b);
                    this._saveCurrentInfo({
                        fontSize: c
                    }),
                        this.textarea.style.fontSize = c + "px"
                },
                _bindInputEvent: function() {
                    var a = this;
                    this.textarea.addEventListener ? this.textarea.addEventListener("input", function(b) {
                        a._syncProxyFromInput(b)
                    }, !1) : this.textarea.attachEvent && this.textarea.attachEvent("onpropertychange", function(b) {
                        a._syncProxyFromInput(b)
                    })
                },
                _syncProxyFromInput: function(b) {
                    var c = a.$$(".text_proxy .proxy_get_size")[0];
                    c.style.fontSize = this._getAttr("font-size", this.textarea) + "px",
                        c.style.fontFamily = "sans-serif";
                    var d = this.textarea.value || "";
                    c.innerHTML = " " + d.replace(/>/g, ">").replace(/</g, "<") + " ";
                    var e = c.getBoundingClientRect()
                        , f = parseInt(e.width, 10)
                        , g = parseInt(e.height, 10)
                        , h = this._getAttr("left") + this._getAttr("width") / 2
                        , i = this._getAttr("top") + this._getAttr("height") / 2
                        , j = h
                        , k = i + (g / 2 - this._getAttr("height") / 2)
                        , l = this._lowTranslate(j, k, -h, -i);
                    l = this._lowRotate(l.x, l.y, this._getCurrentAngle()),
                        l = this._lowTranslate(l.x, l.y, h, i);
                    var m = parseInt(l.x - f / 2, 10)
                        , n = parseInt(l.y - g / 2, 10);
                    this._saveCurrentInfo({
                        left: m,
                        top: n,
                        width: f,
                        height: g,
                        angle: this._getCurrentAngle()
                    }),
                        this._update(this.lastUpdatedInfo)
                },
                toJson: function() {
                    return {
                        left: this._getAttr("left"),
                        top: this._getAttr("top"),
                        width: this._getAttr("width"),
                        height: this._getAttr("height"),
                        angle: this._getCurrentAngle(),
                        scale: this.currentScale,
                        color: this.color,
                        fontSize: this._getAttr("font-size", this.textarea),
                        fontWeight: this.fontWeight,
                        fontFamily: window.getComputedStyle(this.textarea).getPropertyValue("font-family"),
                        desc: this.textarea.value.replace(/\n/g, "↵")
                    }
                },
                set: function(a) {
                    this._super(a),
                        a.fontSize ? (this._saveCurrentInfo({
                            fontSize: a.fontSize
                        }),
                            this.textarea.style.fontFamily = a.fontFamily,
                            this.textarea.value = a.desc.replace(/↵/g, "\n"),
                            this.color = a.color || this.color,
                            this.fontWeight = a.fontWeight || this.fontWeight,
                            this.textarea.style.color = this.color,
                            this.textarea.style.fontWeight = this.fontWeight) : this._saveCurrentInfo({
                            color: this.color,
                            fontSize: this._getAttr("font-size", this.textarea),
                            fontWeight: this.fontWeight,
                            fontFamily: window.getComputedStyle(this.textarea).getPropertyValue("font-family"),
                            desc: ""
                        })
                }
            });
            a.TextBox = a.TextBox || {},
                a.TextBox.BoxView = b
        }(window.photos = "undefined" == typeof window.photos ? {} : window.photos),
        function(a) {
            "use strict";
            var b = a.Resizable.App.extend({
                BoxView: a.TextBox.BoxView,
                init: function(a) {
                    this._super(a),
                        this.selected = !1
                },
                toggleColor: function() {
                    this.boxView.toggleColor()
                },
                toggleBold: function() {
                    this.boxView.toggleBold()
                },
                isSelected: function(b) {
                    for (var c = a.event.getTarget(b); c && c.tagName && "html" !== c.tagName.toLowerCase(); ) {
                        if (c === this.el)
                            return !0;
                        c = c.parentNode
                    }
                    return !1
                },
                _createBoxElement: function() {
                    var a = document
                        , b = a.createElement("div");
                    return b.className = "resizable textbox movable no_border no_handle",
                        b
                },
                _initBoxView: function() {
                    var a = this;
                    this.on("click:boxView", function() {
                        this.selectable && a._onClickBoxView()
                    }),
                        this.on("reset:selected", function() {
                            a.selected = !1
                        }),
                        this.boxView = new this.BoxView(this.el,this,this.options)
                },
                _onClickBoxView: function() {
                    this.selected ? this._setEditMode() : this._setSelectMode()
                },
                _setBlurMode: function() {
                    this._super(),
                        this.selected = !1
                },
                _setSelectMode: function(a) {
                    this._super(a),
                        this.selected = !0
                },
                _setEditMode: function() {
                    this._hideHandle(),
                        this._deleteMovable(),
                        this.mode = "edit",
                        this.emit("change:mode", "edit")
                }
            });
            a.TextBox = a.TextBox || {},
                a.TextBox.App = b
        }(window.photos = "undefined" == typeof window.photos ? {} : window.photos),
        function(a) {
            "use strict";
            var b = a.Resizable.BoxView.extend({
                alpha: 1,
                toggleAlpha: function() {
                    1 === this.alpha ? this.alpha = .5 : this.alpha = 1,
                        this._drawOnCanvas(this.tmpCanvas, this.lastUpdatedInfo.width, this.lastUpdatedInfo.height),
                        this._saveCurrentInfo({
                            alpha: this.alpha
                        }),
                        this.queue.emit("update:menu", this.toJson())
                },
                _render: function() {
                    this._super();
                    var a = document;
                    this.canvas = a.createElement("canvas"),
                        this.el.appendChild(this.canvas)
                },
                _update: function(a) {
                    this._super(a),
                        this._drawOnCanvas(this.tmpCanvas, a.width, a.height)
                },
                _drawOnCanvas: function(a, b, c) {
                    if (a) {
                        var d = this.canvas.getContext("2d");
                        this.canvas.width = b,
                            this.canvas.height = c,
                            d.globalAlpha = this.alpha,
                            d.drawImage(a, 0, 0, a.width, a.height, 0, 0, this.canvas.width, this.canvas.height)
                    }
                },
                _saveCurrentInfo: function(a) {
                    if (this.lastUpdatedInfo || (this.lastUpdatedInfo = {}),
                            a)
                        for (var b in a)
                            a.hasOwnProperty(b) && (this.lastUpdatedInfo[b] = a[b]);
                    else
                        this.lastUpdatedInfo = {
                            left: this._getAttr("left"),
                            top: this._getAttr("top"),
                            width: this._getAttr("width"),
                            height: this._getAttr("height"),
                            angle: this._getCurrentAngle(),
                            alpha: this.alpha
                        }
                },
                toJson: function() {
                    return {
                        left: this._getAttr("left"),
                        top: this._getAttr("top"),
                        width: this._getAttr("width"),
                        height: this._getAttr("height"),
                        angle: this._getCurrentAngle(),
                        alpha: this.alpha,
                        scale: this.currentScale,
                        dataURL: this.tmpCanvas.toDataURL()
                    }
                },
                set: function(a) {
                    this.tmpCanvas = a.canvas,
                        this._drawOnCanvas(this.tmpCanvas, a.width, a.height),
                        this._saveCurrentInfo({
                            left: a.left,
                            top: a.top,
                            width: a.width,
                            height: a.height,
                            angle: a.angle,
                            alpha: a.alpha
                        }),
                        this.alpha = a.alpha
                }
            });
            a.ImageBox = a.ImageBox || {},
                a.ImageBox.BoxView = b
        }(window.photos = "undefined" == typeof window.photos ? {} : window.photos),
        function(a) {
            "use strict";
            var b = a.Resizable.App.extend({
                BoxView: a.ImageBox.BoxView,
                "new": function(a, b) {
                    this.wrapEl.appendChild(this.el);
                    var c = this.wrapEl.getBoundingClientRect()
                        , d = c.width / a
                        , e = c.height / a;
                    this.boxView.set({
                        canvas: b,
                        left: d / 2 - b.width / 2,
                        top: e / 2 - b.height / 2,
                        width: b.width,
                        height: b.height,
                        angle: 0,
                        alpha: 1
                    }),
                        this.boxView.changeScale(a),
                        this._setSelectMode()
                },
                add: function(a, b) {
                    this.wrapEl.appendChild(this.el),
                        this.boxView.set(b),
                        this.boxView.setCurrentScale(b.scale),
                        this.boxView.changeScale(a)
                },
                toggleAlpha: function() {
                    this.boxView.toggleAlpha()
                }
            });
            a.ImageBox = a.ImageBox || {},
                a.ImageBox.App = b
        }(window.photos = "undefined" == typeof window.photos ? {} : window.photos),
        function(a) {
            "use strict";
            var b = a.deco = a.deco || {};
            b.view = Class.extend({
                DecoTool: null ,
                init: function(a, b, c) {
                    this.sandbox = a,
                        this.historyData = null ,
                        this.subMenuName = "deco",
                        this.state = null ,
                        this.prefix = c.prefix || "",
                        this.initView(b),
                        this.bindEvent()
                },
                initView: function(b) {
                    if (!this.preview) {
                        var c = a.$$p(".preview_wrapper", b)[0];
                        this.preview = a.$$p(".preview_canvas", c)[0],
                            this.overlay = a.$$p(".controls_deco", c)[0],
                            this.menuBtn = a.$$p(".info_" + this.subMenuName, b)[0]
                    }
                },
                bindEvent: function() {
                    this.bindMenuEvent(),
                        this.bindExternalEvent()
                },
                bindMenuEvent: function() {
                    this.sandbox.on(this.subMenuName + ":enter", this.onMenuEnter.bind(this)),
                        this.sandbox.on(this.subMenuName + ":ok", this.onMenuOk.bind(this)),
                        this.sandbox.on(this.subMenuName + ":back", this.onMenuBack.bind(this))
                },
                bindExternalEvent: function() {
                    this.sandbox.on("preview:onload", this.onPreviewLoad.bind(this)),
                        this.sandbox.on("editor:change", this.onImageChange.bind(this)),
                        this.sandbox.on("preview:scale:changed", this.onChangeScale.bind(this)),
                        this.sandbox.on("history:change", this.onHistoryChange.bind(this)),
                        this.sandbox.on("reset:deco", this.onReset.bind(this))
                },
                onMenuEnter: function() {
                    var a = this;
                    this.sandbox.emit("mode:change", {
                        previewAlign: !0,
                        magnifierEnable: !1,
                        previewDraggable: !1
                    }),
                        this.sandbox.emit("history:current", function(b) {
                            a.sandbox.on("preview:animate:end", function c() {
                                a.sandbox.off("preview:animate:end", c),
                                    a.onMenuEnterEnd(b)
                            })
                        })
                },
                onMenuEnterEnd: function(a) {
                    a[this.subMenuName] && (this.tool ? this.tool.enable() : this.createDecoTool(),
                        this.tool.add(a[this.subMenuName])),
                        this.historyData = a,
                        this.showMenuBtn()
                },
                onMenuOk: function() {
                    this.tool && !this.tool.isEmpty() ? (this.tool.disable(),
                        this.historyData[this.subMenuName] = this.tool.toJson()) : this.historyData[this.subMenuName] && (this.historyData[this.subMenuName] = null ),
                        a.tiara.sendLog(a.tiara.OK, this.subMenuName, this.historyData[this.subMenuName] ? a.tiara.USE : a.tiara.NOTUSE),
                        this.sandbox.emit("history:add", this.historyData),
                        this.historyData = null ,
                        this.sandbox.emit("mode:change", {
                            previewAlign: !0,
                            magnifierEnable: !0,
                            previewDraggable: !0
                        }),
                        this.hideMenuBtn()
                },
                onMenuBack: function() {
                    this.historyData[this.subMenuName] ? (this.tool || this.createDecoTool(),
                        this.tool.add(this.historyData[this.subMenuName]),
                        this.tool.disable()) : this.tool && (this.tool.disable(),
                        this.tool.reset()),
                        this.historyData = null ,
                        this.sandbox.emit("mode:change", {
                            previewAlign: !0,
                            magnifierEnable: !0,
                            previewDraggable: !0
                        }),
                        this.hideMenuBtn()
                },
                onPreviewLoad: function() {
                    var a = this;
                    this.sandbox.emit("history:current", function(b) {
                        a.historyData = b,
                        b[a.subMenuName] && (a.tool || a.createDecoTool(),
                            a.tool.add(b[a.subMenuName]),
                            a.tool.disable())
                    })
                },
                onImageChange: function() {
                    this.tool && this.tool.reset()
                },
                onChangeScale: function(a) {
                    this.tool && this.tool.changeScale(a)
                },
                onHistoryChange: function(a) {
                    this.setState(a && a[this.subMenuName])
                },
                setState: function(a) {
                    a && 0 !== parseInt(a) ? this.state.classList.add(this.prefix + "state_item") : this.state.classList.remove(this.prefix + "state_item")
                },
                onReset: function() {
                    this.tool && this.tool.reset(),
                        this.sandbox.emit("history:remove", this.subMenuName)
                },
                showMenuBtn: function() {
                    this.menuBtn.classList.remove(a.HIDE_CLASS)
                },
                hideMenuBtn: function() {
                    this.menuBtn.classList.add(a.HIDE_CLASS)
                },
                createDecoTool: function() {
                    this.tool && (this.tool.clear(),
                        this.tool = null ),
                        this.tool = new this.DecoTool(this.overlay,{},this.onMenuUpdate.bind(this))
                },
                onMenuUpdate: function(a) {}
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            a.addModule("DecoOverlay", {
                init: function(b, c, d) {
                    this.sandbox = b;
                    var e = a.$$p(".preview_wrapper", c)[0];
                    this.preview = a.$$p(".preview_canvas", e)[0],
                        this.overlay = a.$$p(".controls_deco", e)[0],
                        this.prefix = d.prefix || "",
                        this._bindEvent()
                },
                _bindEvent: function() {
                    var a = this;
                    this.sandbox.on("decoOverlay:check", function(b) {
                        if (a._hasDecoObject(b)) {
                            var c = (new Date).getTime();
                            if (!confirm("편집을 하면 꾸미기 이미지가 사라집니다. 계속하시겠습니까?")) {
                                var d = (new Date).getTime();
                                d - c > 50 && setTimeout(function() {
                                    a.sandbox.emit("detailmenu", {
                                        args: ["back"]
                                    }),
                                        a.sandbox.emit("detailmenu:back")
                                }, 0)
                            }
                        }
                    }),
                        this.sandbox.on("decoOverlay:hide", this._hide.bind(this)),
                        this.sandbox.on("detailmenu", function() {
                            a._show()
                        }),
                        this.sandbox.on("preview:onload", function() {
                            a._resizeOverlay()
                        })
                },
                _show: function() {
                    this.overlay.classList.remove(this.prefix + "deco_off")
                },
                _hide: function() {
                    this.overlay.classList.add(this.prefix + "deco_off")
                },
                _resizeOverlay: function() {
                    (this.overlay.width !== this.preview.width || this.overlay.height !== this.preview.height) && (this.overlay.width = this.preview.width,
                        this.overlay.height = this.preview.height)
                },
                _hasDecoObject: function(a) {
                    return ["text", "watermark", "sticker"].some(function(b) {
                        return a[b] && 0 < a[b].length
                    })
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            a.TextTool = a.ResizableTool.extend({
                _addBox: function(b) {
                    var c = this
                        , d = new a.TextBox.App({
                        wrapEl: this.el
                    });
                    d.on("remove:box", function() {
                        c.remove(d)
                    }),
                        d.on("resize:box:end", function() {
                            c.moved = !0
                        }),
                        d.on("update:menu", function(a) {
                            c.updateMenu(a)
                        }),
                        b ? d.add(this.startScale, b) : (d["new"](this.startScale),
                            this._select(d)),
                        this.boxes.push(d)
                },
                toggleColor: function() {
                    this.selectedBox && this.selectedBox.toggleColor()
                },
                toggleBold: function() {
                    this.selectedBox && this.selectedBox.toggleBold()
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            a.addModule("Text", a.deco.view.extend({
                DecoTool: a.TextTool,
                init: function(b, c, d) {
                    this.sandbox = b,
                        this.historyData = null ,
                        this.subMenuName = "text",
                        this.state = a.$$p(".menu_btn_" + this.subMenuName, c)[0],
                        this.prefix = d.prefix || "",
                        this.colorBtn = a.$$p(".btn_text", c)[0],
                        this.boldBtn = a.$$p(".btn_bold", c)[0],
                        this.initView(c),
                        this.bindEvent()
                },
                bindMenuEvent: function() {
                    this._super(),
                        this.sandbox.on("text:add", this._onAddText.bind(this)),
                        this.sandbox.on("text:color", this._onChangeColor.bind(this)),
                        this.sandbox.on("text:bold", this._onChangeBold.bind(this)),
                        this.sandbox.on("text:reset", this._onClickReset.bind(this))
                },
                onMenuEnterEnd: function(a) {
                    this._super(a),
                        this._onAddText()
                },
                _onAddText: function() {
                    this.tool || this.createDecoTool(),
                        this.tool.add()
                },
                _onChangeColor: function() {
                    this.tool && !this.tool.isEmpty() && this.tool.toggleColor()
                },
                _onChangeBold: function() {
                    this.tool && !this.tool.isEmpty() && this.tool.toggleBold()
                },
                _onClickReset: function() {
                    this.tool && this.tool.reset()
                },
                onMenuUpdate: function(a) {
                    "#000" === a.color ? this.colorBtn.classList.add(this.prefix + "on") : this.colorBtn.classList.remove(this.prefix + "on"),
                        "bold" === a.fontWeight ? this.boldBtn.classList.add(this.prefix + "on") : this.boldBtn.classList.remove(this.prefix + "on")
                }
            }))
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            a.WatermarkTool = a.ResizableTool.extend({
                add: function(a) {
                    var b = this;
                    if ("object" == typeof a)
                        b.reset(),
                            a.forEach(function(a) {
                                b._addBox(a)
                            });
                    else {
                        if (this.boxes.length === this.MAX_SIZE)
                            return void alert("5개 까지 추가 가능합니다.");
                        b._addBox(a)
                    }
                },
                _addBox: function(b) {
                    var c = this
                        , d = new a.ImageBox.App({
                        wrapEl: this.el
                    });
                    d.on("remove:box", function() {
                        c.remove(d)
                    }),
                        d.on("resize:box:end", function() {
                            c.moved = !0
                        }),
                        d.on("update:menu", function(a) {
                            c.updateMenu(a)
                        });
                    var e = new Image;
                    "string" == typeof b ? (e.onload = function() {
                        var a = document.createElement("canvas");
                        c._drawOnCanvas(e, a),
                            d["new"](c.startScale, a),
                            c._select(d)
                    }
                        ,
                        e.src = b) : (e.onload = function() {
                        var a = document.createElement("canvas");
                        c._drawOnCanvas(e, a),
                            c._setStartScale(),
                            b.canvas = a,
                            d.add(c.startScale, b)
                    }
                        ,
                        e.src = b.dataURL),
                        this.boxes.push(d)
                },
                _drawOnCanvas: function(a, b) {
                    var c = b.getContext("2d")
                        , d = this._getCanvasSize(a);
                    b.width = d.width,
                        b.height = d.height,
                        c.drawImage(a, 0, 0, b.width, b.height)
                },
                _getCanvasSize: function(a) {
                    var b, c, d = this.el.getBoundingClientRect(), e = d.width, f = d.height, g = a.width, h = a.height, i = e + f, j = g + h;
                    return j > i / 2 ? g > e / 2 ? (b = e / 2,
                        c = h * (b / g)) : h > f / 2 && (c = f / 2,
                        b = g * (c / h)) : (b = g,
                        c = h),
                    {
                        width: b,
                        height: c
                    }
                },
                toggleAlpha: function() {
                    this.selectedBox && this.selectedBox.toggleAlpha()
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            a.addModule("Watermark", a.deco.view.extend({
                DecoTool: a.WatermarkTool,
                init: function(b, c, d) {
                    if (this.sandbox = b,
                            this.historyData = null ,
                            this.subMenuName = "watermark",
                            this.state = a.$$p(".menu_btn_" + this.subMenuName, c)[0],
                            this.prefix = d.prefix || "",
                            this.alphaBtn = a.$$p(".btn_alpha", c)[0],
                        "FileReader" in window)
                        this.initView(c),
                            this.bindEvent();
                    else {
                        var e = a.$$p(".menu_btn_watermark", c)[0];
                        e && e.parentNode.classList.add(a.HIDE_CLASS)
                    }
                },
                initView: function(a) {
                    this._super(a),
                    this.reader || this._initReader(a)
                },
                onMenuEnter: function() {
                    this._super(),
                        this._disableAlphaBtn()
                },
                _initReader: function(b) {
                    var c = this;
                    this.input = a.$$p(".watermark_input", b)[0],
                        this.reader = new a.FileReader(this.input,function(a) {
                                c.tool || c.createDecoTool(),
                                    c.tool.add(a),
                                    c._enableAlphaBtn()
                            }
                            ,function(a) {}
                        )
                },
                bindMenuEvent: function() {
                    this._super(),
                        this.sandbox.on("watermark:reset", this._onClickReset.bind(this)),
                        this.sandbox.on("watermark:alpha", this._onClickAlpha.bind(this))
                },
                _onClickReset: function() {
                    this.tool && (this.input.value = "",
                        this.tool.reset())
                },
                _onClickAlpha: function() {
                    this.tool && !this.tool.isEmpty() && this.tool.toggleAlpha()
                },
                _enableAlphaBtn: function() {
                    this.alphaBtn.disabled = "",
                        this.alphaBtn.classList.remove(this.prefix + "btn_disabled")
                },
                _disableAlphaBtn: function() {
                    this.alphaBtn.disabled = "disabled",
                        this.alphaBtn.classList.add(this.prefix + "btn_disabled")
                },
                onMenuUpdate: function(a) {
                    this._enableAlphaBtn(),
                        this.alphaBtn.innerHTML = '<span class="photos_bg_photos"><span class="photos_screen_out">투명도</span>' + 100 * a.alpha + '<span class="photos_txt_percent">%</span></span>'
                }
            }))
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = "quicklist_open"
                , c = "link_quick"
                , d = "img"
                , e = "on"
                , f = "empty"
                , g = "uploading"
                , h = "not_editable"
                , i = "edited"
                , j = "data:image/gif;base64,R0lGODlhAQABAIAAAP7//wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";
            a.QuickList = Class.extend({
                init: function(b, c, d) {
                    this.frameEl = b,
                        this.sandbox = c,
                        this.prefix = d.prefix || "",
                        this.originType = d.originType || "daum",
                        this.viewport = d.viewport && d.viewport.list || "same-area",
                        this.preview = a.$$p(".preview_canvas", b)[0],
                        this.listWrapEl = a.$$p(".quicklist_photo", b)[0],
                        this.listAreaEl = a.$$p(".quicklist_area", this.listWrapEl)[0],
                        this.listThumbEl = a.$$p(".list_quick", this.listAreaEl)[0],
                        this.menuBtn = a.$$p(".btn_quicklist", b)[0],
                        this.menuBtnEl = a.$$p(".btn_quicklist .num_list", b)[0],
                        this.scrollWrapEl = a.$$p(".scroll_wrap", this.listAreaEl)[0],
                        this.popupEl = a.$$p(".popup", this.listWrapEl)[0],
                        this.popupTxtEl = a.$$p(".txt", this.popupEl)[0],
                        this._initList(),
                        this._initCustomScrollBar(),
                        this._bindSandboxEvent(),
                        this._bindEditableOverEvent(),
                        this._bindTransitionEndEvent()
                },
                _initList: function() {
                    this.metaDataList = [],
                        this.thumbElList = [],
                        this.listThumbEl.innerHTML = "",
                        this.selectedIndex = null ,
                        this.isEnable = !0,
                        this._hide()
                },
                _initCustomScrollBar: function() {
                    if (a.ua.os.windows) {
                        var b = a.$$p(".scroll_wrap", this.frameEl)[0];
                        b.classList.add(this.prefix + "custom_scroll_on"),
                            a.Scrollbar.initEl(b),
                            this.scrollWrapEl = a.$$(".ss-content", b)[0]
                    }
                },
                _bindSandboxEvent: function() {
                    var b = this;
                    this.sandbox.on("menu:list", function(a) {
                        b.isShow ? b._hide() : b._show()
                    }),
                        this.sandbox.on("quicklist:image", function(a) {
                            b.select(a.args[0]),
                            b.editFlag || (b.editFlag = !0)
                        }),
                        this.sandbox.on("submenu", function(c) {
                            b.isEnable = !1,
                                b._hide(),
                                b.listWrapEl.classList.add(a.HIDE_CLASS)
                        }),
                        this.sandbox.on("editor:change", function(a) {
                            b.isEnable = !1
                        }),
                        this.sandbox.on(["detailmenu", "progressbar:hide"], function(c) {
                            b.isEnable = !0,
                                b.listWrapEl.classList.remove(a.HIDE_CLASS)
                        }),
                        this.sandbox.on("filter:removeSessionKey:quickList", function(a) {
                            b._removeSessionKey(a)
                        }),
                        a.event.on(this.frameEl, a.EVENT_NAME.START, function(c) {
                            for (var d = !1, e = a.event.getTarget(c); e && e.tagName && "html" !== e.tagName.toLowerCase(); ) {
                                if (e === b.listWrapEl || e === b.menuBtn) {
                                    d = !0;
                                    break
                                }
                                e = e.parentNode
                            }
                            d || b._hide()
                        })
                },
                _bindEditableOverEvent: function() {
                    function b(b) {
                        for (var c = a.event.getTarget(b); c && !c.classList.contains(d.prefix + "link_quick"); ) {
                            if (c === d.listThumbEl || c.tagName && "html" === c.tagName.toLowerCase())
                                return null ;
                            c = c.parentNode
                        }
                        return c
                    }
                    var c, d = this;
                    a.event.on(this.scrollWrapEl, "scroll", function(a) {
                        c && d._setPopupPosition(c)
                    }),
                        a.event.on(this.listThumbEl, "mouseover", function(e) {
                            var f = b(e)
                                , g = (a.$$p(".status", f)[0] || {}).innerHTML || "";
                            f && g && "" !== g ? f !== c && d._showPopup(f, g) : d._hidePopup(),
                                c = f
                        }),
                        a.event.on(this.listThumbEl, "mouseleave", function() {
                            d._hidePopup()
                        })
                },
                initList: function(a, b) {
                    this._makeMetaDataList(a),
                        this._setListNum(this.metaDataList.length),
                        this._renderThumbList(this.metaDataList),
                        this.select(b),
                        this.sandbox.emit("show:editor")
                },
                select: function(b) {
                    b = parseInt(b, 10),
                    a.util.isNumeric(b) && this._isEditableDataIndex(b) || (b = null  === this.selectedIndex ? this._getEditableDataIndex() : this.selectedIndex),
                    b !== this.selectedIndex && (this._hidePopup(),
                        this._select(b),
                        this.sandbox.emit("change:editor", this.metaDataList[b]))
                },
                updateItem: function(a, b) {
                    if (a === this.selectedIndex || this._checkOutOfRange(a))
                        return !1;
                    var c = this._makeMetaData(b, a);
                    return this.metaDataList[a] = c,
                        this._loadImage(a, c.dataURI),
                        !0
                },
                clear: function() {
                    this._initList()
                },
                getDataList: function() {
                    return this.metaDataList
                },
                _show: function() {
                    this.isShow || (this._sync(),
                        this.listWrapEl.classList.add(this.prefix + b),
                        this.menuBtn.classList.add(this.prefix + b),
                        this.isShow = !0,
                        this.sandbox.emit("quicklist:show"))
                },
                _hide: function() {
                    this.isShow && (this.listWrapEl.classList.remove(this.prefix + b),
                        this.menuBtn.classList.remove(this.prefix + b),
                        this.isShow = !1,
                        this._hidePopup(),
                        this.sandbox.emit("quicklist:hide"))
                },
                _bindTransitionEndEvent: function() {
                    var b = this
                        , c = a.util.getTransitionEndEventName()
                        , d = function() {
                            b.isShow || b.sandbox.emit("quicklist:hide:transitionend")
                        }
                        ;
                    a.event.on(this.listWrapEl, c, d)
                },
                _makeMetaDataList: function(a) {
                    this.metaDataList = this.metaDataList.concat(a.map(this._makeMetaData))
                },
                _makeMetaData: function(a, b) {
                    var c = {
                        imageId: b,
                        url: a.url,
                        dataURI: a.url
                    };
                    for (var d in a)
                        a.hasOwnProperty(d) && "url" !== d && (c[d] = a[d]);
                    return c
                },
                _setListNum: function(a) {
                    this.menuBtnEl.innerHTML = a
                },
                _renderThumbList: function() {
                    this._appendLiAll(),
                        this._appendImageAll()
                },
                _appendLiAll: function() {
                    for (var b = "", e = 0, f = this.metaDataList.length; f > e; e++)
                        b += '<li><button data-click="quicklist:image:' + e + '" class="' + this.prefix + c + " " + this.prefix + "thumb_" + e + '"><img class="' + this.prefix + d + '" ><canvas class="' + this.prefix + d + " " + a.HIDE_CLASS + '"></canvas><span class="' + this.prefix + "status " + this.prefix + 'screen_out"></span></button></li>';
                    this.listThumbEl.innerHTML = b,
                        this.thumbElList = a.$$p("." + c, this.listThumbEl)
                },
                _appendImageAll: function() {
                    for (var a = 0, b = this.metaDataList.length; b > a; a++)
                        this._loadImage(a, this.metaDataList[a].dataURI)
                },
                _loadImage: function(b, c) {
                    var d = this
                        , e = new Image
                        , f = a.$$p(".thumb_" + b, this.listThumbEl)[0]
                        , g = this.metaDataList[b];
                    this._updateThumbImage(f, g, !1),
                        this._hideCanvas(f),
                    c && "" !== c && (e.onload = function() {
                        g.width = e.width,
                            g.height = e.height,
                            d._updateThumbImage(f, g, !0)
                    }
                        ,
                        e.onerror = function(b) {
                            a.util.sendErrorLog("quicklist_error", "request thumb image Error. url : " + c + ", caused by " + b.message)
                        }
                        ,
                        e.src = c)
                },
                _updateThumbImage: function(b, c, e) {
                    var g = a.$$p("img." + d, b)[0]
                        , h = this._optimizeThumb(c)
                        , i = this;
                    c.url && e ? (g.onload = function() {
                        b.classList.remove(i.prefix + f)
                    }
                        ,
                        g.src = a.util.getThumbUrl(c.url, this.originType, h ? h.type : null )) : (g.src = j,
                        b.classList.add(this.prefix + f)),
                        h ? g.style.cssText = ["width:" + h.width + "px", "height:" + h.height + "px", "top:" + (h.top || 0) + "px", "left:" + (h.left || 0) + "px"].join(";") : (g.width = 0,
                            g.height = 0,
                            g.style.cssText = ""),
                        this._checkStatus(b, c)
                },
                _sync: function() {
                    var a = this.thumbElList[this.selectedIndex];
                    this._updateCanvas(a),
                        this._checkStatus(a, null , this.selectedIndex)
                },
                _updateCanvas: function(b) {
                    var c = a.$$p("canvas." + d, b)[0];
                    if (b && this.preview.width && c) {
                        var e = this._optimizeThumb({
                            width: this.preview.width,
                            height: this.preview.height
                        });
                        c.width = e.width,
                            c.height = e.height,
                            c.style.cssText = (e.top ? "top:" + e.top + "px;" : "") + (e.left ? "left:" + e.left + "px" : ""),
                            c.style.width = e.width + "px",
                            c.style.height = e.height + "px";
                        var f = c.getContext("2d");
                        f.drawImage(this.preview, 0, 0, c.width, c.height),
                            this._showCanvas(b)
                    }
                },
                _showCanvas: function(b) {
                    var c = a.$$p("img." + d, b)[0]
                        , e = a.$$p("canvas." + d, b)[0];
                    b && c && e && (c.classList.add(a.HIDE_CLASS),
                        e.classList.remove(a.HIDE_CLASS))
                },
                _hideCanvas: function(b) {
                    var c = a.$$p("img." + d, b)[0]
                        , e = a.$$p("canvas." + d, b)[0];
                    b && c && e && (c.classList.remove(a.HIDE_CLASS),
                        e.classList.add(a.HIDE_CLASS))
                },
                _checkStatus: function(b, c, d) {
                    if (b = b || this.thumbElList[d],
                            c = c || this.metaDataList[d],
                        b && c) {
                        var e = ""
                            , f = a.$$p(".status", b)[0]
                            , j = "";
                        c.uploading === !0 ? (e = g,
                            j = "업로드 중입니다.") : c.editable === !1 ? (e = h,
                            j = c.message || "") : this._isEditedData(c) && (e = i,
                            j = ""),
                            b.classList[e === g ? "add" : "remove"](this.prefix + g),
                            b.classList[e === h ? "add" : "remove"](this.prefix + h),
                            b.classList[e === i ? "add" : "remove"](this.prefix + i),
                            f.innerHTML = j
                    }
                },
                _isEditedData: function(a) {
                    var b, c;
                    if (a.history) {
                        b = a.history;
                        for (c in b)
                            if (b.hasOwnProperty(c))
                                return !0
                    }
                    return !1
                },
                _isEditableDataIndex: function(a) {
                    this.metaDataList.length;
                    return this._checkOutOfRange(a) || !this._isEditableData(this.metaDataList[a]) ? !1 : !0
                },
                _isEditableData: function(a) {
                    return a.hasOwnProperty("editable") && !a.editable ? !1 : a.hasOwnProperty("uploading") && a.uploading ? !1 : !0
                },
                _getEditableDataIndex: function() {
                    var a, b;
                    for (a = 0,
                             b = this.metaDataList.length; b > a; a++)
                        if (this._isEditableData(this.metaDataList[a]))
                            return a
                },
                _checkOutOfRange: function(a) {
                    return !this.thumbElList || 0 > a || a >= this.thumbElList.length
                },
                _select: function(b) {
                    var c = this.thumbElList;
                    this.selectedIndex = b,
                        a.util.setCurrentImageId(this.metaDataList[b].url);
                    for (var d = 0, f = c.length; f > d; d++)
                        b === d ? c[d].classList.add(this.prefix + e) : c[d].classList.remove(this.prefix + e)
                },
                _optimizeThumb: function(a) {
                    return a && a.hasOwnProperty("width") && a.hasOwnProperty("height") ? "same-area" === this.viewport ? this._getSameAreaSize(a.width, a.height) : this._getFixedWidthSize(a.width, a.height) : null
                },
                _getSameAreaSize: function(a, b) {
                    var c = 96
                        , d = c / (a + b);
                    return {
                        width: Math.floor(a * d),
                        height: Math.floor(b * d)
                    }
                },
                _getFixedWidthSize: function(a, b) {
                    var c = 80
                        , d = 190
                        , e = 34
                        , f = c / a
                        , g = Math.floor(a * f)
                        , h = Math.floor(b * f)
                        , i = g
                        , j = 0
                        , k = 0
                        , l = "T";
                    return h > d ? j = (d - h) / 2 : e > h && (i = g * (e / h),
                        k = -(i - g) / 2,
                        h = e,
                        l = "R"),
                    {
                        width: i,
                        height: h,
                        top: j,
                        left: k,
                        type: l
                    }
                },
                _showPopup: function(b, c) {
                    b && c && "" !== c && (this.hideFlow && (this.hideFlow.stop(),
                        this.hideFlow = null ),
                        this.popupEl.classList.remove(a.HIDE_CLASS),
                        this._setPopupMessage(c),
                        this._setPopupPosition(b),
                        this.popupEl.classList.add(this.prefix + "show"))
                },
                _setPopupMessage: function(a) {
                    this.popupTxtEl.innerHTML !== a && (this.popupTxtEl.innerHTML = a)
                },
                _setPopupPosition: function(a) {
                    this.popupEl.style.top = a.offsetTop + (a.offsetHeight - this.popupEl.offsetHeight) / 2 - this.scrollWrapEl.scrollTop + "px",
                        this.popupEl.style.left = a.offsetLeft + a.offsetWidth + this.scrollWrapEl.offsetLeft + this.listThumbEl.offsetLeft + 10 + "px"
                },
                _hidePopup: function() {
                    var b = this;
                    this.hideFlow || (this.hideFlow = (new a.util.Flow).then(function(a) {
                        b.popupEl.classList.remove(b.prefix + "show"),
                            a(null )
                    }).delay(200).end(function() {
                        b.popupEl.classList.add(a.HIDE_CLASS),
                            b.hideFlow = null
                    }))
                },
                _removeSessionKey: function(a) {
                    this.metaDataList.forEach(function(b) {
                        b.sessionKey && a === b.sessionKey && delete b.sessionKey
                    })
                }
            })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b, c, d = "photos";
            a.$$p = function(d, e) {
                var f, g = (d || "").split(" ");
                for (f = g.length - 1; f >= 0; f--)
                    g[f] = g[f].split(".").join("." + b);
                return d = g.join(" "),
                    a.$$(d, e || c)
            }
                ,
                a.HIDE_CLASS = "hide";
            var e = Observer.extend({
                init: function(e, f) {
                    if (!e)
                        throw new Error("container element should be provided");
                    this.options = f || {},
                        b = this.options.prefix = (this.options.prefix || d) + "_",
                    a.Injector && a.Injector.append(e, b),
                        a.HIDE_CLASS = b + "hide",
                        c = this.frameEl = a.$$p(".editor", e)[0],
                        this._appendUA(),
                        this._initEditor(),
                        this._bindEvent()
                },
                open: function(b, c) {
                    if (!b)
                        throw console.error("Image url should be provided"),
                            new Error("Image url should be provided");
                    if (this.metaData = {
                            url: b,
                            dataURI: b
                        },
                            c) {
                        var d = JSON.parse(c);
                        this.metaData.history = d.editData
                    }
                    this._hideQuickListMenu(),
                        a.util.setCurrentImageId(this.metaData.url),
                        this.editor.change(this.metaData).show(),
                        a.tiara.sendLog("open", "single"),
                        this.emit("app:open")
                },
                openWithList: function(b, c) {
                    if (!b || b.length <= 0)
                        throw console.error("Image urls should be provided"),
                            new Error("Image urls should be provided");
                    var d = 0;
                    a.util.isNumeric(c) && (d = c),
                        this._initQuickList(),
                        this.quickList.initList(b, d),
                        a.tiara.sendLog("open", "list"),
                        this.emit("app:open:list")
                },
                updateItem: function(b, c) {
                    if (!c || !a.util.isNumeric(b))
                        throw console.error("Image url should be provided"),
                            new Error("Image url should be provided");
                    return this.quickList ? this.quickList.updateItem(b, c) : void 0
                },
                clear: function() {
                    this.quickList && this.quickList.clear(),
                    this.editor && this.editor.clear()
                },
                close: function() {
                    this.clear(),
                        this.editor.hide(),
                        this.emit("app:close")
                },
                destroy: function() {
                    this.close();
                    for (var a in this)
                        this.hasOwnProperty(a) && delete this[a]
                },
                hasEditedImage: function() {
                    var a = this;
                    if (this.quickList) {
                        var b = this.quickList.getDataList();
                        if (b)
                            return b.some(function(b) {
                                return a._hasEditedHistory(b)
                            })
                    } else if (this.metaData)
                        return this._hasEditedHistory(this.metaData);
                    return !1
                },
                _hasEditedHistory: function(a) {
                    return !!a.history && Object.keys(a.history).length > 0
                },
                _appendUA: function() {
                    this.frameEl.classList.add(this.options.prefix + a.ua.os.name),
                        this.frameEl.classList.add(this.options.prefix + a.ua.browser.name),
                        this.frameEl.classList.add(this.options.prefix + a.ua.platform),
                    "spartan" === a.ua.browser.name && this.frameEl.classList.add(this.options.prefix + "msie")
                },
                _initEditor: function() {
                    this.editor || (this.editor = new window.photos.Editor(this.frameEl,this,this.options))
                },
                _initQuickList: function() {
                    !this.quickList && window.photos.QuickList && (this.quickList = new window.photos.QuickList(this.frameEl,this,this.options),
                        this._showQuickListMenu())
                },
                _showQuickListMenu: function() {
                    var b = a.$$p(".quicklist_photo")[0]
                        , c = a.$$p(".btn_quicklist")[0];
                    b && c && (b.classList.remove(a.HIDE_CLASS),
                        c.classList.remove(a.HIDE_CLASS))
                },
                _hideQuickListMenu: function() {
                    if (this.quickList) {
                        var b = a.$$p(".quicklist_photo")[0]
                            , c = a.$$p(".btn_quicklist")[0];
                        (b || c) && (b.classList.add(a.HIDE_CLASS),
                            c.classList.add(a.HIDE_CLASS))
                    }
                },
                _bindEvent: function() {
                    var a = this;
                    this.on("shortcut:cancel", function() {
                        var b = (new Date).getTime();
                        if (a.hasEditedImage() && !confirm("편집 중인 이미지가 있습니다. 저장하지 않고 닫으시겠습니까?")) {
                            var c = (new Date).getTime();
                            if (c - b > 50)
                                return
                        }
                        a._logEditData("cancel"),
                            a.close(),
                            a.emit("photos:edit:cancel")
                    }),
                        this.on("save:complete", function(b) {
                            a._logEditData("save"),
                                a.close(),
                                a.emit("photos:edit:complete", b)
                        }),
                        this.on("save:hide:editor", function() {
                            a.editor.hide()
                        }),
                        this.on("save:get:datalist", function(b) {
                            return b(a.quickList ? a.quickList.getDataList() : !1)
                        }),
                        this.on("change:editor", function(b) {
                            a.editor.change(b)
                        }),
                        this.on("show:editor", function() {
                            a.editor.show()
                        }),
                        this.on("save:hasEditedImage", function(b) {
                            b(a.hasEditedImage())
                        })
                },
                _logEditData: function(b) {
                    var c = {
                        filter: "FI",
                        crop: "CR",
                        resize: "RE",
                        brightness: "BR",
                        contrast: "CO",
                        saturation: "SA",
                        warmth: "WA",
                        focus: "FO",
                        vignette: "VI",
                        text: "TE",
                        watermark: "WM"
                    };
                    this.emit("history:current", function(d) {
                        var e = [];
                        for (var f in c)
                            c.hasOwnProperty(f) && d[f] && e.push(c[f]);
                        e.length > 0 ? a.tiara.sendLog(b, e.join("-")) : a.tiara.sendLog(b, a.tiara.NOTUSE)
                    })
                }
            });
            !function() {
                var b;
                a.App = function(a, c) {
                    return b ? b.init(a, c) : b = new e(a,c),
                        b
                }
            }()
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            var b = '@charset "utf-8";.photos_editor,.photos_editor .photos_menu_item .photos_btn_sub,.photos_editor .photos_tool_main,.photos_menu_item .photos_sub_detail,.photos_tool_main .photos_menu_main{background-color:#333}.photos_editor .photos_ico_photos{background-image:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/ico_photos_brunch_v2.png)}.photos_list_main_menu .photos_btn_crop,.photos_list_main_menu .photos_btn_size{background-image:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/ico_brunch_v4.png)}.photos_list_main_menu .photos_btn_crop{background-position:0 -40px}.photos_sub_select_crop .photos_list_main_menu .photos_btn_crop{background-position:0 -100px}.photos_list_main_menu .photos_btn_size{background-position:-60px -40px}.photos_sub_select_size .photos_list_main_menu .photos_btn_size{background-position:-60px -100px}.photos_wrap_menu_sub .photos_menu_sub_bg{background:rgba(51,51,51,.9)}.photos_detail_list .photos_list_info{left:0}.photos_detail_list .photos_list_info li{padding:0 5px}.photos_cancel_area{right:14px;opacity:1}.photos_cancel_area .photos_btn_cancel .photos_ico_back{width:76px;height:30px;background-image:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/ico_brunch_v4.png);background-position:-50px 0}.photos_cancel_area .photos_btn_save{width:88px;height:80px}.photos_cancel_area .photos_btn_save .photos_ico_save{position:relative;width:76px;height:30px;margin:0 auto;background-position:-60px -110px}.photos_menu_item .photos_btn_sub.photos_on .photos_ico_photos{background:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/ico_brunch_v4.png)}.photos_menu_item .photos_btn_back{left:-4px}.photos_menu_item .photos_btn_back.photos_on .photos_ico_back{background-position:-200px -40px}.photos_menu_item .photos_btn_ok{right:-4px}.photos_menu_item .photos_btn_ok.photos_on .photos_ico_ok{background-position:-230px -40px}.photos_list_area{position:absolute;top:0;left:0;z-index:3}.photos_list_area .photos_btn_quicklist{width:88px;height:80px}.photos_list_area .photos_btn_quicklist .photos_ico_list{width:48px;height:30px;margin:0 auto;background-image:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/ico_brunch_v4.png);background-position:0 0}.photos_editor .photos_quicklist_photo{z-index:3;width:140px;padding:0}.photos_quicklist_photo .photos_scroll_wrap{width:140px;left:-140px;background:#252525}.photos_quicklist_photo .photos_link_quick{position:relative;width:80px;margin:0 auto;padding:0;overflow:hidden;max-width:80px;max-height:190px;min-height:34px}.photos_quicklist_photo .photos_link_quick .photos_img{position:relative;border:0;object-fit:cover}.photos_quicklist_photo .photos_link_quick.photos_empty:before{content:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/ico_loading.png);position:absolute;margin:-11px 0 0 -11px;width:22px;height:22px;left:50%;top:50%}.photos_quicklist_photo .photos_link_quick.photos_not_editable .photos_status:after{position:absolute;width:100%;height:100%;left:0;top:0;content:"";background:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/img_x.png);background-size:100% 100%}.photos_quicklist_photo .photos_link_quick.photos_edited .photos_status{top:8px;left:100%;width:18px;height:18px;margin-left:-26px;background:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/ico_brunch_v4.png) -200px -70px}.photos_quicklist_photo .photos_on:after{position:absolute;top:0;left:0;bottom:0;right:0;content:"";border:2px solid #00c3bd}.photos_quicklist_photo .photos_scroll_bar{bottom:0}.photos_quicklist_photo .photos_inner_scroll{margin:0 auto}.photos_quicklist_photo .photos_popup .photos_txt{background-color:#1a1a1a}.photos_quicklist_photo .photos_popup .photos_ico_arr{border-right-color:#1a1a1a}.photos_wrap_menu_sub .photos_menu_sub_filter{left:50%;width:1024px;margin-left:-512px}.photos_list_filter .photos_btn_item .photos_inner_btn{display:block;width:60px;height:60px}.photos_controls_size,.photos_editor .photos_light_editor,.photos_editor .photos_magnifier_photo,.photos_editor .photos_tools_filter .photos_btn_detail .photos_ico_photos,.photos_effect_slider .photos_slider_bar .pp_slider_line,.photos_info_rotate .photos_btn_flip_h,.photos_info_rotate .photos_degree_input,.photos_menu_item .photos_sub_detail_filter,.photos_size_outline,.photos_sub_detail_size .photos_detail_info{display:none}.photos_tool_main .photos_list_filter .photos_btn_item{width:60px;padding:0}.photos_tool_main .photos_list_filter .photos_menu_filter_item .photos_state_item .photos_inner_btn:before{top:0;width:60px;height:60px;border:2px solid #00c3bd;background:0 0}.photos_wrap_menu_sub .photos_list_filter{margin-top:30px}.photos_wrap_menu_sub .photos_list_wrapper{width:940px}.photos_list_filter .photos_menu_filter_item{margin-left:20px}.photos_list_filter .photos_menu_filter_item:first-child{margin-left:0}.photos_list_filter .photos_menu_filter_item .photos_txt_item{position:absolute;top:17px;left:0;width:100%;font-size:18px}.photos_list_filter .photos_menu_filter_item .photos_btn_item[data-click="filter:apply:OR00"] .photos_txt_item{top:20px;font-size:14px}.photos_list_filter .photos_menu_filter_item .photos_state_item .photos_txt_item{color:#00c3bd}.photos_tool_main .photos_list_filter .photos_menu_filter_item .photos_inner_btn:before{content:"";position:absolute;width:100%;height:100%;left:0;top:0;background-color:rgba(0,0,0,.3)}.photos_tool_main .photos_list_filter .photos_menu_filter_item .photos_state_item .photos_inner_btn:before{background-color:rgba(0,0,0,.5)}.photos_tool_main .photos_menu_sub_filter .photos_btn_detail{top:30px;width:42px;height:60px;background:#333}.photos_tool_main .photos_menu_sub_filter .photos_menu_filter_prev{left:0;opacity:1}.photos_tool_main .photos_menu_sub_filter .photos_menu_filter_next{right:0;opacity:1}.photos_menu_sub_filter .photos_btn_detail .photos_ico_photos{width:13px;height:13px}.photos_menu_sub_filter .photos_btn_detail.photos_on .photos_ico_photos{background-image:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/ico_brunch_v4.png)}.photos_menu_sub_filter .photos_menu_filter_prev.photos_on .photos_ico_prev{background-position:-220px -70px}.photos_menu_sub_filter .photos_btn_next .photos_ico_next{background-position:-340px -90px}.photos_menu_sub_filter .photos_menu_filter_next.photos_on .photos_ico_next{background-position:-240px -70px}.photos_editor .photos_select_filter .photos_menu_sub_filter,.photos_editor .photos_sub_select_filter .photos_menu_sub_bg,.photos_editor .photos_sub_select_filter .photos_menu_sub_filter{-webkit-transform:translateY(-110px);transform:translateY(-110px)}.photos_list_crop .photos_btn_info .photos_inner_btn{outline-color:#fff;font-size:11px;line-height:1.5}.photos_list_crop .photos_ratio_free .photos_inner_btn{width:28px;height:28px;background:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/bg_free.png) no-repeat;font-size:0;line-height:0}.photos_list_crop .photos_ratio_9_16 .photos_inner_btn{width:24px;height:34px}.photos_list_crop .photos_ratio_3_4 .photos_inner_btn{width:24px;height:30px}.photos_list_crop .photos_ratio_1_1 .photos_inner_btn{width:24px;height:24px}.photos_list_crop .photos_ratio_4_3 .photos_inner_btn{width:30px;height:24px}.photos_list_crop .photos_ratio_16_9 .photos_inner_btn{width:34px;height:24px}.photos_list_crop .photos_btn_info.photos_on .photos_inner_btn{outline-color:#00c3bd;color:#00c3bd;background:0 0}.photos_list_crop .photos_ratio_free.photos_on .photos_inner_btn{background:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/bg_free_on.png) no-repeat}.photos_list_crop .photos_btn_info .photos_inner_btn .photos_txt_vertical:after,.photos_list_crop .photos_btn_info .photos_inner_btn .photos_txt_vertical:before,.photos_list_crop .photos_btn_info .photos_inner_btn:after,.photos_list_crop .photos_btn_info .photos_inner_btn:before{content:none}.photos_info_rotate .photos_wrap_rotate{height:32px}.photos_info_rotate .photos_btn_rotate_r{left:50%;margin-right:0;margin-left:-16px}.photos_list_size .photos_btn_info .photos_bg_photos{width:34px;height:26px;border:1px solid #fff;font-size:11px;background:0 0}.photos_list_size .photos_btn_info.photos_on .photos_bg_photos{border-color:#00c3bd;color:#00c3bd}.photos_editor .photos_select_effect .photos_menu_sub_effect{-webkit-transform:translateY(-5px);transform:translateY(-5px)}.photos_tool_main .photos_list_effect{width:360px;margin-top:0}.photos_tool_main .photos_list_effect li{padding:0}.photos_list_effect .photos_btn_item .photos_txt_item{padding-top:0}.photos_list_effect_all .photos_btn_info{margin:0 3px;font-size:9px}.photos_sub_detail_effect_all.photos_select_brightness .photos_menu_btn_brightness,.photos_sub_detail_effect_all.photos_select_contrast .photos_menu_btn_contrast,.photos_sub_detail_effect_all.photos_select_focus .photos_menu_btn_focus,.photos_sub_detail_effect_all.photos_select_saturation .photos_menu_btn_saturation,.photos_sub_detail_effect_all.photos_select_warmth .photos_menu_btn_warmth{color:#00c3bd}.photos_sub_detail_effect_all.photos_select_brightness .photos_ico_brightness,.photos_sub_detail_effect_all.photos_select_contrast .photos_ico_contrast,.photos_sub_detail_effect_all.photos_select_focus .photos_ico_focus,.photos_sub_detail_effect_all.photos_select_saturation .photos_ico_saturation,.photos_sub_detail_effect_all.photos_select_warmth .photos_ico_warmth{background-image:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/ico_brunch_v4.png)}.photos_sub_detail_effect_all.photos_select_brightness .photos_ico_brightness{background-position:-130px 0}.photos_sub_detail_effect_all.photos_select_contrast .photos_ico_contrast{background-position:-170px 0}.photos_sub_detail_effect_all.photos_select_saturation .photos_ico_saturation{background-position:-210px 0}.photos_sub_detail_effect_all.photos_select_warmth .photos_ico_warmth{background-position:-120px -40px}.photos_sub_detail_effect_all.photos_select_focus .photos_ico_focus{background-position:-160px -40px}.photos_editor .photos_sub_select_brightness .photos_sub_detail_brightness,.photos_editor .photos_sub_select_contrast .photos_sub_detail_contrast,.photos_editor .photos_sub_select_focus .photos_sub_detail_focus,.photos_editor .photos_sub_select_saturation .photos_sub_detail_saturation,.photos_editor .photos_sub_select_warmth .photos_sub_detail_warmth{height:100px;-webkit-transform:translateY(-260px);transform:translateY(-260px)}.photos_menu_item .photos_effect_slider{width:644px}.photos_sub_detail_effect_all .photos_effect_slider .photos_slider_bar{width:644px;margin-left:-322px}.photos_sub_detail_effect_all .photos_effect_slider .photos_slider_focus{width:424px;margin-left:-212px}.photos_sub_detail_effect_all .photos_effect_slider_bg{background-color:rgba(51,51,51,.9)}.photos_sub_detail_effect_all.photos_select_brightness .photos_effect_slider_bg,.photos_sub_detail_effect_all.photos_select_brightness .photos_slider_brightness,.photos_sub_detail_effect_all.photos_select_contrast .photos_effect_slider_bg,.photos_sub_detail_effect_all.photos_select_contrast .photos_slider_contrast,.photos_sub_detail_effect_all.photos_select_focus .photos_effect_slider_bg,.photos_sub_detail_effect_all.photos_select_focus .photos_slider_focus,.photos_sub_detail_effect_all.photos_select_saturation .photos_effect_slider_bg,.photos_sub_detail_effect_all.photos_select_saturation .photos_slider_saturation,.photos_sub_detail_effect_all.photos_select_warmth .photos_effect_slider_bg,.photos_sub_detail_effect_all.photos_select_warmth .photos_slider_warmth{-webkit-transform:translateY(-180px);transform:translateY(-180px)}.photos_effect_slider .photos_slider_bar .pp_slider_bg{height:4px}.photos_effect_slider .photos_slider_bar .pp_slider_bar{height:4px;background:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/bg_slider_v4.png) repeat-x}.photos_effect_slider .photos_slider_bar .pp_slider_btn{width:20px;height:20px;margin:-10px 0 0 -10px;border-radius:0;background-color:#333;background-image:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/ico_brunch_v4.png)}.photos_effect_slider .photos_slider_brightness .pp_slider_btn{background-position:-120px -90px}.photos_effect_slider .photos_slider_contrast .pp_slider_btn{background-position:-150px -90px}.photos_effect_slider .photos_slider_saturation .pp_slider_btn{background-position:-180px -90px}.photos_effect_slider .photos_slider_warmth .pp_slider_btn{background-position:-210px -90px}.photos_effect_slider .photos_slider_focus{width:424px;margin:0 auto}.photos_effect_slider .photos_slider_focus .pp_slider_btn{background-position:-240px -90px}.photos_effect_slider .photos_slider_focus .pp_slider_bar{background:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/bg_slider2_v4.png) repeat-x}.photos_effect_slider .photos_slider_bar .pp_slider_btn .pp_slider_val{top:26px;left:-16px;width:52px}@media only screen and (-webkit-min-device-pixel-ratio :1.5),only screen and (min-device-pixel-ratio :1.5){.photos_editor .photos_ico_photos{background-image:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/ico_photos_brunch_rtn.png);-webkit-background-size:380px 260px;background-size:380px 260px}.photos_cancel_area .photos_btn_cancel .photos_ico_back,.photos_effect_slider .photos_slider_bar .pp_slider_btn,.photos_list_area .photos_btn_quicklist .photos_ico_list,.photos_list_main_menu .photos_btn_crop,.photos_list_main_menu .photos_btn_size,.photos_menu_item .photos_btn_sub.photos_on .photos_ico_photos,.photos_menu_sub_filter .photos_btn_detail.photos_on .photos_ico_photos,.photos_quicklist_photo .photos_link_quick .photos_ico_edited,.photos_sub_detail_effect_all.photos_select_brightness .photos_ico_brightness,.photos_sub_detail_effect_all.photos_select_contrast .photos_ico_contrast,.photos_sub_detail_effect_all.photos_select_focus .photos_ico_focus .photos_sub_select_brightness .photos_list_effect .photos_ico_brightness,.photos_sub_detail_effect_all.photos_select_saturation .photos_ico_saturation,.photos_sub_detail_effect_all.photos_select_warmth .photos_ico_warmth,.photos_sub_select_contrast .photos_list_effect .photos_ico_contrast,.photos_sub_select_focus .photos_list_effect .photos_ico_focus,.photos_sub_select_saturation .photos_list_effect .photos_ico_saturation,.photos_sub_select_warmth .photos_list_effect .photos_ico_warmth{background-image:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/ico_brunch_rtn_v3.png);-webkit-background-size:261px 175px;background-size:261px 175px}.photos_list_crop .photos_ratio_free .photos_inner_btn{background-image:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/bg_free_rtn.png);-webkit-background-size:28px 28px;background-size:28px 28px}.photos_list_crop .photos_ratio_free.photos_on .photos_inner_btn{background-image:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/bg_free_on_rtn.png);-webkit-background-size:28px 28px;background-size:28px 28px}.photos_effect_slider .photos_slider_bar .pp_slider_bar{background-image:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/bg_slider_rtn_v4.png);-webkit-background-size:160px 4px;background-size:160px 4px}.photos_effect_slider .photos_slider_focus .pp_slider_bar{background-image:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/bg_slider2_rtn_v4.png);-webkit-background-size:210px 4px;background-size:210px 4px}}.photos_crop_dimmed_bottom,.photos_crop_dimmed_left,.photos_crop_dimmed_right,.photos_crop_dimmed_top{background-color:#333}.photos_editor .photos_btn_detail{background:0 0}.photos_editor .photos_scroll_wrap li{padding:14px 0}.photos_editor .photos_tools_effect_all,.photos_editor .photos_tools_filter{position:absolute;width:940px;height:100%;top:0;left:50%;margin:0 0 0 -470px}.photos_editor .photos_tools_filter .photos_btn_detail{position:absolute;width:30%;height:100%;padding:0;margin:0;text-indent:-9999px;top:0;background-color:rgba(0,0,0,0)}.photos_editor .photos_tools_filter .photos_btn_prev{right:auto;left:0;cursor:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/cursor_left.png) 17 17,w-resize}.photos_editor .photos_tools_filter .photos_btn_next{left:auto;right:0;cursor:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/cursor_right.png) 17 17,e-resize}.photos_editor .photos_info_rotate .photos_wrap_protractor{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/cursor_out_tb_brunch.png) 19 19,n-resize}.photos_editor .photos_box_area:hover{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/cursor_move_brunch.png) 17 17,move}.photos_box_area .photos_corner_br,.photos_box_area .photos_corner_tl{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/cursor_tlbr_brunch.png) 17 17,nwse-resize}.photos_box_area .photos_corner_bl,.photos_box_area .photos_corner_tr{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/cursor_trbl_brunch.png) 17 17,nesw-resize}.photos_box_area .photos_corner_l{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/cursor_lr_brunch.png) 17 17,w-resize}.photos_box_area .photos_corner_r{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/cursor_lr_brunch.png) 17 17,e-resize}.photos_box_area .photos_corner_b{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/cursor_tb_brunch.png) 17 17,s-resize}.photos_box_area .photos_corner_t{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/cursor_tb_brunch.png) 17 17,n-resize}.photos_editor.photos_msie .photos_tools_filter .photos_btn_prev{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/cursor_left.cur),w-resize}.photos_editor.photos_msie .photos_tools_filter .photos_btn_next{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/cursor_right.cur),e-resize}.photos_editor.photos_msie .photos_info_rotate .photos_wrap_protractor{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/cursor_out_tb_brunch.cur),n-resize}.photos_editor.photos_msie .photos_box_area:hover{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/cursor_move_brunch.cur),move}.photos_editor.photos_msie .photos_box_area .photos_corner_br,.photos_editor.photos_msie .photos_box_area .photos_corner_tl{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/cursor_tlbr_brunch.cur),nwse-resize}.photos_editor.photos_msie .photos_box_area .photos_corner_bl,.photos_editor.photos_msie .photos_box_area .photos_corner_tr{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/cursor_trbl_brunch.cur),nesw-resize}.photos_editor.photos_msie .photos_box_area .photos_corner_l{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/cursor_lr_brunch.cur),w-resize}.photos_editor.photos_msie .photos_box_area .photos_corner_r{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/cursor_lr_brunch.cur),e-resize}.photos_editor.photos_msie .photos_box_area .photos_corner_b{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/cursor_tb_brunch.cur),s-resize}.photos_editor.photos_msie .photos_box_area .photos_corner_t{cursor:url(//t1.daumcdn.net/fp/photos/img/icon_brunch/cursor_tb_brunch.cur),n-resize}.photos_editor :after,.photos_editor :before{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}';
            "<!--brunch:css-->" !== b && a.Injector.loadCSS(b),
                a.addModule("Brunch", {
                    init: function(a, b, c) {
                        this.sandbox = a,
                            this.frame = b,
                            this.prefix = c.prefix,
                            this.isListAvailable = !0,
                            this._render(),
                            this._bindEvent()
                    },
                    _render: function() {
                        var b = a.$$p(".container_main")[0];
                        this._appendMenuBtn(b),
                            this._appendSaveBtn(b)
                    },
                    _appendMenuBtn: function(a) {
                        this.listArea = document.createElement("div"),
                            this.listArea.className = this.prefix + "list_area",
                            a.appendChild(this.listArea),
                            this.listArea.innerHTML = '<button type="button" class="' + this.prefix + 'btn_quicklist photos_hide" data-click="menu:list">    <span class="' + this.prefix + "ico_photos " + this.prefix + 'ico_list">목록</span></button>'
                    },
                    _appendSaveBtn: function(b) {
                        var c = a.$$p(".btn_save", this.frame)[0];
                        this.cancelArea = a.$$p(".cancel_area", b)[0],
                            this.cancelArea.appendChild(c)
                    },
                    _bindEvent: function() {
                        var b = this;
                        this.sandbox.on(["app:open", "app:open:list", "detailmenu"], function() {
                            b.isListAvailable = !0,
                                b._showTopMenu()
                        }),
                            this.sandbox.on("submenu", function() {
                                b.isListAvailable = !1,
                                    b._hideTopMenu()
                            }),
                            this.sandbox.on("quicklist:show", function() {
                                b.listArea.classList.add(a.HIDE_CLASS)
                            }),
                            this.sandbox.on("quicklist:hide:transitionend", function() {
                                b.isListAvailable && b.listArea.classList.remove(a.HIDE_CLASS)
                            })
                    },
                    _showTopMenu: function() {
                        this.listArea.classList.remove(a.HIDE_CLASS),
                            this.cancelArea.classList.remove(a.HIDE_CLASS)
                    },
                    _hideTopMenu: function() {
                        this.listArea.classList.add(a.HIDE_CLASS),
                            this.cancelArea.classList.add(a.HIDE_CLASS)
                    }
                })
        }(window.photos = "object" == typeof window.photos ? window.photos : {}),
        function(a) {
            "use strict";
            "undefined" != typeof a.photos && (a.photos.version = "1.2.3")
        }(window),
        photos
});
