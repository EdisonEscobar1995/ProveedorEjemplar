import message from '../../components/shared/message';

export default function setMessage(text, type) {
  message({ text, type });
  return { type };
}
