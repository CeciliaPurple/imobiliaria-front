import React from 'react';
import styles from './Confirmation.module.css';

export default function ConfirmationDialog({ 
  message, 
  onConfirm, 
  onCancel, 
  messageConfirm,
  confirmText,
  cancelText,
  confirmColor = "#DE302A"
}) {
  // Usa confirmText se fornecido, senão usa messageConfirm, senão usa padrão
  const buttonText = confirmText || messageConfirm || 'Sim, Excluir';
  const cancelButtonText = cancelText || 'Cancelar';

  // Determina a classe de cor baseado na cor fornecida
  const getColorClass = () => {
    if (confirmColor === '#375A76') {
      return styles.blue;
    } else if (confirmColor === '#dc3545') {
      return styles.red;
    }
    return styles.default;
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <p className={styles.message}>
          {message}
        </p>
        <div className={styles.actions}>
          <button 
            onClick={onCancel}
            className={styles.cancelButton}
          >
            {cancelButtonText}
          </button>
          <button 
            onClick={onConfirm}
            className={`${styles.confirmButton} ${getColorClass()}`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}