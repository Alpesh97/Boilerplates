import { MDCComponent, MDCFoundation } from '@material/base';
import { MDCTabBar } from '@material/tab-bar';
import { MDCList } from '@material/list';
import { MDCTextField } from '@material/textfield';
import { MDCDrawer } from "@material/drawer";
import { MDCTopAppBar } from "@material/top-app-bar";
import { MDCSwitch } from '@material/switch';
import { MDCDialog } from '@material/dialog';
import { MDCRipple } from '@material/ripple';
import { MDCLinearProgress } from '@material/linear-progress';  

function materialize_components() {


    //tab bar
    if ($(".mdc-tab-bar").length) {
        const header_tabBar = [].map.call(document.querySelectorAll('.mdc-tab-bar'), function (el1) {
            return new MDCTabBar(el1);      
        });
    }
    if ($(".switch-view").length) {
        const switch_tabBar = [].map.call(document.querySelectorAll('.switch-view'), function (el3) {
           return new MDCTabBar(el3);
       });
    }

    if ($(".chart-tab-bar").length) {
       const chart_tabBar = [].map.call(document.querySelectorAll('.chart-tab-bar'), function (el4) {
           return new MDCTabBar(el4);
       });
   }

    //input text
    if ($(".mdc-text-field").length) {
       const textField = [].map.call(document.querySelectorAll('.mdc-text-field'), function (el) {
           return new MDCTextField(el);
       });
   }
   if ($(".mdc-switch").length) {
       const switchControl = [].map.call(document.querySelectorAll('.mdc-switch'), function (el2) {
           return new MDCSwitch(el2);
       });
   }
   if ($(".mdc-button").length) {
       const buttonRipple = [].map.call(document.querySelectorAll('.mdc-button'), function (el3) {
           return new MDCRipple(el3);
       });
   }
   if ($(".mdc-dialog").length) {
       const dialog = [].map.call(document.querySelectorAll('.mdc-dialog'), function (el) {
           return new MDCDialog(el);
       });
   }

     // side bar
     if ($(".app-header").length) {
       const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer.side-menu'));
       const topAppBar = MDCTopAppBar.attachTo(document.querySelector(".app-header"));
       topAppBar.setScrollTarget(document.querySelector('.app-main'));
       topAppBar.listen('MDCTopAppBar:nav', () => {
           drawer.open = !drawer.open;
       });
   }

   if($('.mdc-modal-btn').length){
    jQuery('.mdc-modal-btn').on('click', function(){
        var modal_src = $(this).attr('data-src');
        const dialog_element = MDCDialog.attachTo(document.getElementById(modal_src)); 
        dialog_element.open();
    });
}
if($('.invalidDetail-popup').length){
    setTimeout(function(){
        const dialog_element = MDCDialog.attachTo(document.getElementById('invalidDetailModal')); 
        dialog_element.open();
    }, 1000)
}
}

materialize_components();



// jQuery('.page-title h1').on('click', function(){
// var dialogEl = document.querySelector('.mdc-dialog');
// console.log(dialogEl);
// dialog1 = new mdc.dialog.MDCDialog(dialogEl);
//    dialog1.open();
// });

