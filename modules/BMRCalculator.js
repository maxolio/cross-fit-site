// modules/BMRCalculator.js

class BMRCalculator {
  selectors = {
    form: '[data-js-calculate-form]',
    result: '[data-js-calculate-result]',
  }

  constructor() {
    this.formElement = document.querySelector(this.selectors.form)
    if (!this.formElement) return // Безопасность

    this.resultElement = this.formElement.querySelector(this.selectors.result)
    this.bindEvents()
  }

  // Профессиональные экспертные советы в зависимости от индекса массы тела (BMI)
  getBMICategory(bmi) {
    if (bmi < 18.5) {
      return {
        text: 'Недостаточная масса тела',
        color: '#3182ce', // Синий
        tip: 'Ваш текущий индекс массы тела ниже рекомендуемой нормы. <br><br>' +
          '<strong>Рекомендации по питанию:</strong> Для здорового набора веса вам необходим умеренный профицит калорий (+10-15% к вашей суточной норме). Сделайте упор на сложные углеводы (крупы, паста) и качественный белок (птица, рыба, яйца). <br><br>' +
          '<strong>Рекомендации по тренировкам:</strong> Избегайте избыточного кардио, так как оно мешает набору веса. Ваш приоритет — базовые силовые тренировки 3 раза в неделю для стимуляции роста мышечной массы.'
      }
    }
    if (bmi >= 18.5 && bmi < 24.9) {
      return {
        text: 'Нормальный (здоровый) вес',
        color: '#38a169', // Зеленый
        tip: 'Поздравляем! Ваш вес находится в идеальном здоровом диапазоне. <br><br>' +
          '<strong>Рекомендации по питанию:</strong> Придерживайтесь вашей суточной нормы калорий для сохранения текущей формы. Сбалансируйте рацион по макронутриентам: держите белки на уровне 1.6-2 г на кг веса тела для поддержания плотности мышц. <br><br>' +
          '<strong>Рекомендации по тренировкам:</strong> Сочетайте силовые тренировки (2-3 раза в неделю) для тонуса и рельефа с легкой кардио-активностью (прогулки, бег, плавание) для поддержания выносливости и здоровья сердечно-сосудистой системы.'
      }
    }
    if (bmi >= 24.9 && bmi < 29.9) {
      return {
        text: 'Избыточная масса тела (Предожирение)',
        color: '#dd6b20', // Оранжевый
        tip: 'Ваш вес немного превышает медицинскую норму. Это хорошая отправная точка для плавного улучшения качества тела. <br><br>' +
          '<strong>Рекомендации по питанию:</strong> Вам необходим мягкий дефицит калорий (примерно -15% от суточной нормы). Не урезайте калорийность слишком резко, чтобы не замедлить метаболизм. Сокращайте калории за счет простых сахаров и быстрых углеводов. <br><br>' +
          '<strong>Рекомендации по тренировкам:</strong> Добавьте в расписание 3 силовые тренировки в неделю — они защитят ваши мышцы от разрушения во время похудения, и тело станет подтянутым. Также добавьте 150 минут умеренного кардио в неделю.'
      }
    }
    return {
      text: 'Ожирение',
      color: '#e53e3e', // Красный
      tip: 'Ваш показатель BMI находится в диапазоне, который может создавать дополнительную нагрузку на суставы и сердечно-сосудистую систему. <br><br>' +
        '<strong>Рекомендации по питанию:</strong> Необходим стабильный, контролируемый дефицит калорий (-15-20%). Сфокусируйтесь на цельных продуктах: овощах, нежирном белке и клетчатке. Пейте больше чистой воды и исключите сладкие газированные напитки. <br><br>' +
        '<strong>Рекомендации по тренировкам:</strong> Начните с низкоударных нагрузок, чтобы поберечь суставы и колени. Отлично подойдет активная ходьба (10 000 шагов в день), плавание или занятия на эллиптическом тренажере. Полноценный фитнес-режим вводите плавно.'
    }
  }

  onFormSubmit = (event) => {
    event.preventDefault() // Отмена перезагрузки страницы

    const height = parseFloat(this.formElement.elements.height.value)
    const weight = parseFloat(this.formElement.elements.weight.value)
    const age = parseInt(this.formElement.elements.age.value, 10)
    const gender = this.formElement.elements.gender.value
    const activity = parseFloat(this.formElement.elements.activity.value)

    if (!height || !weight || !age || !gender || !activity || height <= 0 || weight <= 0 || age <= 0) {
      this.resultElement.innerHTML = `<span style="color: #e53e3e; font-weight: 700;">Пожалуйста, заполните все поля корректно.</span>`
      return
    }

    // 1. Расчет базового метаболизма (BMR) по формуле Миффлина-Сан Жеора
    const heightInMeters = height / 100
    let bmr = 0

    if (gender === 'male') {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161
    }

    // 2. Расчет суточного расхода калорий с учетом физической активности
    const dailyCalories = Math.round(bmr * activity)

    // 3. Расчет индекса массы тела (BMI)
    const bmi = (weight / (heightInMeters ** 2)).toFixed(1)
    const bmiData = this.getBMICategory(parseFloat(bmi))

    // 4. Вывод профессионального детального результата
    this.resultElement.innerHTML = `
      <p style="margin-bottom: 12px; font-size: 18px;">
        🍏 Ваша суточная норма калорий: <strong style="color: var(--color-white); border-bottom: 2px solid var(--color-yelow); font-size: 22px;">${dailyCalories} ккал</strong>
      </p>
      <p style="margin-bottom: 20px; font-size: 16px;">
        📊 Индекс массы тела (BMI): <strong style="color: ${bmiData.color}; font-size: 18px;">${bmi}</strong> — <span style="font-weight: 700;">${bmiData.text}</span>
      </p>
      <div style="border-top: 1px solid var(--color-dark-gray); padding-top: 15px;">
        <span style="font-weight: 700; color: var(--color-white); text-transform: uppercase; font-size: 12px; letter-spacing: 0.05em; display: block; margin-bottom: 8px;">💡 Персональные рекомендации:</span>
        <p style="font-size: 14px; color: var(--color-light-gray); line-height: 1.6; margin: 0;">
          ${bmiData.tip}
        </p>
      </div>
    `
  }

  bindEvents() {
    this.formElement.addEventListener('submit', this.onFormSubmit)
  }
}

export default BMRCalculator