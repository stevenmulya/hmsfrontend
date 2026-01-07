import { 
  Container, 
  Title, 
  Accordion, 
  Paper, 
  Text, 
  Box, 
  TextInput, 
  Stack, 
  Center, 
  Loader,
  Divider
} from '@mantine/core';
import { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

export default function FaqPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchFaqs = async (searchTerm = '') => {
    setLoading(true);
    try {
      const response = await apiClient.get('/faqs', {
        params: { search: searchTerm }
      });
      setFaqs(response.data.data || []);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchFaqs(search);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <Box bg="#fcfcfc" style={{ minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Header Section with Geometric Ornaments */}
      <Box 
        style={{ 
          height: '320px', 
          background: 'linear-gradient(135deg, #023E8A 0%, #0077B6 100%)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Ornament 1 */}
        <Box 
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            border: '40px solid rgba(255, 255, 255, 0.04)',
            borderRadius: '50%',
            top: '-100px',
            right: '-50px',
          }}
        />
        {/* Ornament 2 */}
        <Box 
          style={{
            position: 'absolute',
            width: '150px',
            height: '150px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '20px',
            bottom: '20px',
            left: '5%',
            transform: 'rotate(25deg)'
          }}
        />

        <Stack gap={5} style={{ zIndex: 2 }} align="center">
          <Title order={1} c="white" fw={800} size="clamp(2.5rem, 5vw, 3.5rem)" style={{ letterSpacing: '-1.5px' }} ta="center">
            FAQ
          </Title>
          <Text c="white" size="lg" ta="center" style={{ opacity: 0.8, fontWeight: 300, letterSpacing: '1px' }}>
            PUSAT BANTUAN PELANGGAN
          </Text>
        </Stack>
      </Box>

      <Container size="sm" style={{ marginTop: '-45px', position: 'relative', zIndex: 3 }}>
        <Stack gap="xl">
          {/* Search Input Card */}
          <Paper withBorder p="md" radius="lg" shadow="md">
            <TextInput
              placeholder="Ketik pertanyaan atau kata kunci..."
              size="lg"
              variant="unstyled"
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              styles={{
                input: { 
                  paddingLeft: '10px', 
                  paddingRight: '10px',
                  fontSize: '16px'
                }
              }}
            />
          </Paper>

          {loading ? (
            <Center py={80}>
              <Loader color="blue" variant="dots" size="xl" />
            </Center>
          ) : (
            <Box>
              {faqs.length > 0 ? (
                <Stack gap="sm">
                  <Accordion variant="separated" chevronPosition="right">
                    {faqs.map((faq) => (
                      <Accordion.Item 
                        key={faq.id} 
                        value={String(faq.id)} 
                        style={{ 
                          backgroundColor: 'white',
                          border: '1px solid #eef2f6',
                          borderRadius: '12px',
                          overflow: 'hidden'
                        }}
                      >
                        <Accordion.Control 
                          style={{ 
                            padding: '22px', 
                            fontWeight: 700,
                            fontSize: '16px',
                            color: '#1A1B1E'
                          }}
                        >
                          {faq.question}
                        </Accordion.Control>
                        <Accordion.Panel style={{ padding: '0 22px 22px 22px' }}>
                          <Divider mb="lg" color="#f8f9fa" />
                          <Text size="sm" c="gray.7" lh={1.8}>
                            {faq.answer}
                          </Text>
                        </Accordion.Panel>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Stack>
              ) : (
                <Paper withBorder p={80} radius="lg" ta="center" bg="white">
                  <Text fw={700} size="lg" c="gray.4">Hasil tidak ditemukan</Text>
                  <Text size="sm" c="dimmed">
                    Tidak ada jawaban untuk kata kunci "{search}"
                  </Text>
                </Paper>
              )}
            </Box>
          )}

          {/* Contact Support Footer */}
          <Paper 
            p="xl" 
            radius="lg" 
            style={{ 
              background: '#f1f3f5', 
              border: '1px dashed #ced4da',
              textAlign: 'center' 
            }}
          >
            <Text fw={700} size="md" mb={5}>Belum menemukan jawaban?</Text>
            <Text size="xs" c="dimmed" mb="md">
              Tim layanan pelanggan kami siap membantu Anda secara langsung via WhatsApp.
            </Text>
            <Box 
              component="a" 
              href="/socials" 
              style={{ 
                display: 'inline-block',
                color: '#0077B6', 
                fontWeight: 700, 
                fontSize: '14px',
                textDecoration: 'none',
                borderBottom: '2px solid #0077B6'
              }}
            >
              Hubungi Admin Sekarang
            </Box>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}