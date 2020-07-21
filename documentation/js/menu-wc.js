'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">blood-bank documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link">AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AdminModule-0bee53b41e10b9d7f43edd78901a45a1"' : 'data-target="#xs-components-links-module-AdminModule-0bee53b41e10b9d7f43edd78901a45a1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminModule-0bee53b41e10b9d7f43edd78901a45a1"' :
                                            'id="xs-components-links-module-AdminModule-0bee53b41e10b9d7f43edd78901a45a1"' }>
                                            <li class="link">
                                                <a href="components/AdminComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidebarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudentsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminRoutingModule.html" data-type="entity-link">AdminRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-c3c75942473bbbf3ed398d28fbbd97ed"' : 'data-target="#xs-components-links-module-AppModule-c3c75942473bbbf3ed398d28fbbd97ed"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-c3c75942473bbbf3ed398d28fbbd97ed"' :
                                            'id="xs-components-links-module-AppModule-c3c75942473bbbf3ed398d28fbbd97ed"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageNotFoundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PageNotFoundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthModule-a7bba5d9354b8691511824009912e9e4"' : 'data-target="#xs-components-links-module-AuthModule-a7bba5d9354b8691511824009912e9e4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-a7bba5d9354b8691511824009912e9e4"' :
                                            'id="xs-components-links-module-AuthModule-a7bba5d9354b8691511824009912e9e4"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link">AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BloodBankStaffModule.html" data-type="entity-link">BloodBankStaffModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BloodBankStaffModule-98ae6d984b5f8db90e4065f66989c170"' : 'data-target="#xs-components-links-module-BloodBankStaffModule-98ae6d984b5f8db90e4065f66989c170"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BloodBankStaffModule-98ae6d984b5f8db90e4065f66989c170"' :
                                            'id="xs-components-links-module-BloodBankStaffModule-98ae6d984b5f8db90e4065f66989c170"' }>
                                            <li class="link">
                                                <a href="components/ActivityComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ActivityComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ApprovedRequestsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ApprovedRequestsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BloodBankStaffComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BloodBankStaffComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BloodProductComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BloodProductComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BloodProductsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BloodProductsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DonorActivitesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DonorActivitesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DonorInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DonorInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DonorsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DonorsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExpiredProductsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ExpiredProductsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HandleRequestComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HandleRequestComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RequestsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RequestsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BloodBankStaffRoutingModule.html" data-type="entity-link">BloodBankStaffRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DoctorModule.html" data-type="entity-link">DoctorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DoctorModule-51d9e032dd9cc9733bbfe9c256cf1317"' : 'data-target="#xs-components-links-module-DoctorModule-51d9e032dd9cc9733bbfe9c256cf1317"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DoctorModule-51d9e032dd9cc9733bbfe9c256cf1317"' :
                                            'id="xs-components-links-module-DoctorModule-51d9e032dd9cc9733bbfe9c256cf1317"' }>
                                            <li class="link">
                                                <a href="components/DoctorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DoctorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PatientComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PatientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PatientsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PatientsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RequestComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RequestComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DoctorRoutingModule.html" data-type="entity-link">DoctorRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DonorModule.html" data-type="entity-link">DonorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DonorModule-bac0aa58f821f5e551fe562c31f519ef"' : 'data-target="#xs-components-links-module-DonorModule-bac0aa58f821f5e551fe562c31f519ef"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DonorModule-bac0aa58f821f5e551fe562c31f519ef"' :
                                            'id="xs-components-links-module-DonorModule-bac0aa58f821f5e551fe562c31f519ef"' }>
                                            <li class="link">
                                                <a href="components/DonorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DonorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DonorRoutingModule.html" data-type="entity-link">DonorRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HospitalStaffModule.html" data-type="entity-link">HospitalStaffModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HospitalStaffModule-2f5748ae9060db1d1575ddc27f463e6a"' : 'data-target="#xs-components-links-module-HospitalStaffModule-2f5748ae9060db1d1575ddc27f463e6a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HospitalStaffModule-2f5748ae9060db1d1575ddc27f463e6a"' :
                                            'id="xs-components-links-module-HospitalStaffModule-2f5748ae9060db1d1575ddc27f463e6a"' }>
                                            <li class="link">
                                                <a href="components/EditProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HospitalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HospitalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PatientInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PatientInfoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HospitalStaffRoutingModule.html" data-type="entity-link">HospitalStaffRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/DashboardComponent-1.html" data-type="entity-link">DashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DashboardComponent-2.html" data-type="entity-link">DashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DashboardComponent-3.html" data-type="entity-link">DashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DashboardComponent-4.html" data-type="entity-link">DashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DonorActivitesComponent-1.html" data-type="entity-link">DonorActivitesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DonorComponent-1.html" data-type="entity-link">DonorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EditProfileComponent-1.html" data-type="entity-link">EditProfileComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EditProfileComponent-2.html" data-type="entity-link">EditProfileComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EditProfileComponent-3.html" data-type="entity-link">EditProfileComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent-1.html" data-type="entity-link">FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent-2.html" data-type="entity-link">FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent-3.html" data-type="entity-link">FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent-4.html" data-type="entity-link">FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeaderComponent-1.html" data-type="entity-link">HeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeaderComponent-2.html" data-type="entity-link">HeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeaderComponent-3.html" data-type="entity-link">HeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeaderComponent-4.html" data-type="entity-link">HeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PatientComponent-1.html" data-type="entity-link">PatientComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PatientsComponent-1.html" data-type="entity-link">PatientsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfileInfoComponent-1.html" data-type="entity-link">ProfileInfoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfileInfoComponent-2.html" data-type="entity-link">ProfileInfoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfileInfoComponent-3.html" data-type="entity-link">ProfileInfoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfileInfoComponent-4.html" data-type="entity-link">ProfileInfoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RequestsComponent-1.html" data-type="entity-link">RequestsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SidebarComponent-1.html" data-type="entity-link">SidebarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SidebarComponent-2.html" data-type="entity-link">SidebarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SidebarComponent-3.html" data-type="entity-link">SidebarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SidebarComponent-4.html" data-type="entity-link">SidebarComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdminService.html" data-type="entity-link">AdminService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BloodProductService.html" data-type="entity-link">BloodProductService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BoodGroupService.html" data-type="entity-link">BoodGroupService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DoctorService.html" data-type="entity-link">DoctorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DonorActivityService.html" data-type="entity-link">DonorActivityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DonorService.html" data-type="entity-link">DonorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationService.html" data-type="entity-link">NotificationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PatientService.html" data-type="entity-link">PatientService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PatientService-1.html" data-type="entity-link">PatientService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RequestService.html" data-type="entity-link">RequestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RequestsService.html" data-type="entity-link">RequestsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StatisticsService.html" data-type="entity-link">StatisticsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService-1.html" data-type="entity-link">UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/LoginAuthGuard.html" data-type="entity-link">LoginAuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AccessData.html" data-type="entity-link">AccessData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BloodBankStaff.html" data-type="entity-link">BloodBankStaff</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BloodProduct.html" data-type="entity-link">BloodProduct</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Donor.html" data-type="entity-link">Donor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DonorActivity.html" data-type="entity-link">DonorActivity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Patient.html" data-type="entity-link">Patient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Request.html" data-type="entity-link">Request</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link">User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});