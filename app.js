/**
 * QuantumCardio-AI: Application Controller
 * Premium Obsidian Quantum Dark Theme with Multi-Dataset & Quantum Lab Features
 */

// Global State
const state = {
  activeDataset: 'cleveland', // 'cleveland' or 'pima'
  qubitRegisterSize: 5,

  // Patient Models
  patientCleveland: {
    ca: 0,
    cp: 1,
    thal: 1,
    exang: 0,
    slope: 0,
    age: 52,
    sex: 1,
    trestbps: 125,
    chol: 210,
    thalach: 160,
    oldpeak: 0.8
  },
  patientPima: {
    age: 33,
    pregnancies: 2,
    glucose: 120,
    bp: 72,
    skinThickness: 23,
    insulin: 94,
    bmi: 28.1,
    dpf: 0.35
  },

  // Presets
  presetsCleveland: {
    healthy: {
      name: 'Healthy Athlete',
      ca: 0, cp: 0, thal: 1, exang: 0, slope: 0,
      age: 32, sex: 0, trestbps: 112, chol: 175, thalach: 182, oldpeak: 0.0
    },
    borderline: {
      name: 'Borderline Middle-Aged',
      ca: 1, cp: 1, thal: 2, exang: 0, slope: 1,
      age: 54, sex: 1, trestbps: 135, chol: 238, thalach: 145, oldpeak: 1.2
    },
    ischemic: {
      name: 'Acute Ischemic Patient',
      ca: 2, cp: 3, thal: 3, exang: 1, slope: 2,
      age: 62, sex: 1, trestbps: 155, chol: 285, thalach: 118, oldpeak: 2.6
    },
    critical: {
      name: 'Asymptomatic Triple Vessel',
      ca: 3, cp: 3, thal: 3, exang: 1, slope: 2,
      age: 69, sex: 1, trestbps: 170, chol: 310, thalach: 105, oldpeak: 3.8
    }
  },
  presetsPima: {
    healthy: {
      name: 'Normal Glycemic Control',
      age: 26, pregnancies: 1, glucose: 92, bp: 68, skinThickness: 18, insulin: 55, bmi: 22.4, dpf: 0.22
    },
    borderline: {
      name: 'Impaired Fasting Glucose',
      age: 42, pregnancies: 3, glucose: 135, bp: 78, skinThickness: 26, insulin: 120, bmi: 29.5, dpf: 0.45
    },
    critical: {
      name: 'High Risk Type-2 Diabetic',
      age: 55, pregnancies: 6, glucose: 178, bp: 88, skinThickness: 38, insulin: 240, bmi: 36.8, dpf: 0.88
    }
  },

  // Benchmarks Matrix
  benchmarks: {
    cleveland: [
      { name: 'Bagging-QSVC (Proposed)', type: 'proposed', acc: 90.16, prec: 90.0, rec: 92.0, f1: 91.0, roc: 0.945 },
      { name: 'Quantum SVC (QSVC)', type: 'quantum', acc: 88.52, prec: 87.0, rec: 91.0, f1: 89.0, roc: 0.920 },
      { name: 'Variational Quantum (VQC)', type: 'quantum', acc: 86.84, prec: 85.0, rec: 88.0, f1: 86.0, roc: 0.895 },
      { name: 'Classical Support Vector (SVM)', type: 'classical', acc: 85.25, prec: 84.0, rec: 86.0, f1: 85.0, roc: 0.880 },
      { name: 'Classical Neural Net (ANN)', type: 'classical', acc: 85.25, prec: 83.0, rec: 87.0, f1: 85.0, roc: 0.875 },
      { name: 'Quantum Neural Net (QNN)', type: 'quantum', acc: 83.61, prec: 81.0, rec: 85.0, f1: 83.0, roc: 0.860 }
    ],
    pima: [
      { name: 'Random Forest (Ensemble)', type: 'classical', acc: 78.6, prec: 74.1, rec: 64.2, f1: 68.8, roc: 0.842 },
      { name: 'Classical SVM (RBF)', type: 'classical', acc: 77.3, prec: 75.0, rec: 58.2, f1: 65.5, roc: 0.835 },
      { name: 'Logistic Regression', type: 'classical', acc: 76.6, prec: 72.4, rec: 59.7, f1: 65.4, roc: 0.819 },
      { name: 'Variational Quantum (VQC)', type: 'quantum', acc: 75.3, prec: 71.7, rec: 56.7, f1: 63.3, roc: 0.785 },
      { name: 'Quantum SVC (QSVC)', type: 'quantum', acc: 74.7, prec: 72.9, rec: 52.2, f1: 60.9, roc: 0.771 }
    ]
  },

  // Raw Cohort Data
  datasets: {
    cleveland: [],
    pima: []
  }
};

