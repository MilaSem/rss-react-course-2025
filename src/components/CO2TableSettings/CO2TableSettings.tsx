import { useRef, useEffect } from 'react';
import styles from './CO2TableSettings.module.css';

interface CO2TableSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFields: string[];
  onChange: (field: string, checked: boolean) => void;
}

const availableFields = [
  { key: 'methane', label: 'Methane' },
  { key: 'oil_co2', label: 'Oil CO2' },
  { key: 'temperature_change_from_co2', label: 'Temp Change from CO2' },
];

export const CO2TableSettings = ({
  isOpen,
  onClose,
  selectedFields,
  onChange,
}: CO2TableSettingsProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <h3>Choose additional columns</h3>
        {availableFields.map(({ key, label }) => (
          <div key={key}>
            <label>
              <input
                className={styles.checkbox}
                type="checkbox"
                checked={selectedFields.includes(key)}
                onChange={(e) => onChange(key, e.target.checked)}
              />
              {label}
            </label>
          </div>
        ))}
        <button className={styles.close} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
