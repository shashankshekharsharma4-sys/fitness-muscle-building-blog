import React, { useState } from 'react';
import { Calculator, Dumbbell, Flame, RotateCcw, ArrowRight } from 'lucide-react';

export const FitnessCalculators: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'macros' | '1rm'>('macros');

  // Macro calculator state
  const [unit, setUnit] = useState<'metric' | 'imperial'>('imperial');
  const [weight, setWeight] = useState<number>(175); // lbs or kg
  const [height, setHeight] = useState<number>(70); // inches or cm
  const [age, setAge] = useState<number>(27);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState<number>(1.55); // moderate exercise 3-5 days
  const [goal, setGoal] = useState<'lean-bulk' | 'maintenance' | 'moderate-cut'>('lean-bulk');

  // 1RM calculator state
  const [liftWeight, setLiftWeight] = useState<number>(225);
  const [liftReps, setLiftReps] = useState<number>(5);
  const [liftUnit, setLiftUnit] = useState<'lbs' | 'kg'>('lbs');

  // Calculations for Macros
  const weightKg = unit === 'imperial' ? weight * 0.453592 : weight;
  const heightCm = unit === 'imperial' ? height * 2.54 : height;

  // Mifflin-St Jeor BMR
  const bmr =
    gender === 'male'
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

  const tdee = Math.round(bmr * activity);

  let targetCalories = tdee;
  if (goal === 'lean-bulk') targetCalories += 250;
  if (goal === 'moderate-cut') targetCalories -= 450;

  // Macronutrient calculation
  // Protein: 2.0 g/kg (approx 0.9 g/lb)
  const proteinGrams = Math.round(weightKg * 2.0);
  const proteinCalories = proteinGrams * 4;

  // Fat: 0.8 g/kg
  const fatGrams = Math.round(weightKg * 0.8);
  const fatCalories = fatGrams * 9;

  // Carbs: remainder of calories
  const carbCalories = Math.max(200, targetCalories - (proteinCalories + fatCalories));
  const carbGrams = Math.round(carbCalories / 4);

  // Calculations for 1RM (Epley and Brzycki average)
  const epley1RM = liftWeight * (1 + liftReps / 30);
  const brzycki1RM = liftWeight * (36 / (37 - liftReps));
  const estimated1RM = Math.round((epley1RM + brzycki1RM) / 2);

  const percentageTable = [
    { percent: 100, reps: 1, load: Math.round(estimated1RM * 1.0) },
    { percent: 95, reps: 2, load: Math.round(estimated1RM * 0.95) },
    { percent: 90, reps: 3, load: Math.round(estimated1RM * 0.90) },
    { percent: 85, reps: 5, load: Math.round(estimated1RM * 0.85) },
    { percent: 80, reps: 8, load: Math.round(estimated1RM * 0.80) },
    { percent: 75, reps: 10, load: Math.round(estimated1RM * 0.75) },
    { percent: 70, reps: 12, load: Math.round(estimated1RM * 0.70) },
  ];

  return (
    <section id="calculators-section" className="py-12 border-t border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
            Applied Sports Science Tools
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display uppercase tracking-tight">
            Evidence-Based Athletic Calculators
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Calculate your exact muscle-building caloric surplus and progressive overload rep percentages using clinical formulas.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 p-1 bg-slate-900 border border-slate-800 rounded-lg max-w-sm mb-6">
          <button
            onClick={() => setActiveTab('macros')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'macros'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>TDEE &amp; Macro Planner</span>
          </button>
          <button
            onClick={() => setActiveTab('1rm')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-md transition-colors ${
              activeTab === '1rm'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Dumbbell className="w-3.5 h-3.5" />
            <span>1-Rep Max (1RM) Estimator</span>
          </button>
        </div>

        {/* TAB 1: Macro & Calorie Calculator */}
        {activeTab === 'macros' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-900/80 border border-slate-800 rounded-xl p-6 sm:p-8">
            {/* Input Form Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-semibold uppercase text-slate-400">Unit Standard</span>
                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={() => setUnit('imperial')}
                    className={`px-2.5 py-1 rounded ${unit === 'imperial' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400'}`}
                  >
                    Imperial (lbs/in)
                  </button>
                  <button
                    onClick={() => setUnit('metric')}
                    className={`px-2.5 py-1 rounded ${unit === 'metric' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400'}`}
                  >
                    Metric (kg/cm)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Bodyweight ({unit === 'imperial' ? 'lbs' : 'kg'})
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400 font-mono-numbers"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Height ({unit === 'imperial' ? 'inches' : 'cm'})
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400 font-mono-numbers"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400 font-mono-numbers"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Biological Sex</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Weekly Activity Level</label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value={1.2}>Sedentary (desk work, minimal lifting)</option>
                  <option value={1.375}>Light Active (lifting 1–3 days/week)</option>
                  <option value={1.55}>Moderately Active (lifting 3–5 days/week)</option>
                  <option value={1.725}>Very Active (hard training 6–7 days/week)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Physique Objective</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setGoal('lean-bulk')}
                    className={`py-2 px-2 text-xs rounded-lg border text-center transition-colors ${
                      goal === 'lean-bulk'
                        ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    Lean Bulk (+250 kcal)
                  </button>
                  <button
                    onClick={() => setGoal('maintenance')}
                    className={`py-2 px-2 text-xs rounded-lg border text-center transition-colors ${
                      goal === 'maintenance'
                        ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    Maintain (0 kcal)
                  </button>
                  <button
                    onClick={() => setGoal('moderate-cut')}
                    className={`py-2 px-2 text-xs rounded-lg border text-center transition-colors ${
                      goal === 'moderate-cut'
                        ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    Fat Loss (-450 kcal)
                  </button>
                </div>
              </div>
            </div>

            {/* Results Output Column */}
            <div className="lg:col-span-6 flex flex-col justify-between bg-slate-950 border border-slate-800 rounded-xl p-6">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                    Target Daily Nutrition
                  </span>
                  <span className="text-xs text-amber-400 font-mono-numbers">
                    Mifflin-St Jeor + TDEE
                  </span>
                </div>

                {/* Big Target Calorie Number */}
                <div className="my-5 text-center sm:text-left">
                  <span className="text-xs text-slate-400 block mb-1">Daily Target Calories</span>
                  <span className="text-4xl sm:text-5xl font-bold font-mono-numbers text-white">
                    {targetCalories.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500 ml-2">kcal / day (TDEE: {tdee} kcal)</span>
                </div>

                {/* Macro Split Breakdown */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-center">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                      Protein (2.0g/kg)
                    </span>
                    <span className="text-xl sm:text-2xl font-bold font-mono-numbers text-white block">
                      {proteinGrams}g
                    </span>
                    <span className="text-[10px] text-slate-400">{proteinCalories} kcal</span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[11px] uppercase tracking-wider text-sky-400 font-bold block mb-1">
                      Carbohydrates
                    </span>
                    <span className="text-xl sm:text-2xl font-bold font-mono-numbers text-white block">
                      {carbGrams}g
                    </span>
                    <span className="text-[10px] text-slate-400">{carbCalories} kcal</span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold block mb-1">
                      Fats (0.8g/kg)
                    </span>
                    <span className="text-xl sm:text-2xl font-bold font-mono-numbers text-white block">
                      {fatGrams}g
                    </span>
                    <span className="text-[10px] text-slate-400">{fatCalories} kcal</span>
                  </div>
                </div>
              </div>

              {/* Research protocol note */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400 leading-relaxed">
                <p>
                  <strong className="text-white">Science Protocol:</strong> Based on Morton et al. (2018) meta-analysis, 2.0g/kg maximizes muscle protein synthesis without excessive amino acid oxidation.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: One-Rep Max Estimator */}
        {activeTab === '1rm' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-900/80 border border-slate-800 rounded-xl p-6 sm:p-8">
            {/* Input Column */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-semibold uppercase text-slate-400">Lift Inputs</span>
                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={() => setLiftUnit('lbs')}
                    className={`px-2.5 py-1 rounded ${liftUnit === 'lbs' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400'}`}
                  >
                    Pounds (lbs)
                  </button>
                  <button
                    onClick={() => setLiftUnit('kg')}
                    className={`px-2.5 py-1 rounded ${liftUnit === 'kg' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400'}`}
                  >
                    Kilograms (kg)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Weight Lifted ({liftUnit})
                </label>
                <input
                  type="number"
                  value={liftWeight}
                  onChange={(e) => setLiftWeight(Math.max(1, Number(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400 font-mono-numbers"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Repetitions Completed Cleanly (1 to 12 reps)
                </label>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={liftReps}
                  onChange={(e) => setLiftReps(Number(e.target.value))}
                  className="w-full accent-amber-400"
                />
                <div className="flex justify-between text-xs font-mono-numbers text-slate-400 mt-1">
                  <span>1 rep (Actual 1RM)</span>
                  <span className="text-amber-400 font-bold">{liftReps} reps</span>
                  <span>12 reps (Max accuracy limit)</span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Estimated 1-Rep Max</span>
                <span className="text-4xl font-bold font-mono-numbers text-white">
                  {estimated1RM} {liftUnit}
                </span>
                <p className="text-[11px] text-slate-500 mt-1">
                  Average of Brzycki and Epley kinematic equations.
                </p>
              </div>
            </div>

            {/* Programming Percentages Table */}
            <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-5 overflow-x-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                  Working Load Distribution Table
                </span>
                <span className="text-xs text-slate-500">Target Reps @ 1–2 RIR</span>
              </div>

              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2 px-3">% of 1RM</th>
                    <th className="py-2 px-3">Working Weight</th>
                    <th className="py-2 px-3">Expected Reps</th>
                    <th className="py-2 px-3">Training Adaption</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono-numbers text-slate-200">
                  {percentageTable.map((row) => (
                    <tr key={row.percent} className="hover:bg-slate-900/60 transition-colors">
                      <td className="py-2 px-3 font-semibold text-amber-400">{row.percent}%</td>
                      <td className="py-2 px-3 font-bold text-white">
                        {row.load} {liftUnit}
                      </td>
                      <td className="py-2 px-3">{row.reps} reps</td>
                      <td className="py-2 px-3 text-slate-400 font-sans text-xs">
                        {row.percent >= 90
                          ? 'Maximal Strength / Neural Drive'
                          : row.percent >= 80
                          ? 'Hypertrophy & Strength'
                          : 'Hypertrophy & Work Capacity'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
