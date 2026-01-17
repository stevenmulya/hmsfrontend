import { useState, useEffect, useMemo } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import {
  AppShell,
  Group,
  Button,
  Indicator,
  Image,
  Text,
  ActionIcon,
  Burger,
  Drawer,
  Stack,
  Divider,
  Menu,
  Avatar,
  Box,
  ScrollArea,
  Badge,
  CloseButton,
  Anchor,
  Skeleton,
  Affix,
  Popover,
  ThemeIcon,
  UnstyledButton,
  rem,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/CustomerAuthContext';
import { 
  IconShoppingCart, 
  IconUser, 
  IconLogout, 
  IconChevronDown, 
  IconTrash, 
  IconHome,
  IconPackage,
  IconNews,
  IconInfoCircle,
  IconX,
  IconPhoneCall,
  IconMail,
  IconBrandWhatsapp,
  IconChevronRight,
  IconMessageCircle2
} from '@tabler/icons-react';
import styles from './AppLayout.module.css';
import Footer from '../components/Footer';
import apiClient from '../api/apiClient';

function useSocials() {
  const [socials, setSocials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const response = await apiClient.get('/socials');
        setSocials(response.data.data || []);
      } catch (error) {
        console.error("Error fetching socials:", error);
        setSocials([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSocials();
  }, []);

  return { socials, loading };
}

function MobileCartButton({ items, onClick }) {
  return (
    <Indicator label={items.length} size={16} offset={4} disabled={items.length === 0}>
      <ActionIcon
        onClick={onClick}
        variant="subtle"
        color="white"
        aria-label="Keranjang Belanja"
        className={styles.iconButton}
        size="md"
      >
        <IconShoppingCart size={20}/>
      </ActionIcon>
    </Indicator>
  );
}

function MobileDrawer({ 
  opened, 
  onClose, 
  customer, 
  onLogout,
  whatsappContacts,
  emailContact,
  loadingSocials,
  createWhatsAppLink 
}) {
  const userInitials = useMemo(() => {
    if (!customer?.customer_name) return 'U';
    return customer.customer_name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }, [customer?.customer_name]);

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="right"
      padding="md"
      size="85%"
      withCloseButton={false}
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      styles={{
        content: {
          background: 'linear-gradient(to bottom, rgba(2, 62, 138, 0.95) 0%, rgba(28, 126, 186, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        },
      }}
    >
      <Stack justify="space-between" className={styles.drawerContent}>
        <Box>
          <Group justify="space-between" mb="xl">
            <Group gap="sm">
              <Image
                src="/hmslogo.png"
                h={30}
                w={30}
                fit="contain"
                alt="Logo HMS"
              />
              <Box>
                <Text fz="sm" fw={700} c="white" lh={1.2}>
                  PT Hutama Maju Sukses
                </Text>
                <Text fz="xs" c="white" lh={1.2} opacity={0.9}>
                  Build Your Dream in Construction
                </Text>
              </Box>
            </Group>
            <CloseButton
              icon={<IconX size={20} />}
              onClick={onClose}
              size="lg"
              color="white"
              variant="transparent"
              className={styles.drawerCloseButton}
            />
          </Group>

          {customer ? (
            <Box 
              p="md" 
              mb="lg" 
              className={styles.userInfoSection}
            >
              <Group>
                <Avatar 
                  color="blue" 
                  radius="xl"
                  size="md"
                  className={styles.userAvatar}
                >
                  {userInitials}
                </Avatar>
                <Box style={{ flex: 1 }}>
                  <Text fw={600} c="white" size="sm" truncate>
                    {customer.customer_name}
                  </Text>
                  <Text size="xs" c="rgba(255,255,255,0.8)">
                    {customer.email || 'Customer'}
                  </Text>
                </Box>
              </Group>
              
              <Button
                component={Link}
                to="/profile"
                variant="light"
                color="white"
                fullWidth
                size="xs"
                leftSection={<IconUser size={14} />}
                onClick={onClose}
                mt="md"
                className={styles.profileQuickAction}
              >
                Profile Saya
              </Button>
            </Box>
          ) : (
            <Box 
              p="md" 
              mb="lg" 
              className={styles.guestUserInfo}
            >
              <Group>
                <Avatar color="blue" radius="xl" size="md">
                  <IconUser size={18} />
                </Avatar>
                <Box>
                  <Text fw={600} c="white" size="sm">
                    Guest User
                  </Text>
                  <Text size="xs" c="rgba(255,255,255,0.8)">
                    Login untuk pengalaman terbaik
                  </Text>
                </Box>
              </Group>
            </Box>
          )}

          <Stack gap="xs" mb="xl">
            <Button
              component={Link}
              to="/"
              variant="subtle"
              color="white"
              onClick={onClose}
              fullWidth
              justify="start"
              size="md"
              leftSection={<IconHome size={20} />}
              className={styles.drawerNavButton}
            >
              Home
            </Button>

            <Button
              component={Link}
              to="/products"
              variant="subtle"
              color="white"
              onClick={onClose}
              fullWidth
              justify="start"
              size="md"
              leftSection={<IconPackage size={20} />}
              className={styles.drawerNavButton}
            >
              Product
            </Button>

            <Button
              component={Link}
              to="/blog"
              variant="subtle"
              color="white"
              onClick={onClose}
              fullWidth
              justify="start"
              size="md"
              leftSection={<IconNews size={20} />}
              className={styles.drawerNavButton}
            >
              Blog
            </Button>

            <Button
              component={Link}
              to="/about"
              variant="subtle"
              color="white"
              onClick={onClose}
              fullWidth
              justify="start"
              size="md"
              leftSection={<IconInfoCircle size={20} />}
              className={styles.drawerNavButton}
            >
              About
            </Button>
          </Stack>

          <Divider my="sm" className={styles.drawerDivider} />

          <Box mb="lg">
            <Text fw={600} c="white" size="xs" mb="sm" className={styles.drawerSectionTitle}>
              Hubungi Kami
            </Text>
            <Stack gap="xs" className={loadingSocials ? styles.contactsLoading : ''}>
              {loadingSocials ? (
                <>
                  <Skeleton height={40} width="100%" radius="sm" />
                  <Skeleton height={40} width="100%" radius="sm" />
                </>
              ) : (
                <>
                  {whatsappContacts.map((wa, index) => {
                    const waLink = createWhatsAppLink(wa.url);
                    if (waLink === '#') return null;

                    return (
                      <Group 
                        key={`wa-${index}`} 
                        gap="xs" 
                        className={styles.contactItem}
                        wrap="nowrap"
                      >
                        <IconPhoneCall size={16} className={styles.contactIcon} />
                        <Box style={{ flex: 1 }}>
                          <Text size="xs" c="white" fw={500} className={styles.contactLabel}>
                            WhatsApp
                          </Text>
                          <Anchor
                            href={waLink}
                            target="_blank"
                            size="xs"
                            className={styles.contactLink}
                            rel="noopener noreferrer"
                          >
                            {wa.name || `WhatsApp ${index + 1}`}
                          </Anchor>
                        </Box>
                      </Group>
                    );
                  })}
                  
                  {emailContact && (
                    <Group gap="xs" className={styles.contactItem} wrap="nowrap">
                      <IconMail size={16} className={styles.contactIcon} />
                      <Box style={{ flex: 1 }}>
                        <Text size="xs" c="white" fw={500} className={styles.contactLabel}>
                          Email
                        </Text>
                        <Anchor
                          href={`mailto:${emailContact.url}`}
                          size="xs"
                          className={styles.contactLink}
                        >
                          {emailContact.name || emailContact.url}
                        </Anchor>
                      </Box>
                    </Group>
                  )}
                </>
              )}
            </Stack>
          </Box>

          <Divider my="sm" className={styles.drawerDivider} />

          {customer ? (
            <Stack gap="md">
              <Button
                onClick={onLogout}
                variant="filled"
                leftSection={<IconLogout size={18} />}
                fullWidth
                size="md"
                className={styles.logoutButton}
              >
                Keluar Akun
              </Button>
            </Stack>
          ) : (
            <Stack gap="xs">
              <Text size="sm" fw={600} c="white" mb="xs">
                Masuk ke Akun
              </Text>
              <Button 
                component={Link} 
                to="/login" 
                variant="light"
                color="white" 
                onClick={onClose} 
                fullWidth
                size="md"
                leftSection={<IconUser size={18} />}
                className={styles.loginButton}
              >
                Login
              </Button>
              <Button 
                component={Link} 
                to="/register" 
                variant="light"
                color="white" 
                onClick={onClose} 
                fullWidth
                size="md"
                className={styles.loginButton}
              >
                Daftar Sekarang
              </Button>
            </Stack>
          )}
        </Box>

        <Box ta="center" pt="md" className={styles.drawerFooter}>
          <Text size="xs" c="rgba(255,255,255,0.5)" className={styles.drawerFooterSubtext}>
            © 2025 PT Hutama Maju Sukses. All rights reserved
          </Text>
        </Box>
      </Stack>
    </Drawer>
  );
}

function WhatsAppFloatingButton({ socials, createWhatsAppLink }) {
  const [opened, setOpened] = useState(false);
  const whatsappContacts = socials.filter(social => 
    social.platform?.toLowerCase() === 'whatsapp'
  );

  if (whatsappContacts.length === 0) return null;

  return (
    <Affix position={{ bottom: 30, right: 30 }} zIndex={100}>
      <Popover 
        opened={opened} 
        onChange={setOpened} 
        withArrow 
        position="top-end" 
        shadow="xl"
        width={320}
        trapFocus
        radius="lg"
        offset={10}
        arrowSize={12}
      >
        <Popover.Target>
          <ActionIcon
            className={styles.whatsappFloat}
            radius="xl"
            size={60}
            onClick={() => setOpened((o) => !o)}
            aria-label="Chat WhatsApp"
          >
            {opened ? <IconX size={32} /> : <IconBrandWhatsapp size={32} />}
          </ActionIcon>
        </Popover.Target>
        
        <Popover.Dropdown p={0} className={styles.whatsappDropdown}>
          <Box className={styles.whatsappHeader}>
            <Group gap="sm" align="center">
              <IconBrandWhatsapp size={28} color="white" stroke={2} />
              <Box>
                <Text size="md" fw={700} c="white" lh={1.2}>WhatsApp Support</Text>
                <Text size="xs" c="white" opacity={0.9} lh={1.2}>Klik admin untuk memulai chat</Text>
              </Box>
            </Group>
          </Box>
          
          <Stack gap={0} bg="white">
            {whatsappContacts.map((wa, index) => {
              const waLink = createWhatsAppLink(wa.url);
              
              if (waLink === '#') return null;

              return (
                <a
                  key={wa.id || index}
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.whatsappItem}
                  style={{ textDecoration: 'none' }}
                >
                  <Group gap="md" wrap="nowrap" align="center">
                    <ThemeIcon 
                      size={42} 
                      radius="xl" 
                      color="green"
                      variant="light"
                      className={styles.whatsappItemIcon}
                    >
                      <IconBrandWhatsapp size={24} stroke={2} />
                    </ThemeIcon>
                    
                    <Box style={{ flex: 1 }}>
                      <Text size="sm" fw={600} c="dark.9" lh={1.3}>
                        {wa.name || `Admin ${index + 1}`}
                      </Text>
                      <Group gap={4} align="center">
                        <IconMessageCircle2 size={12} color="#25D366" />
                        <Text size="xs" c="dimmed" lh={1.2}>
                          Online
                        </Text>
                      </Group>
                    </Box>
                    
                    <IconChevronRight size={16} color="#adb5bd" />
                  </Group>
                </a>
              );
            })}
          </Stack>
        </Popover.Dropdown>
      </Popover>
    </Affix>
  );
}

export default function AppLayout() {
  const { items } = useCart();
  const { customer, logout } = useAuth();
  const navigate = useNavigate();

  const [opened, { toggle, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { socials, loading: loadingSocials } = useSocials();

  const handleLogout = () => {
    logout();
    close();
    navigate('/');
  };

  const createWhatsAppLink = (urlOrNumber) => {
    if (!urlOrNumber) return '#';
    const cleanedInput = String(urlOrNumber).trim();
    let number = cleanedInput.replace(/\D/g, '');
    if (!number) return '#';
    if (number.startsWith('0')) {
        number = '62' + number.substring(1);
    } 
    else if (!number.startsWith('62')) {
        number = '62' + number;
    }
    return `https://wa.me/${number}`;
  };

  const whatsappContacts = socials.filter(social => 
    social.platform?.toLowerCase() === 'whatsapp'
  );
  const emailContact = socials.find(social => 
    social.platform?.toLowerCase() === 'email'
  );

  return (
    <AppShell header={{ height: 70 }} padding={0}>
      <AppShell.Header
        style={{
          background: 'linear-gradient(to bottom, #023E8A 0%, #1C7EBA 100%)',
          borderBottom: 'none',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <Group
          h="100%"
          justify="space-between"
          align="center"
          style={{ paddingLeft: isMobile ? '20px' : '50px', paddingRight: isMobile ? '20px' : '50px' }}
        >
          <Group
            component={Link}
            to="/"
            gap="sm"
            style={{ textDecoration: 'none' }}
            onClick={close}
          >
            <Image
              src="/hmslogo.png"
              h={40}
              w={40}
              fit="contain"
              alt="Logo HMS"
            />
            <div>
              <Text fz="sm" fw={700} c="white" lh={1.2} className={styles.companyName}>
                PT Hutama Maju Sukses
              </Text>
              {!isMobile && (
                <Text fz="xs" c="white" lh={1.2} className={styles.companyTagline}>
                  Build Your Dream in Construction
                </Text>
              )}
            </div>
          </Group>

          {!isMobile ? (
            <Group>
              <Group gap="md" style={{ marginRight: 'xl' }}>
                <Button component={Link} to="/" variant="subtle" color="white" className={styles.navButton}>
                  Home
                </Button>
                <Button component={Link} to="/products" variant="subtle" color="white" className={styles.navButton}>
                  Product
                </Button>
                <Button component={Link} to="/blog" variant="subtle" color="white" className={styles.navButton}>
                  Blog
                </Button>
                <Button component={Link} to="/about" variant="subtle" color="white" className={styles.navButton}>
                  About
                </Button>
              </Group>

              <Group>
                {customer ? (
                  <>
                    <Menu
                      position="bottom-end"
                      width={160}
                      transition="pop-top-right"
                      withinPortal
                    >
                      <Menu.Target>
                        <Button
                          variant="subtle"
                          color="white"
                          leftSection={<IconUser size={18} />}
                          rightSection={<IconChevronDown size={16} />}
                          className={`${styles.navButton} ${styles.userMenuButton}`}
                          pr="xs"
                        >
                          <Text truncate maw={120}>
                            {customer.customer_name}
                          </Text>
                        </Button>
                      </Menu.Target>

                      <Menu.Dropdown>
                        <Menu.Label>
                          Akun Saya
                        </Menu.Label>
                        <Menu.Item
                          component={Link}
                          to="/profile"
                          leftSection={<IconUser size={16} />}
                          onClick={close}
                        >
                          Profile
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item
                          color="red"
                          leftSection={<IconLogout size={16} />}
                          onClick={handleLogout}
                        >
                          Logout
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>

                    <Indicator label={items.length} size={16} disabled={items.length === 0} className={styles.cartBadge}>
                      <ActionIcon
                        onClick={() => navigate('/checkout')}
                        variant="subtle"
                        color="white"
                        aria-label="Keranjang Belanja"
                        className={styles.iconButton}
                        size="lg"
                      >
                        <IconShoppingCart size={20}/>
                      </ActionIcon>
                    </Indicator>
                  </>
                ) : (
                  <>
                    <Group gap="sm" style={{ marginRight: 'md' }}>
                      <Button
                        component={Link}
                        to="/login"
                        variant="subtle"
                        color="white"
                        className={styles.navButton}
                        leftSection={<IconUser size={16} />}
                      >
                        Login
                      </Button>
                      <Text c="white" opacity={0.6}>|</Text>
                      <Button
                        component={Link}
                        to="/register"
                        variant="subtle"
                        color="white"
                        className={styles.navButton}
                      >
                        Register
                      </Button>
                    </Group>

                    <Indicator label={items.length} size={16} disabled={items.length === 0} className={styles.cartBadge}>
                      <ActionIcon
                        onClick={() => navigate('/checkout')}
                        variant="subtle"
                        color="white"
                        aria-label="Keranjang Belanja"
                        className={styles.iconButton}
                        size="lg"
                      >
                        <IconShoppingCart size={20}/>
                      </ActionIcon>
                    </Indicator>
                  </>
                )}
              </Group>
            </Group>
          ) : (
            <Group gap="sm">
              <MobileCartButton 
                items={items}
                onClick={() => navigate('/checkout')}
              />
              
              <Burger
                opened={opened}
                onClick={toggle}
                color="white"
                aria-label={opened ? "Close navigation menu" : "Open navigation menu"}
                size="sm"
              />
            </Group>
          )}
        </Group>
      </AppShell.Header>

      <MobileDrawer
        opened={opened}
        onClose={close}
        customer={customer}
        onLogout={handleLogout}
        whatsappContacts={whatsappContacts}
        emailContact={emailContact}
        loadingSocials={loadingSocials}
        createWhatsAppLink={createWhatsAppLink}
      />

      <AppShell.Main style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Outlet />
      </AppShell.Main>

      <Footer />

      <WhatsAppFloatingButton 
        socials={socials} 
        createWhatsAppLink={createWhatsAppLink} 
      />
    </AppShell>
  );
}