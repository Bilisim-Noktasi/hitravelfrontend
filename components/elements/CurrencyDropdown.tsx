import Dropdown from 'react-bootstrap/Dropdown';
import { useAppDispatch, useAppSelector } from '../../hooks/useCurrency';
import { setCurrency, Currency } from '../../redux/currencySlice';
import Link from 'next/link';
import { useState } from 'react';

export default function CurrencyDropdown() {
  const dispatch = useAppDispatch();
  const currency = useAppSelector((state) => state.currency.currency); // Seçilen kur bilgisini alıyoruz
  const [isOpen, setIsOpen] = useState(false);

  // Seçilen kur değiştiğinde dispatch ile yeni değeri store'a gönderiyoruz
  const handleSelect = (selectedCurrency: Currency) => {
    dispatch(setCurrency(selectedCurrency));
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);  // Dropdown menüsünün açılma/kapama durumunu kontrol et
  };

  return (
    <Dropdown className="d-none d-xxl-inline-block box-dropdown-cart align-middle mr-15"
    style={{ width: '50px' }}
    show={isOpen} // Menu'nün açılma durumunu kontrol et
    onToggle={toggleDropdown} // Toggle işlemini yönet
    >
      <Dropdown.Toggle as="span" className="text-14-medium icon-list icon-cart">
        <span className="text-14-medium arrow-down">{currency}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-cart" style={{ visibility: 'visible' }}>
        <ul>
          <li>
            <Link
              href='#'
              onClick={() => handleSelect(Currency.USD)} // USD seçildiğinde
              className="text-sm-medium"
            >
              USD
            </Link>
          </li>
          <li>
            <Link
              href='#'
              onClick={() => handleSelect(Currency.TL)} // TL seçildiğinde
              className="text-sm-medium"
            >
              TL
            </Link>
          </li>
          <li>
            <Link
              href='#'
              onClick={() => handleSelect(Currency.EUR)} // EUR seçildiğinde
              className="text-sm-medium"
            >
              EUR
            </Link>
          </li>
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
}