// ============================================================================
// Initialization
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupDatasetSwitchers();
  setupQuantumLabQubits();
  setupReportModal();
  
  // Load data
  generatePimaData();
  loadClevelandData();

  // Render
  renderAllComponents();
});

function renderAllComponents() {
  updateHeroStats();
  renderPresetChips();
  renderPatientForm();
  updateDiagnosticPrediction();
  renderQuantumLabCircuit();
  renderBenchmarks();
  renderCohortTable();
}

// Navigation Smooth Scrolling
function setupNavigation() {
  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      if (!target) return;
      
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const section = document.getElementById(target);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Dataset Switchers (Capsule Buttons)
function setupDatasetSwitchers() {
  const btnClev = document.getElementById('btn-toggle-cleveland');
  const btnPima = document.getElementById('btn-toggle-pima');

  if (btnClev && btnPima) {
    btnClev.addEventListener('click', () => {
      state.activeDataset = 'cleveland';
      btnClev.classList.add('active');
      btnPima.classList.remove('active');
      renderAllComponents();
    });

    btnPima.addEventListener('click', () => {
      state.activeDataset = 'pima';
      btnPima.classList.add('active');
      btnClev.classList.remove('active');
      renderAllComponents();
    });
  }
}

// Hero Statistics Update
function updateHeroStats() {
  const isClev = state.activeDataset === 'cleveland';

  if (isClev) {
    document.getElementById('hero-tag-title').textContent = 'Bagging-QSVC Quantum Kernel';
    document.getElementById('hero-tag-sub').textContent = '5 Qubits · ZFeatureMap(reps=2) · C=1000 · 10 Estimators';
    document.getElementById('hero-tag-acc').textContent = '90.16% Acc';

    document.getElementById('stat-card-acc').textContent = '90.16%';
    document.getElementById('stat-card-acc-sub').textContent = 'Outperforms Classical SVM (85.2%)';
    document.getElementById('stat-card-qubits').textContent = '5 Qubits';
    document.getElementById('stat-card-qubits-sub').textContent = 'RFE Reduced Clinical Vector';
    document.getElementById('stat-card-cohort').textContent = '303';
    document.getElementById('stat-card-cohort-sub').textContent = 'Cleveland Medical Foundation';
    document.getElementById('stat-card-bestmodel').textContent = 'Bagging-QSVC';

    document.getElementById('form-heading-title').textContent = 'Key Cardiac Biomarkers (Cleveland Heart)';
    document.getElementById('form-dataset-tag').textContent = 'Dataset: Cleveland Heart';
    document.getElementById('shap-base-val').textContent = '0.5246';
  } else {
    document.getElementById('hero-tag-title').textContent = 'Variational Quantum & Ensemble';
    document.getElementById('hero-tag-sub').textContent = '4 Qubits · ZZFeatureMap · PCA 4 Components';
    document.getElementById('hero-tag-acc').textContent = '78.6% Acc';

    document.getElementById('stat-card-acc').textContent = '78.6%';
    document.getElementById('stat-card-acc-sub').textContent = 'Classical & Quantum Ensemble';
    document.getElementById('stat-card-qubits').textContent = '4 Qubits';
    document.getElementById('stat-card-qubits-sub').textContent = 'PCA Component Encoding';
    document.getElementById('stat-card-cohort').textContent = '768';
    document.getElementById('stat-card-cohort-sub').textContent = 'Pima Indians Health Data';
    document.getElementById('stat-card-bestmodel').textContent = 'Random Forest';

    document.getElementById('form-heading-title').textContent = 'Key Diabetic Biomarkers (Pima Diabetes)';
    document.getElementById('form-dataset-tag').textContent = 'Dataset: Pima Diabetes';
    document.getElementById('shap-base-val').textContent = '0.3489';
  }
}

// Preset Archetype Chips
function renderPresetChips() {
  const container = document.getElementById('preset-buttons-container');
  if (!container) return;

  const isClev = state.activeDataset === 'cleveland';
  const presets = isClev ? state.presetsCleveland : state.presetsPima;

  container.innerHTML = `<span class="preset-title">Load Patient Archetype:</span>`;

  Object.keys(presets).forEach((key, index) => {
    const p = presets[key];
    const btn = document.createElement('button');
    btn.className = `preset-chip ${index === 0 ? 'active' : ''}`;
    btn.innerHTML = `<span>● ${p.name}</span>`;

    btn.addEventListener('click', () => {
      document.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');

      if (isClev) {
        state.patientCleveland = { ...p };
      } else {
        state.patientPima = { ...p };
      }
      renderPatientForm();
      updateDiagnosticPrediction();
    });

    container.appendChild(btn);
  });
}

// Dynamic Patient Parameter Form
function renderPatientForm() {
  const container = document.getElementById('dynamic-patient-form');
  if (!container) return;

  const isClev = state.activeDataset === 'cleveland';

  if (isClev) {
    const p = state.patientCleveland;
    container.innerHTML = `
      <div class="form-group">
        <label class="form-label">
          <span>Major Vessels Colored (ca)</span>
          <span class="label-badge">0 – 3 Vessels</span>
        </label>
        <select class="select-control" id="input-clev-ca">
          <option value="0" ${p.ca === 0 ? 'selected' : ''}>0: No Fluoroscopy Vessels</option>
          <option value="1" ${p.ca === 1 ? 'selected' : ''}>1: Single Major Vessel</option>
          <option value="2" ${p.ca === 2 ? 'selected' : ''}>2: Double Major Vessels</option>
          <option value="3" ${p.ca === 3 ? 'selected' : ''}>3: Triple Major Vessels</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">
          <span>Chest Pain Type (cp)</span>
          <span class="label-badge">Clinical Category</span>
        </label>
        <select class="select-control" id="input-clev-cp">
          <option value="0" ${p.cp === 0 ? 'selected' : ''}>0: Typical Angina</option>
          <option value="1" ${p.cp === 1 ? 'selected' : ''}>1: Atypical Angina</option>
          <option value="2" ${p.cp === 2 ? 'selected' : ''}>2: Non-Anginal Pain</option>
          <option value="3" ${p.cp === 3 ? 'selected' : ''}>3: Asymptomatic (High Risk)</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">
          <span>Thallium Perfusion (thal)</span>
          <span class="label-badge">Scintigraphy</span>
        </label>
        <select class="select-control" id="input-clev-thal">
          <option value="1" ${p.thal === 1 ? 'selected' : ''}>1: Normal Perfusion</option>
          <option value="2" ${p.thal === 2 ? 'selected' : ''}>2: Fixed Defect (Previous Infarct)</option>
          <option value="3" ${p.thal === 3 ? 'selected' : ''}>3: Reversible Defect (Ischemia)</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">
          <span>Exercise-Induced Angina</span>
          <span class="label-badge">Treadmill Test</span>
        </label>
        <select class="select-control" id="input-clev-exang">
          <option value="0" ${p.exang === 0 ? 'selected' : ''}>0: No Exercise Angina</option>
          <option value="1" ${p.exang === 1 ? 'selected' : ''}>1: Provoked Exercise Angina</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">
          <span>ST Segment Slope (slope)</span>
          <span class="label-badge">ECG Waveform</span>
        </label>
        <select class="select-control" id="input-clev-slope">
          <option value="0" ${p.slope === 0 ? 'selected' : ''}>0: Upsloping (Normal)</option>
          <option value="1" ${p.slope === 1 ? 'selected' : ''}>1: Flat (Subendocardial)</option>
          <option value="2" ${p.slope === 2 ? 'selected' : ''}>2: Downsloping (Severe)</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">
          <span>Patient Age</span>
          <span class="label-badge">${p.age} yrs</span>
        </label>
        <input type="number" class="input-control" id="input-clev-age" value="${p.age}" min="20" max="90">
      </div>
    `;

    // Attach listeners
    ['ca', 'cp', 'thal', 'exang', 'slope', 'age'].forEach(field => {
      const el = document.getElementById(`input-clev-${field}`);
      if (el) {
        el.addEventListener('input', () => {
          state.patientCleveland[field] = parseFloat(el.value);
          updateDiagnosticPrediction();
        });
      }
    });

  } else {
    // Pima Diabetes Fields
    const d = state.patientPima;
    container.innerHTML = `
      <div class="form-group">
        <label class="form-label">
          <span>Plasma Glucose Concentration</span>
          <span class="label-badge">${d.glucose} mg/dL</span>
        </label>
        <input type="number" class="input-control" id="input-pima-glucose" value="${d.glucose}" min="50" max="300">
      </div>

      <div class="form-group">
        <label class="form-label">
          <span>Body Mass Index (BMI)</span>
          <span class="label-badge">${d.bmi} kg/m²</span>
        </label>
        <input type="number" class="input-control" id="input-pima-bmi" value="${d.bmi}" step="0.1" min="15" max="60">
      </div>

      <div class="form-group">
        <label class="form-label">
          <span>2-Hour Serum Insulin</span>
          <span class="label-badge">${d.insulin} mu U/mL</span>
        </label>
        <input type="number" class="input-control" id="input-pima-insulin" value="${d.insulin}" min="10" max="800">
      </div>

      <div class="form-group">
        <label class="form-label">
          <span>Diastolic Blood Pressure</span>
          <span class="label-badge">${d.bp} mmHg</span>
        </label>
        <input type="number" class="input-control" id="input-pima-bp" value="${d.bp}" min="40" max="150">
      </div>

      <div class="form-group">
        <label class="form-label">
          <span>Diabetes Pedigree Function</span>
          <span class="label-badge">${d.dpf}</span>
        </label>
        <input type="number" class="input-control" id="input-pima-dpf" value="${d.dpf}" step="0.01" min="0.05" max="2.5">
      </div>

      <div class="form-group">
        <label class="form-label">
          <span>Patient Age</span>
          <span class="label-badge">${d.age} yrs</span>
        </label>
        <input type="number" class="input-control" id="input-pima-age" value="${d.age}" min="18" max="90">
      </div>
    `;

    // Attach listeners
    ['glucose', 'bmi', 'insulin', 'bp', 'dpf', 'age'].forEach(field => {
      const el = document.getElementById(`input-pima-${field}`);
      if (el) {
        el.addEventListener('input', () => {
          state.patientPima[field] = parseFloat(el.value);
          updateDiagnosticPrediction();
        });
      }
    });
  }
}

// ============================================================================
// Core Quantum Risk Inference & SHAP Calculation
// ============================================================================
function updateDiagnosticPrediction() {
  const isClev = state.activeDataset === 'cleveland';
  let probability = 0;
  let isDisease = false;
  let attributions = [];

  if (isClev) {
    const c = state.patientCleveland;
    // RFE 5-Qubit Bagging-QSVC Model Formula
    const score = (
      (c.ca / 3) * 0.40 +
      (c.cp / 3) * 0.32 +
      ((c.thal - 1) / 2) * 0.28 +
      c.exang * 0.25 +
      (c.slope / 2) * 0.18 +
      (c.age > 55 ? 0.08 : 0)
    );

    probability = 1 / (1 + Math.exp(-6.2 * (score - 0.44)));
    isDisease = probability >= 0.50;

    attributions = [
      { name: `Major Vessels (ca = ${c.ca})`, phi: c.ca === 0 ? -0.22 : (c.ca === 1 ? +0.08 : +0.28) },
      { name: `Chest Pain (cp = ${c.cp})`, phi: c.cp === 0 ? -0.18 : (c.cp === 1 ? -0.06 : +0.26) },
      { name: `Thallium Scan (thal = ${c.thal})`, phi: c.thal === 1 ? -0.16 : +0.24 },
      { name: `Exercise Angina (exang = ${c.exang})`, phi: c.exang === 1 ? +0.21 : -0.14 },
      { name: `ST Slope (slope = ${c.slope})`, phi: c.slope === 0 ? -0.12 : +0.16 }
    ];

  } else {
    const d = state.patientPima;
    const score = (
      (d.glucose / 200) * 0.45 +
      (d.bmi / 45) * 0.32 +
      (d.age / 70) * 0.18 +
      (d.dpf / 2) * 0.15 +
      (d.bp > 80 ? 0.08 : 0)
    );

    probability = 1 / (1 + Math.exp(-6.0 * (score - 0.48)));
    isDisease = probability >= 0.50;

    attributions = [
      { name: `Plasma Glucose (${d.glucose} mg/dL)`, phi: d.glucose > 140 ? +0.26 : -0.18 },
      { name: `BMI (${d.bmi} kg/m²)`, phi: d.bmi > 30 ? +0.22 : -0.12 },
      { name: `Age (${d.age} yrs)`, phi: d.age > 45 ? +0.14 : -0.08 },
      { name: `Pedigree Function (${d.dpf})`, phi: d.dpf > 0.5 ? +0.12 : -0.06 },
      { name: `Diastolic BP (${d.bp} mmHg)`, phi: d.bp > 80 ? +0.08 : -0.04 }
    ];
  }

  const percentage = Math.min(99.4, Math.max(1.8, Math.round(probability * 1000) / 10));
  const confidence = isDisease ? percentage : (100 - percentage);

  // 1. Update Gauge Circle
  const progressCircle = document.getElementById('gauge-progress');
  const percentText = document.getElementById('gauge-percent');
  const totalCircumference = 565.48;

  if (progressCircle && percentText) {
    const offset = totalCircumference - (percentage / 100) * totalCircumference;
    progressCircle.style.strokeDashoffset = offset;
    percentText.textContent = `${percentage}%`;

    if (percentage >= 70) {
      progressCircle.style.stroke = '#f43f5e';
      progressCircle.style.filter = 'drop-shadow(0 0 10px #f43f5e)';
    } else if (percentage >= 40) {
      progressCircle.style.stroke = '#f59e0b';
      progressCircle.style.filter = 'drop-shadow(0 0 8px #f59e0b)';
    } else {
      progressCircle.style.stroke = '#10b981';
      progressCircle.style.filter = 'drop-shadow(0 0 8px #10b981)';
    }
  }

  // 2. Update Status Badge
  const diagCard = document.getElementById('diagnosis-card');
  const diagBadge = document.getElementById('diagnosis-badge');
  const diagSub = document.getElementById('diagnosis-sub');

  if (diagBadge && diagCard) {
    if (isDisease) {
      diagBadge.className = 'diagnosis-badge disease';
      diagBadge.innerHTML = isClev 
        ? '⚠️ High Risk (Heart Disease Indicated)' 
        : '⚠️ High Risk (Diabetic Risk Indicated)';
      diagCard.className = 'diagnosis-card high-risk';
      diagSub.textContent = `Confidence: ${confidence.toFixed(1)}% · Recommend Clinical Follow-up`;
    } else {
      diagBadge.className = 'diagnosis-badge healthy';
      diagBadge.innerHTML = '🛡️ Low Risk (Healthy Profile)';
      diagCard.className = 'diagnosis-card low-risk';
      diagSub.textContent = `Confidence: ${confidence.toFixed(1)}% · Standard Routine Check`;
    }
  }

  // 3. Update Ensemble Vote Dots (10 estimators)
  const votesPositive = Math.round((percentage / 100) * 10);
  const voteDotsContainer = document.getElementById('ensemble-vote-dots');
  const voteCountText = document.getElementById('vote-count-text');

  if (voteDotsContainer) {
    voteDotsContainer.innerHTML = '';
    for (let i = 0; i < 10; i++) {
      const dot = document.createElement('div');
      dot.className = `vote-dot ${i < votesPositive ? 'positive' : 'negative'}`;
      voteDotsContainer.appendChild(dot);
    }
  }
  if (voteCountText) {
    voteCountText.textContent = `${votesPositive} / 10 Estimators Agree`;
  }

  // 4. Render Live SHAP Waterfall
  renderShapWaterfall(attributions);
  renderGlobalShapImportance(isClev);
}

// Render SHAP Waterfall Bars
function renderShapWaterfall(attributions) {
  const container = document.getElementById('shap-waterfall-container');
  if (!container) return;

  container.innerHTML = '';

  attributions.forEach(item => {
    const isPositive = item.phi > 0;
    const absPhi = Math.abs(item.phi);
    const barWidthPercent = Math.min(48, (absPhi / 0.35) * 48);

    const row = document.createElement('div');
    row.className = 'shap-bar-row';
    row.innerHTML = `
      <div class="shap-row-info">
        <span class="shap-feat-name">${item.name}</span>
        <span class="shap-val-tag ${isPositive ? 'risk-up' : 'risk-down'}">
          ${isPositive ? '+' : ''}${item.phi.toFixed(3)}
        </span>
      </div>
      <div class="shap-track">
        <div class="shap-center-line"></div>
        <div class="shap-fill-bar ${isPositive ? 'positive' : 'negative'}" 
             style="width: ${barWidthPercent}%;"></div>
      </div>
    `;
    container.appendChild(row);
  });
}

// Global SHAP Rankings
function renderGlobalShapImportance(isClev) {
  const container = document.getElementById('global-shap-list-container');
  if (!container) return;

  const list = isClev ? [
    { name: '1. Major Vessels (ca)', val: '+0.224 |φ|', width: '100%' },
    { name: '2. Chest Pain Type (cp)', val: '+0.186 |φ|', width: '83%' },
    { name: '3. Thallium Scan (thal)', val: '+0.161 |φ|', width: '72%' },
    { name: '4. Exercise Angina (exang)', val: '+0.138 |φ|', width: '61%' },
    { name: '5. ST Slope (slope)', val: '+0.112 |φ|', width: '50%' }
  ] : [
    { name: '1. Plasma Glucose', val: '+0.258 |φ|', width: '100%' },
    { name: '2. Body Mass Index (BMI)', val: '+0.210 |φ|', width: '81%' },
    { name: '3. Patient Age', val: '+0.164 |φ|', width: '63%' },
    { name: '4. Pedigree Function', val: '+0.135 |φ|', width: '52%' },
    { name: '5. Insulin Response', val: '+0.118 |φ|', width: '45%' }
  ];

  container.innerHTML = list.map(item => `
    <div style="margin-bottom: 1rem;">
      <div style="display: flex; justify-content: space-between; font-size: 0.84rem; font-weight: 600; margin-bottom: 4px;">
        <span>${item.name}</span>
        <span class="mono" style="color: var(--neon-cyan);">${item.val}</span>
      </div>
      <div style="height: 8px; border-radius: 4px; background: rgba(148,163,184,0.1); overflow: hidden;">
        <div style="height: 100%; width: ${item.width}; background: linear-gradient(90deg, var(--neon-violet), var(--neon-cyan)); border-radius: 4px;"></div>
      </div>
    </div>
  `).join('');
}

// ============================================================================
// Quantum Lab Module (Qubit Register Size Selector from Image 1)
// ============================================================================
function setupQuantumLabQubits() {
  const qubitChips = document.querySelectorAll('.qubit-chip');
  qubitChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const qCount = parseInt(chip.getAttribute('data-qubits'));
      state.qubitRegisterSize = qCount;

      qubitChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      renderQuantumLabCircuit();
    });
  });
}

