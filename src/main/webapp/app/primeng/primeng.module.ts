import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PatrimonIoButtonDemoModule } from './buttons/button/buttondemo.module';
import { PatrimonIoSplitbuttonDemoModule } from './buttons/splitbutton/splitbuttondemo.module';

import { PatrimonIoDialogDemoModule } from './overlay/dialog/dialogdemo.module';
import { PatrimonIoConfirmDialogDemoModule } from './overlay/confirmdialog/confirmdialogdemo.module';
import { PatrimonIoLightboxDemoModule } from './overlay/lightbox/lightboxdemo.module';
import { PatrimonIoTooltipDemoModule } from './overlay/tooltip/tooltipdemo.module';
import { PatrimonIoOverlayPanelDemoModule } from './overlay/overlaypanel/overlaypaneldemo.module';
import { PatrimonIoSideBarDemoModule } from './overlay/sidebar/sidebardemo.module';

import { PatrimonIoKeyFilterDemoModule } from './inputs/keyfilter/keyfilterdemo.module';
import { PatrimonIoInputTextDemoModule } from './inputs/inputtext/inputtextdemo.module';
import { PatrimonIoInputTextAreaDemoModule } from './inputs/inputtextarea/inputtextareademo.module';
import { PatrimonIoInputGroupDemoModule } from './inputs/inputgroup/inputgroupdemo.module';
import { PatrimonIoCalendarDemoModule } from './inputs/calendar/calendardemo.module';
import { PatrimonIoCheckboxDemoModule } from './inputs/checkbox/checkboxdemo.module';
import { PatrimonIoChipsDemoModule } from './inputs/chips/chipsdemo.module';
import { PatrimonIoColorPickerDemoModule } from './inputs/colorpicker/colorpickerdemo.module';
import { PatrimonIoInputMaskDemoModule } from './inputs/inputmask/inputmaskdemo.module';
import { PatrimonIoInputSwitchDemoModule } from './inputs/inputswitch/inputswitchdemo.module';
import { PatrimonIoPasswordIndicatorDemoModule } from './inputs/passwordindicator/passwordindicatordemo.module';
import { PatrimonIoAutoCompleteDemoModule } from './inputs/autocomplete/autocompletedemo.module';
import { PatrimonIoSliderDemoModule } from './inputs/slider/sliderdemo.module';
import { PatrimonIoSpinnerDemoModule } from './inputs/spinner/spinnerdemo.module';
import { PatrimonIoRatingDemoModule } from './inputs/rating/ratingdemo.module';
import { PatrimonIoSelectDemoModule } from './inputs/select/selectdemo.module';
import { PatrimonIoSelectButtonDemoModule } from './inputs/selectbutton/selectbuttondemo.module';
import { PatrimonIoListboxDemoModule } from './inputs/listbox/listboxdemo.module';
import { PatrimonIoRadioButtonDemoModule } from './inputs/radiobutton/radiobuttondemo.module';
import { PatrimonIoToggleButtonDemoModule } from './inputs/togglebutton/togglebuttondemo.module';
import { PatrimonIoEditorDemoModule } from './inputs/editor/editordemo.module';

import { PatrimonIoMessagesDemoModule } from './messages/messages/messagesdemo.module';
import { PatrimonIoToastDemoModule } from './messages/toast/toastdemo.module';
import { PatrimonIoGalleriaDemoModule } from './multimedia/galleria/galleriademo.module';

import { PatrimonIoFileUploadDemoModule } from './fileupload/fileupload/fileuploaddemo.module';

import { PatrimonIoAccordionDemoModule } from './panel/accordion/accordiondemo.module';
import { PatrimonIoPanelDemoModule } from './panel/panel/paneldemo.module';
import { PatrimonIoTabViewDemoModule } from './panel/tabview/tabviewdemo.module';
import { PatrimonIoFieldsetDemoModule } from './panel/fieldset/fieldsetdemo.module';
import { PatrimonIoToolbarDemoModule } from './panel/toolbar/toolbardemo.module';
import { PatrimonIoScrollPanelDemoModule } from './panel/scrollpanel/scrollpaneldemo.module';
import { PatrimonIoCardDemoModule } from './panel/card/carddemo.module';
import { PatrimonIoFlexGridDemoModule } from './panel/flexgrid/flexgriddemo.module';

