function isNull(v) {
  return typeof v === "undefined" || v === "" || v == null
}

export default {
  isObjectEqual(a, b) {
    if (!a || !b) return a === b
    const aKeys = Object.keys(a).sort()
    const bKeys = Object.keys(b).sort()
    if (aKeys.length !== bKeys.length) {
      return false
    }
    return aKeys.every((key, i) => {
      const aVal = a[key]
      const bKey = bKeys[i]
      if (bKey !== key) return false
      const bVal = b[key]
      if (aVal == null || bVal == null) return aVal === bVal
      if (typeof aVal === "object" && typeof bVal === "object") {
        return this.isObjectEqual(aVal, bVal)
      }
      return String(aVal) === String(bVal)
    })
  },
  async copyToClipboard(text) {
    let hasPermission = true
    if (navigator.clipboard && navigator.permissions) {
      try {
        const permissionStatus = await navigator.permissions.query({
          name: "clipboard-write",
          allowWithoutGesture: false,
        })
        hasPermission = permissionStatus.state === "granted"
      } catch (err) {}
    }
    if (navigator.clipboard && hasPermission) {
      await navigator.clipboard.writeText(text)
    } else {
      const el = document.createElement("textarea")
      el.addEventListener("focusin", (e) => e.stopPropagation())
      el.value = text
      el.setAttribute("readonly", "")
      el.style.position = "absolute"
      el.style.left = "-9999px"
      document.body.appendChild(el)
      el.select()
      document.execCommand("copy")
      document.body.removeChild(el)
    }
  },
  redirectTo(url, newTab = false) {
    if (url) {
      if (newTab) window.open(url, "_blank")
      else window.location = url
    }
  },
  truncate(str, length = 22) {
    if (str === null) str = ""
    if (str.length > length) return str.slice(0, length) + "..."
    else return str
  },
  maybeEnableDarkTheme() {
    const hours = new Date().getHours()
    const isDayTime = hours > 6 && hours < 20
    if (!isDayTime) {
      this.$vuetify.theme.dark = true
    }
  },
  isEmpty(obj) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false
      }
    }
    return true
  },
  rules: {
    required: (v) => !isNull(v) || "Required.",
    min: (v) => (!isNull(v) && v.length >= 8) || "Min 8 characters",
    email: (v) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return isNull(v) || pattern.test(v) || "Invalid e-mail."
    },
    int: (v) => isFinite(v) || "Integer required",
    url: (v) => {
      if (isNull(v)) {
        return true
      }
      try {
        new URL(v) // eslint-disable-line no-new
        return true
      } catch (_) {
        return "Invalid URL"
      }
    },
    positive: (v) => isNull(v) || v > 0 || "Must be positive",
    nonnegative: (v) => isNull(v) || v >= 0 || "Must be non-negative",
    quantity: (v) => isNull(v) || v >= -1 || "Must be non-negative or -1",
  },
  toTitleCase(str) {
    str = str.replace(/_/g, " ")
    return str[0].toUpperCase() + str.substring(1)
  },
}