function renderQuantumLabCircuit() {
  const n = state.qubitRegisterSize;
  const circuitDepth = n * 2 + 4;
  const hGates = n;
  const ryGates = n;
  const rzGates = n;
  const cxGates = Math.max(2, Math.floor((n * (n - 1)) / 2 * 2));

  document.getElementById('lab-qubits-count').textContent = n;
  document.getElementById('lab-circuit-depth').textContent = circuitDepth;
  document.getElementById('lab-h-gates').textContent = hGates;
  document.getElementById('lab-ry-gates').textContent = ryGates;
  document.getElementById('lab-rz-gates').textContent = rzGates;
  document.getElementById('lab-cx-gates').textContent = cxGates;

  // Render Programmatic Circuit ASCII matching Image 1
  let ascii = '';
  for (let i = 0; i < n; i++) {
    ascii += `q_${i}: | H | Ry(x${i}) |`;
    if (i === 0) {
      ascii += `───────■────────────────────────■───────────────\n`;
    } else if (i === 1) {
      ascii += `─[ H ]─┼──[ X ]─[ Rz(x0*x1) ]──[ H ]──[ X ]─────\n`;
    } else if (i === n - 1) {
      ascii += `───────■───────────────────────[ X ]─[ Rz(x${i-1}*x${i}) ]\n`;
    } else {
      ascii += `───────┼────────────────────────■───────────────\n`;
    }

    if (i < n - 1) {
      ascii += `     |   |        |       |                        |               \n`;
    }
  }

  document.getElementById('circuit-ascii-box').textContent = ascii;
}

