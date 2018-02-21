import message from '../../components/shared/message';

export default function setMessage(text, type, aditionalInfo) {
  message({ text, type, aditionalInfo });
  return { type };
}
