module.exports = {
  // 可选类型：提交类型的选项，用于指定提交的类型
  types: [
    { value: "feat", name: "feat:     新功能" }, // 新功能
    { value: "fix", name: "fix:      修复" }, // 修复bug
    { value: "docs", name: "docs:     文档变更" }, // 文档变更
    { value: "style", name: "style:    代码格式(不影响代码运行的变动)" }, // 代码格式变动，不影响代码运行
    {
      value: "refactor",
      name: "refactor: 重构(既不是增加feature，也不是修复bug)",
    }, // 代码重构，既不是新功能也不是修复bug
    { value: "perf", name: "perf:     性能优化" }, // 性能优化
    { value: "test", name: "test:     增加测试" }, // 增加测试或修改现有测试
    { value: "chore", name: "chore:    构建过程或辅助工具的变动" }, // 构建过程或辅助工具的变动
    { value: "revert", name: "revert:   回退" }, // 提交回退
    { value: "build", name: "build:    打包" }, // 打包
  ],
  // 消息步骤：提交信息的提示
  messages: {
    type: "请选择提交类型:", // 提示用户选择提交类型
    customScope: "请输入修改范围(可选):", // 提示用户输入修改范围（可选）
    subject: "请简要描述提交(必填):", // 提示用户简要描述提交内容（必填）
    body: "请输入详细描述(可选):", // 提示用户输入详细描述（可选）
    footer: "请输入要关闭的issue(可选):", // 提示用户输入要关闭的issue（可选）
    confirmCommit: "确认使用以上信息提交？(y/n/e/h)", // 提示用户确认提交信息
  },
  // 跳过步骤：可以选择跳过的步骤
  skipQuestions: ["scope", "body", "footer"], // 默认跳过的步骤
  // subject文字长度限制
  subjectLimit: 72, // subject字段的文字长度限制
};
