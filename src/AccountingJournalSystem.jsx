import React, { useState, useEffect } from 'react';
import { Play, Database, Settings, FileOutput, ChevronRight, Code } from 'lucide-react';

const AccountingJournalSystem = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [sourceQuery, setSourceQuery] = useState({
    table: 'purchase_transaction',
    selectedColumns: ['purchase_id', 'purchase_date', 'vendor_name', 'amount', 'description'],
    conditions: ''
  });
  const [sourceData, setSourceData] = useState([]);
  const [journalConfig, setJournalConfig] = useState({
    debit: [
      { account_code: '5110', account_name: '사무용품구입비', amount_formula: 'amount * 0.9' },
      { account_code: '1410', account_name: '부가세대급금', amount_formula: 'amount * 0.1' }
    ],
    credit: [
      { account_code: '2110', account_name: '외상매입금', amount_formula: 'amount' }
    ]
  });
  const [processedJournals, setProcessedJournals] = useState([]);

  // 가상의 원천 데이터 테이블들
  const mockTables = {
    purchase_transaction: [
      { purchase_id: 'P001', purchase_date: '2024-08-24', vendor_name: '문구업체A', amount: 110000, item_type: 'office', description: '사무용품 구매' },
      { purchase_id: 'P002', purchase_date: '2024-08-24', vendor_name: '장비업체B', amount: 220000, item_type: 'equipment', description: '컴퓨터 장비 구매' },
      { purchase_id: 'P003', purchase_date: '2024-08-24', vendor_name: '소모품업체C', amount: 55000, item_type: 'consumable', description: '소모품 구매' }
    ],
    sales_transaction: [
      { sales_id: 'S001', sales_date: '2024-08-24', customer_name: '고객A', amount: 1100000, product: '소프트웨어', description: '라이선스 판매' },
      { sales_id: 'S002', sales_date: '2024-08-24', customer_name: '고객B', amount: 550000, product: '컨설팅', description: '컨설팅 서비스' }
    ]
  };

  const availableColumns = {
    purchase_transaction: ['purchase_id', 'purchase_date', 'vendor_name', 'amount', 'item_type', 'description'],
    sales_transaction: ['sales_id', 'sales_date', 'customer_name', 'amount', 'product', 'description']
  };

  const accounts = [
    { code: '1110', name: '현금' },
    { code: '1120', name: '보통예금' },
    { code: '1130', name: '매출채권' },
    { code: '1410', name: '부가세대급금' },
    { code: '2110', name: '외상매입금' },
    { code: '2210', name: '미지급금' },
    { code: '4110', name: '매출액' },
    { code: '5110', name: '사무용품구입비' },
    { code: '5120', name: '장비구입비' }
  ];

  // 1단계: 원천 데이터 수집 실행
  const executeDataCollection = () => {
    const tableData = mockTables[sourceQuery.table] || [];
    
    // SELECT 절 적용 (선택된 컬럼만)
    const selectedData = tableData.map(row => {
      const selectedRow = {};
      sourceQuery.selectedColumns.forEach(col => {
        selectedRow[col] = row[col];
      });
      return selectedRow;
    });

    setSourceData(selectedData);
    setCurrentStep(2);
  };

  // 2단계에서 3단계로 넘어가기
  const proceedToProcessing = () => {
    setCurrentStep(3);
    executeJournalProcessing();
  };

  // 3단계: 분개 처리 로직 실행
  const executeJournalProcessing = () => {
    const journals = sourceData.map(sourceRow => {
      // 차변 항목들 처리
      const debitEntries = journalConfig.debit.map(config => {
        const amount = evaluateFormula(config.amount_formula, sourceRow);
        return {
          account_code: config.account_code,
          account_name: config.account_name,
          debit_amount: amount,
          credit_amount: 0
        };
      });

      // 대변 항목들 처리
      const creditEntries = journalConfig.credit.map(config => {
        const amount = evaluateFormula(config.amount_formula, sourceRow);
        return {
          account_code: config.account_code,
          account_name: config.account_name,
          debit_amount: 0,
          credit_amount: amount
        };
      });

      const allEntries = [...debitEntries, ...creditEntries];
      const totalDebit = debitEntries.reduce((sum, entry) => sum + entry.debit_amount, 0);
      const totalCredit = creditEntries.reduce((sum, entry) => sum + entry.credit_amount, 0);

      return {
        journal_id: `J${sourceRow[Object.keys(sourceRow)[0]]}`,
        source_id: sourceRow[Object.keys(sourceRow)[0]],
        journal_date: sourceRow[Object.keys(sourceRow).find(key => key.includes('date'))] || '2024-08-24',
        description: sourceRow.description || '자동 생성 분개',
        entries: allEntries,
        total_debit: totalDebit,
        total_credit: totalCredit,
        is_balanced: Math.abs(totalDebit - totalCredit) < 0.01,
        source_data: sourceRow
      };
    });

    setProcessedJournals(journals);
  };

  // 수식 계산 함수
  const evaluateFormula = (formula, data) => {
    try {
      // 간단한 수식 평가 (실제로는 더 안전한 방법 사용 필요)
      const expression = formula.replace(/\b(\w+)\b/g, (match) => {
        return data[match] !== undefined ? data[match] : match;
      });
      return Math.round(eval(expression));
    } catch (error) {
      return 0;
    }
  };

  // 컬럼 선택/해제
  const toggleColumn = (column) => {
    setSourceQuery(prev => ({
      ...prev,
      selectedColumns: prev.selectedColumns.includes(column)
        ? prev.selectedColumns.filter(col => col !== column)
        : [...prev.selectedColumns, column]
    }));
  };

  // 분개 설정 업데이트
  const updateJournalConfig = (type, index, field, value) => {
    setJournalConfig(prev => ({
      ...prev,
      [type]: prev[type].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addJournalEntry = (type) => {
    setJournalConfig(prev => ({
      ...prev,
      [type]: [...prev[type], { account_code: '', account_name: '', amount_formula: '' }]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-extrabold text-blue-700 mb-3"> 3단계 분개 처리 시스템 </h1>
          <p className="text-teal-700 text-lg mb-2"> 원천 데이터 수집 → 분개 작성 설정 → 처리 결과 출력 </p>
          <p className="text-gray-600 text-base">  - 전표분개를 설정을 통해 결과를 얻을 수 있는 시스템을 React로 간략히 표현했습니다. 😄</p>
        </div>
        {/* 단계 표시 */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  currentStep >= step ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <ChevronRight className={`w-6 h-6 ${currentStep > step ? 'text-blue-500' : 'text-gray-300'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <div className="flex space-x-8 text-sm">
            <span className={`${currentStep >= 1 ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>
              1. 원천 데이터 수집
            </span>
            <span className={`${currentStep >= 2 ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>
              2. 분개 작성 설정
            </span>
            <span className={`${currentStep >= 3 ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>
              3. 처리 결과 출력
            </span>
          </div>
        </div>

        {/* 1단계: 원천 데이터 수집 */}
        {currentStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Database className="w-5 h-5 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold">원천 데이터 수집 (SELECT 쿼리 구성)</h2>
              </div>

              {/* FROM 절 */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">FROM 테이블 선택</label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={sourceQuery.table}
                  onChange={(e) => setSourceQuery(prev => ({ 
                    ...prev, 
                    table: e.target.value,
                    selectedColumns: availableColumns[e.target.value]?.slice(0, 3) || []
                  }))}
                >
                  <option value="purchase_transaction">purchase_transaction (매입 거래)</option>
                  <option value="sales_transaction">sales_transaction (매출 거래)</option>
                </select>
              </div>

              {/* SELECT 절 */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">SELECT 컬럼 선택</label>
                <div className="grid grid-cols-2 gap-2">
                  {availableColumns[sourceQuery.table]?.map(column => (
                    <label key={column} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={sourceQuery.selectedColumns.includes(column)}
                        onChange={() => toggleColumn(column)}
                      />
                      <span className="text-sm">{column}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 생성된 쿼리 미리보기 */}
              <div className="mb-4 p-3 bg-gray-100 rounded-lg">
                <div className="flex items-center mb-2">
                  <Code className="w-4 h-4 text-gray-600 mr-1" />
                  <span className="text-sm font-medium">생성된 SQL 쿼리</span>
                </div>
                <pre className="text-sm font-mono text-gray-700">
{`SELECT ${sourceQuery.selectedColumns.join(', ')}
FROM ${sourceQuery.table}${sourceQuery.conditions ? `
WHERE ${sourceQuery.conditions}` : ''}`}
                </pre>
              </div>

              <button
                onClick={executeDataCollection}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                disabled={sourceQuery.selectedColumns.length === 0}
              >
                <Play className="w-4 h-4 inline mr-2" />
                데이터 수집 실행
              </button>
            </div>

            {/* 테이블 구조 정보 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">테이블 구조 및 샘플 데이터</h3>
              
              <div className="mb-4">
                <h4 className="font-medium text-blue-600 mb-2">{sourceQuery.table}</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border">
                    <thead className="bg-gray-50">
                      <tr>
                        {availableColumns[sourceQuery.table]?.map(col => (
                          <th key={col} className="border p-2 text-left">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockTables[sourceQuery.table]?.slice(0, 3).map((row, idx) => (
                        <tr key={idx}>
                          {availableColumns[sourceQuery.table]?.map(col => (
                            <td key={col} className="border p-2">{row[col]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2단계: 분개 작성 설정 */}
        {currentStep === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Settings className="w-5 h-5 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold">분개 작성 설정</h2>
              </div>

              {/* 차변 설정 */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-red-600">차변 (Debit)</h3>
                  <button
                    onClick={() => addJournalEntry('debit')}
                    className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                  >
                    항목 추가
                  </button>
                </div>
                
                {journalConfig.debit.map((entry, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 mb-2 p-2 bg-red-50 rounded">
                    <div className="col-span-3">
                      <select
                        className="w-full p-1 text-xs border rounded"
                        value={entry.account_code}
                        onChange={(e) => {
                          const account = accounts.find(acc => acc.code === e.target.value);
                          updateJournalConfig('debit', index, 'account_code', e.target.value);
                          updateJournalConfig('debit', index, 'account_name', account?.name || '');
                        }}
                      >
                        <option value="">계정선택</option>
                        {accounts.map(acc => (
                          <option key={acc.code} value={acc.code}>{acc.code} {acc.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-9">
                      <input
                        type="text"
                        className="w-full p-1 text-xs border rounded"
                        placeholder="금액 수식 (예: amount * 0.9)"
                        value={entry.amount_formula}
                        onChange={(e) => updateJournalConfig('debit', index, 'amount_formula', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* 대변 설정 */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-blue-600">대변 (Credit)</h3>
                  <button
                    onClick={() => addJournalEntry('credit')}
                    className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                  >
                    항목 추가
                  </button>
                </div>
                
                {journalConfig.credit.map((entry, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 mb-2 p-2 bg-blue-50 rounded">
                    <div className="col-span-3">
                      <select
                        className="w-full p-1 text-xs border rounded"
                        value={entry.account_code}
                        onChange={(e) => {
                          const account = accounts.find(acc => acc.code === e.target.value);
                          updateJournalConfig('credit', index, 'account_code', e.target.value);
                          updateJournalConfig('credit', index, 'account_name', account?.name || '');
                        }}
                      >
                        <option value="">계정선택</option>
                        {accounts.map(acc => (
                          <option key={acc.code} value={acc.code}>{acc.code} {acc.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-9">
                      <input
                        type="text"
                        className="w-full p-1 text-xs border rounded"
                        placeholder="금액 수식 (예: amount)"
                        value={entry.amount_formula}
                        onChange={(e) => updateJournalConfig('credit', index, 'amount_formula', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={proceedToProcessing}
                className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                분개 처리 실행
              </button>
            </div>

            {/* 수집된 원천 데이터 확인 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">수집된 원천 데이터</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-xs border">
                  <thead className="bg-gray-50">
                    <tr>
                      {sourceQuery.selectedColumns.map(col => (
                        <th key={col} className="border p-2 text-left">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sourceData.map((row, idx) => (
                      <tr key={idx}>
                        {sourceQuery.selectedColumns.map(col => (
                          <td key={col} className="border p-2">{row[col]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-3 bg-gray-100 rounded">
                <p className="text-sm text-gray-600">
                  총 {sourceData.length}건의 데이터가 수집되었습니다.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3단계: 처리 결과 출력 */}
        {currentStep === 3 && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <FileOutput className="w-5 h-5 text-purple-600 mr-2" />
                <h2 className="text-xl font-semibold">처리 결과 출력</h2>
              </div>

              {processedJournals.map((journal, index) => (
                <div key={index} className="mb-6 p-4 border rounded-lg">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* 원천 데이터 */}
                    <div>
                      <h4 className="font-semibold text-gray-600 mb-2">원천 데이터</h4>
                      <div className="bg-gray-50 p-3 rounded text-xs space-y-1">
                        {Object.entries(journal.source_data).map(([key, value]) => (
                          <div key={key}><strong>{key}:</strong> {value}</div>
                        ))}
                      </div>
                    </div>

                    {/* 처리 로직 */}
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">처리 로직</h4>
                      <div className="bg-blue-50 p-3 rounded text-xs space-y-1">
                        <div><strong>차변 규칙:</strong></div>
                        {journalConfig.debit.map((rule, idx) => (
                          <div key={idx}>• {rule.account_name}: {rule.amount_formula}</div>
                        ))}
                        <div><strong>대변 규칙:</strong></div>
                        {journalConfig.credit.map((rule, idx) => (
                          <div key={idx}>• {rule.account_name}: {rule.amount_formula}</div>
                        ))}
                      </div>
                    </div>

                    {/* 생성된 분개 */}
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">생성된 분개</h4>
                      <div className="bg-green-50 p-3 rounded">
                        <div className="text-xs mb-2">
                          <strong>전표번호:</strong> {journal.journal_id}<br/>
                          <strong>일자:</strong> {journal.journal_date}
                        </div>
                        
                        <table className="w-full text-xs border">
                          <thead>
                            <tr className="bg-white">
                              <th className="border p-1">계정</th>
                              <th className="border p-1">차변</th>
                              <th className="border p-1">대변</th>
                            </tr>
                          </thead>
                          <tbody>
                            {journal.entries.map((entry, entryIdx) => (
                              <tr key={entryIdx}>
                                <td className="border p-1">{entry.account_name}</td>
                                <td className="border p-1 text-right">
                                  {entry.debit_amount > 0 ? entry.debit_amount.toLocaleString() : '-'}
                                </td>
                                <td className="border p-1 text-right">
                                  {entry.credit_amount > 0 ? entry.credit_amount.toLocaleString() : '-'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="bg-gray-100 font-semibold">
                              <td className="border p-1">합계</td>
                              <td className="border p-1 text-right">{journal.total_debit.toLocaleString()}</td>
                              <td className="border p-1 text-right">{journal.total_credit.toLocaleString()}</td>
                            </tr>
                          </tfoot>
                        </table>

                        <div className={`mt-2 text-center text-xs font-semibold ${
                          journal.is_balanced ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {journal.is_balanced ? '✓ 차대평균' : '✗ 차대불일치'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 처리 결과 요약 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">처리 결과 요약</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-blue-50 rounded">
                  <div className="text-2xl font-bold text-blue-600">{sourceData.length}</div>
                  <div className="text-sm text-gray-600">원천 데이터</div>
                </div>
                <div className="p-4 bg-green-50 rounded">
                  <div className="text-2xl font-bold text-green-600">{processedJournals.length}</div>
                  <div className="text-sm text-gray-600">생성된 분개</div>
                </div>
                <div className="p-4 bg-purple-50 rounded">
                  <div className="text-2xl font-bold text-purple-600">
                    {processedJournals.reduce((sum, j) => sum + j.entries.length, 0)}
                  </div>
                  <div className="text-sm text-gray-600">분개 항목</div>
                </div>
                <div className="p-4 bg-orange-50 rounded">
                  <div className="text-2xl font-bold text-orange-600">
                    {processedJournals.filter(j => j.is_balanced).length}
                  </div>
                  <div className="text-sm text-gray-600">차대평균</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 단계 네비게이션 */}
        <div className="flex justify-center mt-6 space-x-4">
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              이전 단계
            </button>
          )}
          
          {currentStep < 3 && currentStep > 1 && (
            <button
              onClick={() => setCurrentStep(1)}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              처음부터 다시
            </button>
          )}
          
          {currentStep === 3 && (
            <button
              onClick={() => {
                setCurrentStep(1);
                setSourceData([]);
                setProcessedJournals([]);
              }}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              새로 시작
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountingJournalSystem;