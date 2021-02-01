---@class string.merger.diff
---@field start  integer # 替换开始的字节
---@field finish integer # 替换结束的字节
---@field text   string  # 替换的文本

---@class string.merger.info: string.merger.diff
---@field cstart  integer # 转换后的开始字节
---@field cfinish integer # 转换后的结束字节

---@alias string.merger.diffs string.merger.diff[]
---@alias string.merger.infos string.merger.info[]

-- 根据二分法找到最近的开始位置
---@param diffs  table
---@param offset any
---@return string.merger.info
local function getNearDiff(diffs, offset, key)
    local min = 1
    local max = #diffs
    while max > min do
        local middle = min + (max - min) // 2
        local diff  = diffs[middle]
        local ndiff = diffs[middle + 1]
        if diff[key] > offset then
            max = middle
            goto CONTINUE
        end
        if not ndiff then
            return diff
        end
        if ndiff[key] > offset then
            return diff
        end
        if min == middle then
            min = middle + 1
        else
            min = middle
        end
        ::CONTINUE::
    end
    return diffs[min]
end

local m = {}

---把文本与差异进行合并
---@param text  string
---@param diffs string.merger.diffs
---@return string
---@return string.merger.infos
function m.mergeDiff(text, diffs)
    local info = {}
    for i, diff in ipairs(diffs) do
        info[i] = {
            start  = diff.start,
            finish = diff.finish,
            text   = diff.text,
        }
    end
    table.sort(info, function (a, b)
        return a.start < b.start
    end)
    local cur = 1
    local buf = {}
    local delta = 0
    for _, diff in ipairs(info) do
        diff.cstart  = diff.start  + delta
        diff.cfinish = diff.cstart + #diff.text - 1
        buf[#buf+1] = text:sub(cur, diff.start - 1)
        buf[#buf+1] = diff.text
        cur = diff.finish + 1
        delta = delta  + #diff.text - (diff.finish - diff.start + 1)
    end
    buf[#buf+1] = text:sub(cur)
    return table.concat(buf), info
end

---根据转换前的位置获取转换后的位置
---@param info   string.merger.infos
---@param offset integer
---@return integer
function m.getOffset(info, offset)
    local diff = getNearDiff(info, offset, 'start')
    if offset <= diff.finish then
        return diff.cstart
    end
    return offset - diff.finish + diff.cfinish
end

---根据转换后的位置获取转换前的位置
---@param info   string.merger.infos
---@param offset integer
---@return integer
function m.getOffsetBack(info, offset)
    local diff = getNearDiff(info, offset, 'cstart')
    if offset <= diff.cfinish then
        return diff.start
    end
    return offset - diff.cfinish + diff.finish
end

return m