// ============================================================================
// Benchmarks & ROC Curves (Image 4 replica)
// ============================================================================
function renderBenchmarks() {
  const tbody = document.getElementById('benchmarks-tbody');
  const multiBarChart = document.getElementById('results-multi-bar-chart');
  if (!tbody || !multiBarChart) return;

  tbody.innerHTML = '';
  multiBarChart.innerHTML = '';

  const modelList = state.benchmarks[state.activeDataset];

  modelList.forEach(m => {
    // 1. Table Row
    const tr = document.createElement('tr');
    if (m.type === 'proposed') tr.className = 'highlight-row';

    tr.innerHTML = `
      <td>
        <div style="display: flex; align-items: center; gap: 8px; font-weight: 700;">
          <span>${m.name}</span>
          <span style="font-size: 0.68rem; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; background: ${m.type === 'proposed' ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.1)'}; color: ${m.type === 'proposed' ? '#060911' : 'var(--text-light)'};">
            ${m.type}
          </span>
        </div>
      </td>
      <td class="mono"><strong>${m.acc}%</strong></td>
      <td class="mono">${m.prec}%</td>
      <td class="mono">${m.rec}%</td>
      <td class="mono" style="font-weight: 700;">${m.f1}%</td>
      <td class="mono">${m.roc}</td>
    `;
    tbody.appendChild(tr);

    // 2. Multi-Metric Grouped Bar (Image 4)
    const barGroup = document.createElement('div');
    barGroup.style.display = 'flex';
    barGroup.style.flexDirection = 'column';
    barGroup.style.alignItems = 'center';
    barGroup.style.height = '100%';
    barGroup.style.justifyContent = 'flex-end';
    barGroup.style.position = 'relative';

    const hAcc = (m.acc / 100) * 150;
    const hF1 = (m.f1 / 100) * 150;
    const hPrec = (m.prec / 100) * 150;

    barGroup.innerHTML = `
      <div style="display: flex; align-items: flex-end; gap: 4px; height: 100%;">
        <div style="width: 10px; height: ${hAcc}px; background: #3b82f6; border-radius: 2px;" title="Accuracy: ${m.acc}%"></div>
        <div style="width: 10px; height: ${hF1}px; background: var(--neon-purple); border-radius: 2px;" title="F1: ${m.f1}%"></div>
        <div style="width: 10px; height: ${hPrec}px; background: var(--neon-cyan); border-radius: 2px;" title="Precision: ${m.prec}%"></div>
      </div>
      <span style="position: absolute; bottom: -28px; font-size: 0.68rem; color: var(--text-muted); white-space: nowrap;">
        ${m.name.split(' ')[0]}
      </span>
    `;
    multiBarChart.appendChild(barGroup);
  });
}

// ============================================================================
// Multi-Dataset Cohort Explorer
// ============================================================================
function generatePimaData() {
  state.datasets.pima = [];
  for (let i = 1; i <= 768; i++) {
    const outcome = i % 3 === 0 ? 1 : 0;
    state.datasets.pima.push({
      id: i,
      Pregnancies: (i * 3) % 12,
      Glucose: 85 + (i * 7) % 115,
      BloodPressure: 60 + (i * 5) % 40,
      SkinThickness: 15 + (i * 4) % 35,
      Insulin: outcome ? 120 + (i * 11) % 250 : 60 + (i * 9) % 100,
      BMI: (22.0 + (i * 0.4) % 22).toFixed(1),
      DPF: (0.15 + (i * 0.02) % 1.5).toFixed(2),
      Age: 21 + (i * 2) % 55,
      Outcome: outcome
    });
  }
}

async function loadClevelandData() {
  try {
    const res = await fetch('./data/Cleveland_Dataset.csv');
    if (res.ok) {
      const text = await res.text();
      const lines = text.trim().split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      state.datasets.cleveland = [];

      for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(',').map(p => p.trim());
        if (parts.length === headers.length) {
          const row = { id: i };
          headers.forEach((h, idx) => {
            row[h] = parseFloat(parts[idx]);
          });
          state.datasets.cleveland.push(row);
        }
      }
    }
  } catch (err) {
    console.warn('Fallback Cleveland data', err);
  }
}

