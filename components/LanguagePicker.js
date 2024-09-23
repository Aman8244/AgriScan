import i18n from '@/i18n';

const  LanguagePicker = ()=> {
  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select onChange={handleChange} defaultValue={i18n.language}>
      <option value="en">English</option>
      <option value="hi">Hindi</option>
      {/* Add more languages as needed */}
    </select>
  );
}
export default LanguagePicker;

