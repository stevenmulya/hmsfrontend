"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Container, Grid, Stack, Image, Text, Group, Button, Anchor, Skeleton, Box, Menu, UnstyledButton } from '@mantine/core';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandYoutube,
  IconPhoneCall,
  IconMail,
  IconBuilding,
  IconChevronDown,
  IconWorldWww
} from '@tabler/icons-react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import apiClient from '../api/apiClient';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [socials, setSocials] = useState([]);
  const [loadingSocials, setLoadingSocials] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoadingSocials(true);
    setError(null);
    apiClient.get('/socials')
      .then(response => {
        setSocials(response.data.data || []);
      })
      .catch(error => {
        console.error("Error fetching socials:", error);
        setError('Failed to load social links');
        setSocials([]);
      })
      .finally(() => {
        setLoadingSocials(false);
      });
  }, []);

  const { socialMediaPlatforms, whatsappContacts, emailContact } = useMemo(() => {
    const socialMediaPlatforms = socials.filter(s =>
      s.platform &&
      s.platform.toLowerCase() !== 'whatsapp' &&
      s.platform.toLowerCase() !== 'email'
    );

    const whatsappContacts = socials.filter(s => 
      s.platform?.toLowerCase() === 'whatsapp'
    );
    
    const emailContact = socials.find(s => 
      s.platform?.toLowerCase() === 'email'
    );

    return { socialMediaPlatforms, whatsappContacts, emailContact };
  }, [socials]);

  const platformIcons = {
    facebook: IconBrandFacebook,
    instagram: IconBrandInstagram,
    linkedin: IconBrandLinkedin,
    youtube: IconBrandYoutube,
  };

  const createWhatsAppLink = useCallback((urlOrNumber) => {
    if (!urlOrNumber) return '#';
    
    const cleanedInput = String(urlOrNumber).trim();
    
    if (cleanedInput.includes('wa.me/')) {
      return cleanedInput.startsWith('http') ? cleanedInput : `https://${cleanedInput}`;
    }
    
    const number = cleanedInput.replace(/\D/g, '');
    if (!number) return '#';
    
    const formattedNumber = number.startsWith('0') ? '62' + number.substring(1) : 
                           number.startsWith('62') ? number : 
                           number.startsWith('+62') ? number.substring(1) : number;
    
    return `https://wa.me/${formattedNumber}`;
  }, []);

  const ContactItem = ({ icon: Icon, href, children, isExternal = true }) => (
    <Group gap="xs" wrap="nowrap" align="center">
      <Icon size={16} className={styles.contactIcon} />
      <Anchor 
        href={href} 
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={styles.contactLink}
      >
        {children}
      </Anchor>
    </Group>
  );

  return (
    <footer className={`${styles.footer} ${styles.footerBackground}`}>
      <Container size="lg" className={styles.footerContent}>
        <Grid gutter={{ base: 'lg', md: 'xl' }}>
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }} className={styles.footerColumn}>
            <Stack align="flex-start" gap="sm">
              <Image
                src="/hmslogo.png"
                h={90}
                w="auto"
                fit="contain"
                alt="Logo HMS"
                className={styles.footerLogo}
              />
              <Text fw={700} size="md" className={styles.companyName}>
                PT Hutama Maju Sukses
              </Text>
              
              {error && (
                <Text className={styles.errorText}>
                  {error}
                </Text>
              )}

              {loadingSocials ? (
                <Skeleton height={24} width={150} mt="xs" />
              ) : (
                socialMediaPlatforms.length > 0 && (
                  <Menu shadow="md" width={200} position="bottom-start">
                    <Menu.Target>
                      <UnstyledButton 
                        className={styles.socialDropdownButton}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            e.currentTarget.click();
                          }
                        }}
                      >
                        <Group gap="xs">
                          <Text component="span">Social Media</Text>
                          <IconChevronDown size={14} />
                        </Group>
                      </UnstyledButton>
                    </Menu.Target>
                    <Menu.Dropdown>
                      {socialMediaPlatforms.map((social) => {
                        const IconComponent = platformIcons[social.platform.toLowerCase()] || IconWorldWww;
                        return (
                          <Menu.Item
                            key={social.id}
                            component="a"
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            leftSection={<IconComponent size={14} />}
                            className={styles.dropdownItem}
                          >
                            {social.name}
                          </Menu.Item>
                        );
                      })}
                    </Menu.Dropdown>
                  </Menu>
                )
              )}
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 4 }} className={styles.footerColumn}>
            <Stack align="flex-start" gap="md">
              <Box>
                <Text fw={600} className={styles.footerTitle} mb="xs">Head Office & Branch Off</Text>
                <Group gap="xs" wrap="nowrap" align="flex-start" className={styles.addressGroup}>
                  <IconBuilding size={16} className={`${styles.contactIcon} ${styles.addressIcon}`} />
                  <Text className={styles.addressValue}>
                    Green Sedayu Bizzpark DM 16/77, <br className={styles.mobileAddressBreak} />
                    Jl. Daan Mogot Km. 18 Jakarta Barat <br className={styles.mobileAddressBreak} />
                    DKI Jakarta 11840
                  </Text>
                </Group>
              </Box>
              
              {loadingSocials ? (
                <Stack gap="sm" w="100%">
                  <Skeleton height={14} width="80%" radius="sm" />
                  <Skeleton height={14} width="60%" radius="sm" />
                  <Skeleton height={14} width="70%" radius="sm" />
                </Stack>
              ) : (
                <Stack gap="sm">
                  {whatsappContacts.map((wa) => (
                    <ContactItem 
                      key={wa.id}
                      icon={IconPhoneCall}
                      href={createWhatsAppLink(wa.url)}
                    >
                      {wa.name || wa.url}
                    </ContactItem>
                  ))}
                  {emailContact && emailContact.url && (
                    <ContactItem 
                      icon={IconMail}
                      href={`mailto:${emailContact.url}`}
                    >
                      {emailContact.name || emailContact.url}
                    </ContactItem>
                  )}
                </Stack>
              )}
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 4 }} className={styles.footerColumn}>
            <Stack align="flex-start" gap="xs">
              <Group gap={2} wrap="wrap" className={styles.infoLinksContainer}>
                <Button 
                  component={Link} 
                  to="/terms-conditions" 
                  variant="subtle" 
                  color="gray" 
                  className={styles.infoLink}
                >
                  Syarat dan Ketentuan
                </Button>
                <Text className={styles.infoSeparator}>|</Text>
                <Button 
                  component={Link} 
                  to="/how-to-buy" 
                  variant="subtle" 
                  color="gray" 
                  className={styles.infoLink}
                >
                  Tutorial Pembelian
                </Button>
                 <Text className={styles.infoSeparator}>|</Text>
                <Button 
                  component={Link} 
                  to="/faq" 
                  variant="subtle" 
                  color="gray" 
                  className={styles.infoLink}
                >
                  FAQ
                </Button>
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>

      <Box className={styles.copyrightRow}>
        <Container size="lg">
          <Group justify="center" align="center" className={styles.copyrightInner}>
            <Text className={styles.copyrightText}>
              &copy; {currentYear} PT Hutama Maju Sukses. All rights reserved.
            </Text>
          </Group>
        </Container>
      </Box>
    </footer>
  );
}