import { FileInput, Text } from '@mantine/core';
import { IconUpload, IconFileCheck } from '@tabler/icons-react';

export default function FileUpload({ label, currentFileUrl, error, ...props }) {
  const hasCurrentFile = currentFileUrl && typeof currentFileUrl === 'string';
  const fileName = hasCurrentFile ? currentFileUrl.split('/').pop() : null;

  return (
    <div>
      <FileInput
        label={label}
        placeholder={hasCurrentFile ? "Ganti file (opsional)" : "Pilih file"}
        leftSection={hasCurrentFile ? <IconFileCheck size={16} /> : <IconUpload size={16} />}
        accept="image/jpeg,image/png,application/pdf"
        error={error}
        {...props}
      />
      {hasCurrentFile && (
        <Text size="xs" c="dimmed" mt={4}>
          File saat ini: {fileName}
        </Text>
      )}
    </div>
  );
}