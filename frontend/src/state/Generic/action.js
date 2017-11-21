import message from '../../components/shared/Message';

export default function setMessage(text, type) {
  message({ text, type });
  return { type };
}
