import { sendMessage, decryptMessage } from '../../client/src/services/chat';

describe('Chat Features', () => {
  test('Encrypts and decrypts messages correctly', async () => {
    const original = "Test message";
    const encrypted = await encryptMessage(original);
    const decrypted = await decryptMessage(encrypted);
    expect(decrypted).toBe(original);
  });

  test('Handles message editing', async () => {
    const message = await sendMessage("Original message");
    const edited = await editMessage(message.id, "Edited message");
    expect(edited.content).toBe("Edited message");
    expect(edited.edited).toBe(true);
  });
});
