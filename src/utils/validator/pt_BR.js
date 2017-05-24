export default {
    after: (field, [target]) => `O campo ${field} deve estar depois do campo ${target}.`,
    alpha_dash: (field) => `O campo ${field} deve conter letras, números e traços.`,
    alpha_num: (field) => `O campo ${field} deve conter somente letras e números.`,
    alpha: (field) => `O campo ${field} deve conter somente letras.`,
    before: (field, [target]) => `O campo ${field} deve estar antes do campo ${target}.`,
    between: (field, [min, max]) => `O campo ${field} deve estar entre ${min} e ${max}.`,
    confirmed: (field, [confirmedField]) => `O campo ${field} e ${confirmedField} devem ser iguais.`,
    date_between: (field, [min, max]) => `O campo ${field} deve estar entre ${min} e ${max}.`,
    date_format: (field, [format]) => `O campo ${field} deve estar no formato ${format}.`,
    decimal: (field, [decimals] = ['*']) => `O campo ${field} deve ser numérico e deve conter ${decimals === '*' ? '' : decimals} casas decimais.`,
    digits: (field, [length]) => `O campo ${field} deve ser numérico e ter ${length} dígitos.`,
    dimensions: (field, [width, height]) => `O campo ${field} deve ter ${width} pixels de largura por ${height} pixels de altura.`,
    email: (field) => `O campo ${field} deve ser um email válido.`,
    ext: (field) => `O campo ${field} deve ser um arquivo válido.`,
    image: (field) => `O campo ${field} deve ser uma imagem.`,
    in: (field) => `O campo ${field} deve ter um valor válido.`,
    ip: (field) => `O campo ${field} deve ser um endereço IP válido.`,
    max: (field, [length]) => `O campo ${field} não deve ter mais que ${length} caracteres.`,
    mimes: (field) => `O campo ${field} deve ser um tipo de arquivo válido.`,
    min: (field, [length]) => `O campo ${field} deve conter pelo menos ${length} caracteres.`,
    not_in: (field) => `O campo ${field} deve ser um valor válido.`,
    numeric: (field) => `O campo ${field} deve conter apenas números`,
    regex: (field) => `O campo ${field} possui um formato inválido.`,
    required: (field) => `O campo ${field} é obrigatório.`,
    size: (field, [size]) => `O campo ${field} deve ser menor que ${size} KB.`,
    url: (field) => `O campo ${field} não é uma URL válida.`,
    currency: (field) => `O campo ${field} é deve ser maior que zero.`
};