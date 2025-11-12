import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Step1Organization from './Step1Organization';
import Step2Admin from './Step2Admin';
import Step3Subscription from './Step3Subscription';
import Step4Review from './Step4Review';
import { useAuth } from '../../contexts/AuthContext';

const Registration: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate('/dashboard');
    return null;
  }

  const next = (data: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    setStep(step + 1);
  };
  const prev = () => setStep(step - 1);

  const handleRegisterSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div>
      {step === 1 && <Step1Organization next={next} defaultValues={formData} />}
      {step === 2 && <Step2Admin next={next} prev={prev} defaultValues={formData} />}
      {step === 3 && <Step3Subscription next={next} prev={prev} defaultValues={formData} />}
      {step === 4 && <Step4Review data={formData} prev={prev} />}
    </div>
  );
};

export default Registration; 