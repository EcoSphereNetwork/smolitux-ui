import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  Button, 
  LanguageSwitcher, 
  useI18n,
  Drawer,
  Menu,
  MenuItem,
  MenuDivider
} from '@smolitux/core';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const { t } = useI18n();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">Smolitux UI</div>
        <div className="header-actions">
          <LanguageSwitcher />
          <Button 
            variant="secondary" 
            onClick={toggleMobileMenu}
            className="mobile-menu-button"
          >
            {t('common.menu')}
          </Button>
        </div>
      </header>

      <div className="content-wrapper">
        <aside className="sidebar">
          <nav>
            <ul className="nav-list">
              <li className="nav-item">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  {t('navigation.home')}
                </NavLink>
              </li>

              <li className="nav-group">
                <h3 className="nav-group-title">{t('navigation.components')}</h3>
                <ul className="nav-list">
                  <li className="nav-item">
                    <NavLink 
                      to="/components/buttons" 
                      className={({ isActive }) => 
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      {t('components.buttons')}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink 
                      to="/components/inputs" 
                      className={({ isActive }) => 
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      {t('components.inputs')}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink 
                      to="/components/cards" 
                      className={({ isActive }) => 
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      {t('components.cards')}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink 
                      to="/components/alerts" 
                      className={({ isActive }) => 
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      {t('components.alerts')}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink 
                      to="/components/modals" 
                      className={({ isActive }) => 
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      {t('components.modals')}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink 
                      to="/components/tabs" 
                      className={({ isActive }) => 
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      {t('components.tabs')}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink 
                      to="/components/forms" 
                      className={({ isActive }) => 
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      {t('components.forms')}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink 
                      to="/components/tables" 
                      className={({ isActive }) => 
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      {t('components.tables')}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink 
                      to="/components/navigation" 
                      className={({ isActive }) => 
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      {t('components.navigation')}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink 
                      to="/components/animations" 
                      className={({ isActive }) => 
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      {t('components.animations')}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink 
                      to="/components/charts" 
                      className={({ isActive }) => 
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      {t('components.charts')}
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li className="nav-group">
                <h3 className="nav-group-title">{t('navigation.features')}</h3>
                <ul className="nav-list">
                  <li className="nav-item">
                    <NavLink 
                      to="/theming" 
                      className={({ isActive }) => 
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      {t('features.theming')}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink 
                      to="/i18n" 
                      className={({ isActive }) => 
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      {t('features.i18n')}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink 
                      to="/form-validation" 
                      className={({ isActive }) => 
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      {t('features.formValidation')}
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </aside>

        <Drawer
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          placement="left"
        >
          <Menu>
            <MenuItem>
              <NavLink to="/">{t('navigation.home')}</NavLink>
            </MenuItem>
            
            <MenuDivider />
            <MenuItem header>{t('navigation.components')}</MenuItem>
            
            <MenuItem>
              <NavLink to="/components/buttons">{t('components.buttons')}</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/components/inputs">{t('components.inputs')}</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/components/cards">{t('components.cards')}</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/components/alerts">{t('components.alerts')}</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/components/modals">{t('components.modals')}</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/components/tabs">{t('components.tabs')}</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/components/forms">{t('components.forms')}</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/components/tables">{t('components.tables')}</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/components/navigation">{t('components.navigation')}</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/components/animations">{t('components.animations')}</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/components/charts">{t('components.charts')}</NavLink>
            </MenuItem>
            
            <MenuDivider />
            <MenuItem header>{t('navigation.features')}</MenuItem>
            
            <MenuItem>
              <NavLink to="/theming">{t('features.theming')}</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/i18n">{t('features.i18n')}</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/form-validation">{t('features.formValidation')}</NavLink>
            </MenuItem>
          </Menu>
        </Drawer>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;