/**
 * arr.sort([compareFunction]):
 *   compareFunction |可选：用来指定按某种顺序进行排序的函数 如果省略 元素按照转换为字符串的各个字符的Unicode位点进行排序
 *    firstEl: 第一个用于比较的元素
 *    secondEl：第二个用于比较的元素
 * Emmet in Visual Studio Code
 *  Emmet support is built right into Visual Studio Code no extension is required
 *  Emmet 2.0 has support for the majority(多数) of the Emmet Actions including expanding Emmet abbreviations(缩写) and snippets（片段
 * How to expand Emmet abbreviations and snippets
 *  Emmet abbreviation and snippet expansions are enabled by default in html haml pug slim jsx xml xsl css scss sass less and stylus files
 *  As well as any language that inherits from any of the above like handlebars and php
 *  master分支：为主分支 也是用于部署生产环境的分支 确保master分支稳定性 master分支一般有develop分支 以及hotfix 分支合并 任何时间都不能直接修改代码
 *  develop分支： 开发分支 始终保持最新完成以及bug修复后的代码  一般开发的新功能时 feature 分支都是基于develop分支下创建的
 *  feature分支： 开发新功能时 以develop为基础创建feature分支 分支命名 feature/开头的为特性分支
 *  release分支：为预上线分支 发布提测阶段 会release分支代码为基准提测/当有一组feature开发完成 首先会合并到develop分支 进入提测时 会创建release分支
 *  如果测试过程中存在bug需要修复 则直接由开发者在release分支修复冰提交 当测试完成后 合并release分钟到master
 *  hotfix分支：分支命名：hotfix/开头的修复分支/线上出现紧急问题时 需要及时修复 以master分支为基线 创建hotfix分支 修复完成后 需要合并到master和develop分支
 */