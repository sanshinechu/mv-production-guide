/**
 * useWorkflow Hook
 * 管理工作流程相關的邏輯和導航
 */

import { useCallback, useMemo } from 'react';
import { WORKFLOW_STEPS, getPhaseInfo, getStepById, getStepsByPhase } from '../data/workflow';

export const useWorkflow = () => {
  // 獲取所有步驟
  const allSteps = useMemo(() => WORKFLOW_STEPS, []);

  // 獲取所有階段
  const phases = useMemo(() => {
    const phaseMap = {};
    allSteps.forEach((step) => {
      if (!phaseMap[step.phase]) {
        phaseMap[step.phase] = {
          phase: step.phase,
          name: step.phaseName,
          steps: [],
        };
      }
      phaseMap[step.phase].steps.push(step);
    });
    return Object.values(phaseMap).sort((a, b) => a.phase - b.phase);
  }, [allSteps]);

  // 根據 stepId 獲取步驟信息
  const getStep = useCallback((stepId) => {
    return getStepById(stepId);
  }, []);

  // 獲取階段信息
  const getPhase = useCallback((phaseNumber) => {
    return getPhaseInfo(phaseNumber);
  }, []);

  // 獲取某個階段的所有步驟
  const getPhaseSteps = useCallback((phaseNumber) => {
    return getStepsByPhase(phaseNumber);
  }, []);

  // 獲取前一個步驟
  const getPreviousStep = useCallback((currentStepId) => {
    const currentIndex = allSteps.findIndex((s) => s.id === currentStepId);
    if (currentIndex > 0) {
      return allSteps[currentIndex - 1];
    }
    return null;
  }, [allSteps]);

  // 獲取後一個步驟
  const getNextStep = useCallback((currentStepId) => {
    const currentIndex = allSteps.findIndex((s) => s.id === currentStepId);
    if (currentIndex < allSteps.length - 1) {
      return allSteps[currentIndex + 1];
    }
    return null;
  }, [allSteps]);

  // 計算步驟進度
  const getProgress = useCallback((currentStepId) => {
    const currentIndex = allSteps.findIndex((s) => s.id === currentStepId);
    const percentage = ((currentIndex + 1) / allSteps.length) * 100;
    return {
      current: currentIndex + 1,
      total: allSteps.length,
      percentage: Math.round(percentage),
    };
  }, [allSteps]);

  // 計算總時間和成本
  const getTotalStats = useCallback(() => {
    const totalDuration = allSteps.reduce((sum, step) => {
      const avg = (step.duration.min + step.duration.max) / 2;
      return sum + avg;
    }, 0);

    const minTime = allSteps.reduce((sum, step) => sum + step.duration.min, 0);
    const maxTime = allSteps.reduce((sum, step) => sum + step.duration.max, 0);

    const minCost = allSteps.reduce((sum, step) => sum + (step.cost.min || 0), 0);
    const maxCost = allSteps.reduce((sum, step) => sum + (step.cost.max || 0), 0);

    return {
      time: {
        min: minTime,
        max: maxTime,
        average: Math.round(totalDuration),
      },
      cost: {
        min: minCost,
        max: maxCost,
        average: (minCost + maxCost) / 2,
      },
    };
  }, [allSteps]);

  // 搜索步驟
  const searchSteps = useCallback((query) => {
    if (!query) return allSteps;

    const lowerQuery = query.toLowerCase();
    return allSteps.filter(
      (step) =>
        step.title.toLowerCase().includes(lowerQuery) ||
        step.shortDesc.toLowerCase().includes(lowerQuery) ||
        step.id.toLowerCase().includes(lowerQuery)
    );
  }, [allSteps]);

  return {
    allSteps,
    phases,
    getStep,
    getPhase,
    getPhaseSteps,
    getPreviousStep,
    getNextStep,
    getProgress,
    getTotalStats,
    searchSteps,
  };
};