import { PatrimonIoTableDemoModule } from './data/table/tabledemo.module';
import { PatrimonIoVirtualScrollerDemoModule } from './data/virtualscroller/virtualscrollerdemo.module';
import { PatrimonIoPickListDemoModule } from './data/picklist/picklistdemo.module';
import { PatrimonIoOrderListDemoModule } from './data/orderlist/orderlistdemo.module';
import { PatrimonIoFullCalendarDemoModule } from './data/fullcalendar/fullcalendardemo.module';
import { PatrimonIoTreeDemoModule } from './data/tree/treedemo.module';
import { PatrimonIoTreeTableDemoModule } from './data/treetable/treetabledemo.module';
import { PatrimonIoPaginatorDemoModule } from './data/paginator/paginatordemo.module';
import { PatrimonIoGmapDemoModule } from './data/gmap/gmapdemo.module';
import { PatrimonIoOrgChartDemoModule } from './data/orgchart/orgchartdemo.module';
import { PatrimonIoCarouselDemoModule } from './data/carousel/carouseldemo.module';
import { PatrimonIoDataViewDemoModule } from './data/dataview/dataviewdemo.module';

import { PatrimonIoBarchartDemoModule } from './charts/barchart/barchartdemo.module';
import { PatrimonIoDoughnutchartDemoModule } from './charts/doughnutchart/doughnutchartdemo.module';
import { PatrimonIoLinechartDemoModule } from './charts/linechart/linechartdemo.module';
import { PatrimonIoPiechartDemoModule } from './charts/piechart/piechartdemo.module';
import { PatrimonIoPolarareachartDemoModule } from './charts/polarareachart/polarareachartdemo.module';
import { PatrimonIoRadarchartDemoModule } from './charts/radarchart/radarchartdemo.module';

import { PatrimonIoDragDropDemoModule } from './dragdrop/dragdrop/dragdropdemo.module';

import { PatrimonIoMenuDemoModule } from './menu/menu/menudemo.module';
import { PatrimonIoContextMenuDemoModule } from './menu/contextmenu/contextmenudemo.module';
import { PatrimonIoPanelMenuDemoModule } from './menu/panelmenu/panelmenudemo.module';
import { PatrimonIoStepsDemoModule } from './menu/steps/stepsdemo.module';
import { PatrimonIoTieredMenuDemoModule } from './menu/tieredmenu/tieredmenudemo.module';
import { PatrimonIoBreadcrumbDemoModule } from './menu/breadcrumb/breadcrumbdemo.module';
import { PatrimonIoMegaMenuDemoModule } from './menu/megamenu/megamenudemo.module';
import { PatrimonIoMenuBarDemoModule } from './menu/menubar/menubardemo.module';
import { PatrimonIoSlideMenuDemoModule } from './menu/slidemenu/slidemenudemo.module';
import { PatrimonIoTabMenuDemoModule } from './menu/tabmenu/tabmenudemo.module';

import { PatrimonIoBlockUIDemoModule } from './misc/blockui/blockuidemo.module';
import { PatrimonIoCaptchaDemoModule } from './misc/captcha/captchademo.module';
import { PatrimonIoDeferDemoModule } from './misc/defer/deferdemo.module';
import { PatrimonIoInplaceDemoModule } from './misc/inplace/inplacedemo.module';
import { PatrimonIoProgressBarDemoModule } from './misc/progressbar/progressbardemo.module';
import { PatrimonIoRTLDemoModule } from './misc/rtl/rtldemo.module';
import { PatrimonIoTerminalDemoModule } from './misc/terminal/terminaldemo.module';
import { PatrimonIoValidationDemoModule } from './misc/validation/validationdemo.module';
import { PatrimonIoProgressSpinnerDemoModule } from './misc/progressspinner/progressspinnerdemo.module';