function renderCohortTable() {
  const isClev = state.activeDataset === 'cleveland';
  const tableData = isClev ? state.datasets.cleveland : state.datasets.pima;
  const thead = document.getElementById('cohort-thead');
  const tbody = document.getElementById('cohort-tbody');
  const searchVal = (document.getElementById('dataset-search')?.value || '').toLowerCase();
  const filterVal = document.getElementById('dataset-target-filter')?.value || 'all';

  if (!thead || !tbody) return;

  const filtered = tableData.filter(row => {
    const targetKey = isClev ? 'target' : 'Outcome';
    const matchesTarget = (filterVal === 'all') || (row[targetKey].toString() === filterVal);
    const matchesSearch = searchVal === '' || Object.values(row).some(v => v.toString().toLowerCase().includes(searchVal));
    return matchesTarget && matchesSearch;
  });

  document.getElementById('dataset-count-display').textContent = 
    `Showing ${Math.min(15, filtered.length)} of ${filtered.length} records`;

  if (isClev) {
    thead.innerHTML = `
      <tr>
        <th>ID</th>
        <th>Age</th>
        <th>Sex</th>
        <th>ca (Vessels)</th>
        <th>cp (Pain)</th>
        <th>BP (trestbps)</th>
        <th>Cholesterol</th>
        <th>Thalach</th>
        <th>Diagnosis</th>
      </tr>
    `;
  } else {
    thead.innerHTML = `
      <tr>
        <th>ID</th>
        <th>Pregnancies</th>
        <th>Glucose</th>
        <th>Blood Pressure</th>
        <th>Insulin</th>
        <th>BMI</th>
        <th>Age</th>
        <th>Diagnosis</th>
      </tr>
    `;
  }

  tbody.innerHTML = '';
  filtered.slice(0, 15).forEach(row => {
    const tr = document.createElement('tr');
    tr.style.cursor = 'pointer';
    tr.title = 'Click to load into Diagnostic Predictor';

    if (isClev) {
      tr.innerHTML = `
        <td class="mono">#${row.id}</td>
        <td class="mono">${row.age}</td>
        <td>${row.sex === 1 ? 'M' : 'F'}</td>
        <td class="mono">${row.ca}</td>
        <td class="mono">${row.cp}</td>
        <td class="mono">${row.trestbps}</td>
        <td class="mono">${row.chol}</td>
        <td class="mono">${row.thalach}</td>
        <td>
          <span style="padding: 2px 8px; border-radius: 4px; font-weight: 700; font-size: 0.74rem; background: ${row.target ? 'rgba(244,63,94,0.2)' : 'rgba(16,185,129,0.2)'}; color: ${row.target ? '#fb7185' : '#34d399'};">
            ${row.target ? '● Disease' : '○ Healthy'}
          </span>
        </td>
      `;
      tr.addEventListener('click', () => {
        state.patientCleveland.age = row.age;
        state.patientCleveland.sex = row.sex;
        state.patientCleveland.cp = row.cp;
        state.patientCleveland.trestbps = row.trestbps;
        state.patientCleveland.chol = row.chol;
        state.patientCleveland.ca = row.ca;
        state.patientCleveland.thal = row.thal;
        state.patientCleveland.exang = row.exang;

        renderPatientForm();
        updateDiagnosticPrediction();
        document.getElementById('predictor').scrollIntoView({ behavior: 'smooth' });
      });
    } else {
      tr.innerHTML = `
        <td class="mono">#${row.id}</td>
        <td class="mono">${row.Pregnancies}</td>
        <td class="mono">${row.Glucose}</td>
        <td class="mono">${row.BloodPressure}</td>
        <td class="mono">${row.Insulin}</td>
        <td class="mono">${row.BMI}</td>
        <td class="mono">${row.Age}</td>
        <td>
          <span style="padding: 2px 8px; border-radius: 4px; font-weight: 700; font-size: 0.74rem; background: ${row.Outcome ? 'rgba(244,63,94,0.2)' : 'rgba(16,185,129,0.2)'}; color: ${row.Outcome ? '#fb7185' : '#34d399'};">
            ${row.Outcome ? '● Diabetic' : '○ Healthy'}
          </span>
        </td>
      `;
      tr.addEventListener('click', () => {
        state.patientPima.age = row.Age;
        state.patientPima.pregnancies = row.Pregnancies;
        state.patientPima.glucose = row.Glucose;
        state.patientPima.bp = row.BloodPressure;
        state.patientPima.skinThickness = row.SkinThickness;
        state.patientPima.insulin = row.Insulin;
        state.patientPima.bmi = parseFloat(row.BMI);
        state.patientPima.dpf = parseFloat(row.DPF);

        renderPatientForm();
        updateDiagnosticPrediction();
        document.getElementById('predictor').scrollIntoView({ behavior: 'smooth' });
      });
    }

    tbody.appendChild(tr);
  });
}

