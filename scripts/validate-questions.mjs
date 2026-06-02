import { readFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const schema = JSON.parse(readFileSync(join(root, 'docs/schema/question.schema.json'), 'utf-8'))
const ajv = new Ajv({ allErrors: true })
addFormats(ajv)
const validate = ajv.compile(schema)

const dir = join(root, 'src/data/questions')
const files = readdirSync(dir).filter(f => f.endsWith('.json')).sort()

let hasError = false
const allIds = []

for (const file of files) {
  const path = join(dir, file)
  const data = JSON.parse(readFileSync(path, 'utf-8'))

  // JSON Schema バリデーション
  if (!validate(data)) {
    console.error(`❌ ${file}: スキーマエラー`)
    for (const err of validate.errors) {
      console.error(`   ${err.instancePath} ${err.message}`)
    }
    hasError = true
    continue
  }

  // ID の重複チェック（ファイル内・ファイル間）
  for (const q of data) {
    if (allIds.includes(q.id)) {
      console.error(`❌ ${file}: ID重複 "${q.id}"`)
      hasError = true
    } else {
      allIds.push(q.id)
    }
  }

  // domainId とファイル名の整合性チェック
  const expectedDomain = file.replace('.json', '').toUpperCase()
  for (const q of data) {
    if (q.domainId !== expectedDomain) {
      console.error(`❌ ${file}: domainId "${q.domainId}" がファイル名 "${file}" と一致しません`)
      hasError = true
    }
  }

  // questionType と correctChoiceIds 件数の整合性チェック
  for (const q of data) {
    if (q.questionType === 'single-choice' && q.correctChoiceIds.length !== 1) {
      console.error(`❌ ${file}: ${q.id} は single-choice ですが correctChoiceIds が ${q.correctChoiceIds.length} 件です`)
      hasError = true
    }
    if (q.questionType === 'multiple-choice' && q.correctChoiceIds.length < 2) {
      console.error(`❌ ${file}: ${q.id} は multiple-choice ですが correctChoiceIds が ${q.correctChoiceIds.length} 件しかありません`)
      hasError = true
    }
  }

  console.log(`✅ ${file}: ${data.length}問 OK`)
}

console.log(`\n合計: ${allIds.length}問`)

if (hasError) {
  process.exit(1)
}