@NgModule({
  imports: [
    PatrimonIoMenuDemoModule,
    PatrimonIoContextMenuDemoModule,
    PatrimonIoPanelMenuDemoModule,
    PatrimonIoStepsDemoModule,
    PatrimonIoTieredMenuDemoModule,
    PatrimonIoBreadcrumbDemoModule,
    PatrimonIoMegaMenuDemoModule,
    PatrimonIoMenuBarDemoModule,
    PatrimonIoSlideMenuDemoModule,
    PatrimonIoTabMenuDemoModule,

    PatrimonIoBlockUIDemoModule,
    PatrimonIoCaptchaDemoModule,
    PatrimonIoDeferDemoModule,
    PatrimonIoInplaceDemoModule,
    PatrimonIoProgressBarDemoModule,
    PatrimonIoInputMaskDemoModule,
    PatrimonIoRTLDemoModule,
    PatrimonIoTerminalDemoModule,
    PatrimonIoValidationDemoModule,

    PatrimonIoButtonDemoModule,
    PatrimonIoSplitbuttonDemoModule,

    PatrimonIoInputTextDemoModule,
    PatrimonIoInputTextAreaDemoModule,
    PatrimonIoInputGroupDemoModule,
    PatrimonIoCalendarDemoModule,
    PatrimonIoChipsDemoModule,
    PatrimonIoInputMaskDemoModule,
    PatrimonIoInputSwitchDemoModule,
    PatrimonIoPasswordIndicatorDemoModule,
    PatrimonIoAutoCompleteDemoModule,
    PatrimonIoSliderDemoModule,
    PatrimonIoSpinnerDemoModule,
    PatrimonIoRatingDemoModule,
    PatrimonIoSelectDemoModule,
    PatrimonIoSelectButtonDemoModule,
    PatrimonIoListboxDemoModule,
    PatrimonIoRadioButtonDemoModule,
    PatrimonIoToggleButtonDemoModule,
    PatrimonIoEditorDemoModule,
    PatrimonIoColorPickerDemoModule,
    PatrimonIoCheckboxDemoModule,
    PatrimonIoKeyFilterDemoModule,

    PatrimonIoMessagesDemoModule,
    PatrimonIoToastDemoModule,
    PatrimonIoGalleriaDemoModule,

    PatrimonIoFileUploadDemoModule,

    PatrimonIoAccordionDemoModule,
    PatrimonIoPanelDemoModule,
    PatrimonIoTabViewDemoModule,
    PatrimonIoFieldsetDemoModule,
    PatrimonIoToolbarDemoModule,
    PatrimonIoScrollPanelDemoModule,
    PatrimonIoCardDemoModule,
    PatrimonIoFlexGridDemoModule,

    PatrimonIoBarchartDemoModule,
    PatrimonIoDoughnutchartDemoModule,
    PatrimonIoLinechartDemoModule,
    PatrimonIoPiechartDemoModule,
    PatrimonIoPolarareachartDemoModule,
    PatrimonIoRadarchartDemoModule,

    PatrimonIoDragDropDemoModule,

    PatrimonIoDialogDemoModule,
    PatrimonIoConfirmDialogDemoModule,
    PatrimonIoLightboxDemoModule,
    PatrimonIoTooltipDemoModule,
    PatrimonIoOverlayPanelDemoModule,
    PatrimonIoSideBarDemoModule,

    PatrimonIoTableDemoModule,
    PatrimonIoDataViewDemoModule,
    PatrimonIoVirtualScrollerDemoModule,
    PatrimonIoFullCalendarDemoModule,
    PatrimonIoOrderListDemoModule,
    PatrimonIoPickListDemoModule,
    PatrimonIoTreeDemoModule,
    PatrimonIoTreeTableDemoModule,
    PatrimonIoPaginatorDemoModule,
    PatrimonIoOrgChartDemoModule,
    PatrimonIoGmapDemoModule,
    PatrimonIoCarouselDemoModule,
    PatrimonIoProgressSpinnerDemoModule,
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PatrimonIoprimengModule {}