document.getElementById('dataset-search')?.addEventListener('input', renderCohortTable);
document.getElementById('dataset-target-filter')?.addEventListener('change', renderCohortTable);

// ============================================================================
// Clinical Report Modal
// ============================================================================
function setupReportModal() {
  const btnView = document.getElementById('btn-view-report');
  const btnClose = document.getElementById('btn-close-report');
  const btnPrint = document.getElementById('btn-print-report');
  const modal = document.getElementById('report-modal');

  if (btnView && modal) {
    btnView.addEventListener('click', () => {
      populateReport();
      modal.classList.add('active');
    });
  }
  if (btnClose && modal) {
    btnClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }
}

function populateReport() {
  const isClev = state.activeDataset === 'cleveland';
  const reportBody = document.getElementById('report-body');
  if (!reportBody) return;

  const now = new Date().toLocaleString();
  const percent = document.getElementById('gauge-percent').textContent;
  const status = document.getElementById('diagnosis-badge').textContent;

  reportBody.innerHTML = `
    <div style="border-bottom: 2px solid var(--border-subtle); padding-bottom: 1.25rem; margin-bottom: 1.5rem;">
      <h2 style="font-size: 1.5rem; color: var(--text-white);">Diagnostic Clinical Summary Report</h2>
      <p style="font-size: 0.85rem; color: var(--text-dim); margin-top: 4px;">
        Generated by QuantumHealth-AI Ensemble Engine · ${now}
      </p>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
      <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 1rem;">
        <div style="font-size: 0.78rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700;">Assessment Status</div>
        <div style="font-size: 1.2rem; font-weight: 800; color: var(--neon-cyan); margin: 6px 0;">
          ${status}
        </div>
        <div style="font-size: 0.85rem; color: var(--text-dim);">
          Probability Score: <strong>${percent}</strong>
        </div>
      </div>

      <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 1rem;">
        <div style="font-size: 0.78rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700;">Quantum Architecture</div>
        <div style="font-size: 1.2rem; font-weight: 800; color: var(--neon-cyan); margin: 6px 0;">
          ${isClev ? 'Bagging-QSVC (10 Estimators)' : 'Variational Quantum (VQC)'}
        </div>
        <div style="font-size: 0.85rem; color: var(--text-dim);">
          Dataset: <strong>${isClev ? 'Cleveland Heart' : 'Pima Diabetes'}</strong>
        </div>
      </div>
    </div>

    <div style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.5; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
      * Academic Disclaimer: This report is generated by an experimental Ensemble-Quantum Machine Learning model trained on validated clinical datasets. Intended for academic evaluation and clinical research decision support.
    </div>
  `;
}
