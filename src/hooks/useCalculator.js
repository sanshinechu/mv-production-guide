/**
 * useCalculator Hook
 * 封裝成本和時間計算邏輯
 */

import { useState, useCallback } from 'react';
import {
  calculateProjectCost,
  generateTimeline,
  validateProjectInputs,
  generateCompleteAnalysis,
} from '../utils/calculations';

export const useCalculator = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const calculate = useCallback((inputs) => {
    setLoading(true);
    setErrors([]);

    try {
      // 驗證輸入
      const validation = validateProjectInputs(inputs);
      if (!validation.valid) {
        setErrors(validation.errors);
        setAnalysis(null);
        return null;
      }

      // 執行完整分析
      const result = generateCompleteAnalysis(inputs);
      setAnalysis(result);
      return result;
    } catch (err) {
      setErrors([err.message]);
      setAnalysis(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setAnalysis(null);
    setErrors([]);
  }, []);

  return {
    analysis,
    loading,
    errors,
    calculate,
    reset,
  };
};
